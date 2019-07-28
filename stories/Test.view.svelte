<script>
  import Tabs from "../src/Tabs.svelte";
</script>

<Tabs tabs={['Tab 1', 'Tab 2', 'Tab 3']}>
  <div slot="content" let:index let:tab>
    <p>Index: {index} Tab: {tab}</p>
    {#if index === 0}
      <p>Content 1</p>
    {:else if index === 1}
      <p>Content 2</p>
    {:else if index === 2}
      <p>Content 3</p>
    {/if}
  </div>
</Tabs>
