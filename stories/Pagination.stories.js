import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Pagination from "../src/Pagination.svelte";

const pages = ["Page 1", "Page 2", "Page 3"];
const on = {
  prev: action("prev"),
  change: action("change"),
  next: action("next")
};

storiesOf("Pagination", module)
  .add("with pages", () => ({
    Component: Pagination,
    props: { pages, current: 1 },
    on
  }))
  .add("with no pages", () => ({
    Component: Pagination,
    props: { showPrev: true, showNext: true },
    on
  }))
  .add("with no nav", () => ({
    Component: Pagination,
    props: { pages, showPrev: false, showNext: false },
    on
  }));
