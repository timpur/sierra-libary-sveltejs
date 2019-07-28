<script>
  export let type = "success";
  export let message;
</script>

<div class={`notification notification--${type}`}>
  <slot {message}>
    <p>{message}</p>
  </slot>
</div>
