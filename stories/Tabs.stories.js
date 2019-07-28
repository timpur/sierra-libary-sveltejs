import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Tabs from "../src/Tabs.svelte";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];
const on = {
  change: action("change")
};

storiesOf("Tabs", module).add("with selection", () => ({
  Component: Tabs,
  props: { tabs, current: 1 },
  on
}));
