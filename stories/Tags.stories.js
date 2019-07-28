import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Tags from "../src/Tags.svelte";

const tags = ["Tag 1", "Tag 2", "Tag 3"];
const on = {
  click: action("click")
};

storiesOf("Tags", module).add("with default", () => ({
  Component: Tags,
  props: { tags },
  on
}));
