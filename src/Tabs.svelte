<script>
  import { createEventDispatcher } from "svelte";

  export let current = 0;
  export let tabs = [];
  export let auto = true;

  const dispatch = createEventDispatcher();

  const onChange = index => {
    if (index === current) return;
    if (auto) current = index;
    dispatch("change", { index, value: tabs[index] });
  };
</script>

<div class="tabs">
  {#each tabs as tab, index}
    <a
      href
      class="tabs-item "
      class:is-selected={index === current}
      on:click|preventDefault={() => onChange(index)}>
      <slot name="tab" {index} {tab}>{tab}</slot>
    </a>
  {/each}
</div>
<div class="tabs-content">
  <slot name="content" index={current} tab={tabs[current]} />
</div>
