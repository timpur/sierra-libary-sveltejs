<script>
  import {
    fieldControl,
    getError,
    getValidating,
    formControl,
    validator
  } from "../src/stores";
  import Input from "../src/Input.svelte";
  import Select from "../src/Select.svelte";
  import Button from "../src/Button.svelte";

  const delay = ms => new Promise(cb => setTimeout(cb, ms));

  const name = fieldControl("name");
  const names = fieldControl("names");
  const form = formControl("form", name);

  name.validators.change = validator(
    () => $name.value,
    validator.required("Name is Required.")
  );

  name.validators.blur = async () => {
    if ($name.value == "1") {
      await delay(1000);
      return "Can Not be 1";
    }
    return null;
  };

  form.validators.submit = async () => {
    console.log("formSubmitValidation", JSON.parse(JSON.stringify($form)));
    if ($form.summary.fields.inError) return "Form Error";
    return null;
  };

  async function submit() {
    await form.submit();
    if ($form.summary.inError) return;
    console.log("Submit");
  }
</script>

<form on:submit|preventDefault={submit}>
  <Input
    type="text"
    name="name"
    label="Name"
    value={$name.value}
    error={getError($name)}
    on:input={event => name.change(event.target.value)}
    on:blur={() => name.blur()} />
  <Select
    name="names"
    options={['item1', 'item2']}
    value={$names.value}
    on:change={event => {
      console.log(event.target.value);
    }} />
  <Button disabled={$form.summary.isValidating} type="submit">Submit</Button>
</form>
