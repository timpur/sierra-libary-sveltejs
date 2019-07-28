<script>
  export let size = "";
</script>

<div
  class:container={!size}
  class:container-medium={size === 'medium'}
  class:container-small={size === 'small'}>
  <slot />
</div>
