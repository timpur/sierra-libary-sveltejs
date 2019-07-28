<script>
  import { createEventDispatcher } from "svelte";

  export let current = 0;
  export let pages = [];
  export let auto = true;
  export let showPrev;
  export let showNext;

  $: _showPrev = showPrev !== undefined ? showPrev : current > 0;
  $: _showNext = showNext !== undefined ? showNext : current < pages.length - 1;

  const dispatch = createEventDispatcher();
  const onPrev = () => dispatch("prev");
  const onChange = index => {
    if (index === current) return;
    if (auto) current = index;
    dispatch("change", { index, value: pages[index] });
  };
  const onNext = () => dispatch("next");
</script>

<ul class="paginator">
  {#if _showPrev}
    <li class="paginator-item">
      <a href class="paginator-itemLink" on:click|preventDefault={onPrev}>
        Prev
      </a>
    </li>
  {/if}
  {#each pages as page, index}
    <li class="paginator-item">
      <a
        href
        class="paginator-itemLink"
        class:is-active={current === index}
        on:click|preventDefault={() => onChange(index)}>
        <slot>{page}</slot>
      </a>
    </li>
  {/each}
  {#if _showNext}
    <li class="paginator-item">
      <a href class="paginator-itemLink" on:click|preventDefault={onNext}>
        Next
      </a>
    </li>
  {/if}
</ul>
