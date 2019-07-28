<script>
  export let name;
  export let label;
  export let placeholder;
  export let value = "";
  export let options = [];
  export let error;
  export let fullWidth = true;
  export let formCollapsedPrimary;
  export let formCollapsed = typeof formCollapsedPrimary === "boolean";

  if (!name) throw new Error("name prop required");

  const hasIcon = !!($$props.$$slots && $$props.$$slots.default);
</script>

<style>
  .select {
    margin-bottom: 33px;
  }
  .has-error {
    margin-bottom: 0;
  }
</style>

{#if label && !formCollapsed}
  <label class="label" for={name}>
    <slot name="label" {label}>{label}</slot>
  </label>
{/if}
<div
  class="select"
  class:select-fullWidth={fullWidth}
  class:has-error={error}
  class:formCollapsed-item={formCollapsed}
  class:formCollapsed-itemPrimary={formCollapsedPrimary}>
  <select id={name} {name} {placeholder} {value} on:change on:blur>
    <slot {options}>
      {#each options as option}
        <option>{option}</option>
      {/each}
    </slot>
  </select>
</div>
{#if error && !formCollapsed}
  <p class="text-error text-small">
    <slot name="error" {error}>{error}</slot>
  </p>
{/if}
