<script>
  export let bar = false;
</script>

{#if bar}
  <div class="loadingBar" />
{:else}
  <div class="loadingSpinner">
    <span class="loadingSpinner-inner" />
    <span class="loadingSpinner-inner" />
    <span class="loadingSpinner-inner" />
    <span class="loadingSpinner-inner" />
  </div>
{/if}
