<script>
  export let col;
  export let sm;
  export let md;
  export let lg;
  export let xl;

  const getSize = (name, size) =>
    size ? `col-${size === true ? name : `${name}-${size}`}` : "";

  $: _sm = getSize("sm", sm);
  $: _md = getSize("md", md);
  $: _lg = getSize("lg", lg);
  $: _xl = getSize("xl", xl);
  $: _class =
    [_sm, _md, _lg, _xl].join(" ").trim(0) || (col ? `col-${col}` : "col");
</script>

{@debug _class}
<div class={_class}>
  <slot />
</div>
