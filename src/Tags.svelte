<script>
  import { createEventDispatcher } from "svelte";

  export let tags = [];

  const dispatch = createEventDispatcher();

  const onClick = index => {
    dispatch("click", { index, tag: tags[index] });
  };
</script>

<ul>
  {#each tags as tag, index}
    <li class="tag">
      <a href on:click|preventDefault={() => onClick(index)}>
        <slot {index} {tag}>{tag}</slot>
      </a>
    </li>
  {/each}
</ul>
