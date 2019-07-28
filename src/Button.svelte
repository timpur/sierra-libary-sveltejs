<script>
  export let text = "";
  export let color = "primary";
  export let size = "default";
  export let mobileFull = "";
  export let type = "button";
  export let disabled = false;
</script>

<style>
  .button:disabled {
    color: white;
    background-color: gray;
  }
</style>

<button
  class={`button button--${color} button--${size}`}
  class:button--mobileFull={mobileFull}
  {type}
  {disabled}
  on:click>
  <slot>{text}</slot>
</button>
