import { writable, derived } from "svelte/store";

const INITIAL_ERROR_STATE = () => ({
  change: {
    error: null,
    validating: false
  },
  blur: {
    error: null,
    validating: false
  },
  submit: {
    error: null,
    validating: false
  }
});

const setValue = (store, value) =>
  store.update(state => {
    state.value = value;
    return state;
  });

const setError = (store, type, { error, validating } = {}) =>
  store.update(state => {
    if (!state[type]) state[type] = {};
    if (error !== undefined) state[type].error = error;
    if (validating !== undefined) state[type].validating = validating;
    return state;
  });

const validationRunner = () => {
  const validateCounter = {
    change: 0,
    blur: 0,
    submit: 0
  };
  const runValidation = async (store, validators, type) => {
    const func = validators[type];
    if (typeof func === "function") {
      const count = ++validateCounter[type];
      setError(store, type, { validating: true });
      const error = await func();
      if (count === validateCounter[type]) {
        setError(store, type, { error, validating: false });
      }
    }
  };
  return runValidation;
};

const getErrorProp = (state, types, prop) => {
  types = types || ["change", "blur", "submit"];
  if (!Array.isArray(types)) types = [types];
  const results = types.map(type => state[type] && state[type][prop]);
  return results.reduce((result, value) => result || value);
};

export const getError = (state, types) => {
  const error = getErrorProp(state, types, "error");
  return error === undefined ? null : error;
};

export const getValidating = (state, types) => {
  const validating = getErrorProp(state, types, "validating");
  return !!validating;
};

export const fieldControl = (name, initialValue = "") => {
  if (!name) throw new Error("name is required.");

  const _store = writable({
    ...INITIAL_ERROR_STATE(),
    name,
    value: initialValue
  });

  const runValidation = validationRunner();

  return {
    ..._store,
    name,
    validators: {},
    setValue(value) {
      setValue(this, value);
    },
    setError(type, { error, validating } = {}) {
      setError(this, type, { error, validating });
    },
    async change(value) {
      if (value !== undefined) setValue(this, value);
      await runValidation(this, this.validators, "change");
    },
    async blur() {
      await runValidation(this, this.validators, "change");
      await runValidation(this, this.validators, "blur");
    },
    async submit() {
      await runValidation(this, this.validators, "change");
      await runValidation(this, this.validators, "blur");
      await runValidation(this, this.validators, "submit");
    }
  };
};

export const formControl = (name, ...fieldControls) => {
  if (!name) throw new Error("name is required.");

  const formErrorStore = writable({
    ...INITIAL_ERROR_STATE(),
    name
  });

  const formStore = derived(
    [formErrorStore, ...fieldControls],
    ([formErrorState, ...fieldStates]) => {
      const fieldsInError = fieldStates.some(getError);
      const fieldsIsValidating = fieldStates.some(getValidating);
      return {
        ...formErrorState,
        summary: {
          fields: {
            inError: fieldsInError,
            isValidating: fieldsIsValidating
          },
          inError: fieldsInError || !!getError(formErrorState),
          isValidating: fieldsIsValidating || getValidating(formErrorState)
        }
      };
    }
  );

  const runValidation = validationRunner();

  return {
    ...formStore,
    name,
    validators: {},
    setError(type, { error, validating } = {}) {
      setError(formErrorStore, type, { error, validating });
    },
    async change() {
      await Promise.all(fieldControls.map(field => field.change()));
      await runValidation(formErrorStore, this.validators, "change");
    },
    async blur() {
      await Promise.all(fieldControls.map(field => field.blur()));
      await runValidation(formErrorStore, this.validators, "change");
      await runValidation(formErrorStore, this.validators, "blur");
    },
    async submit() {
      await Promise.all(fieldControls.map(field => field.submit()));
      await runValidation(formErrorStore, this.validators, "change");
      await runValidation(formErrorStore, this.validators, "blur");
      await runValidation(formErrorStore, this.validators, "submit");
    }
  };
};

export const validator = (getValue, ...validations) => async () => {
  const value = getValue();
  for (const validation of validations) {
    const error = await validation(value);
    if (error !== undefined || error !== null) return error;
  }
  return null;
};

validator.required = message => value => {
  if (!value) return message;
  return null;
};
