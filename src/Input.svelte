<script>
  export let name;  
  export let label;
  export let placeholder;
  export let type = "text";
  export let value = "";
  export let error;
  export let fullWidth = true;
  export let formCollapsedPrimary;
  export let formCollapsed = typeof formCollapsedPrimary === "boolean";

  if (!name) throw new Error("name prop required");

  const hasIcon = !!($$props.$$slots && $$props.$$slots.default);
</script>

<style>
  .input {
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
  class="input"
  class:input-fullWidth={fullWidth}
  class:has-error={error}
  class:input-withIcon={hasIcon}
  class:formCollapsed-item={formCollapsed}
  class:formCollapsed-itemPrimary={formCollapsedPrimary}>
  <input
    id={name}
    {name}
    {placeholder}
    {type}
    {value}
    on:input
    on:change
    on:blur />
  <slot />
</div>
{#if error && !formCollapsed}
  <p class="text-error text-small">
    <slot name="error" {error}>{error}</slot>
  </p>
{/if}
