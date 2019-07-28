import { storiesOf } from "@storybook/svelte";

import GridView from "./Grid.view.svelte";

storiesOf("Grid", module).add("with defaults", () => ({
  Component: GridView,
  props: {}
}));
