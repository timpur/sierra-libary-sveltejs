import { storiesOf } from "@storybook/svelte";

import Test from "./Test.view.svelte";

storiesOf("Test", module).add("with test", () => ({
  Component: Test
}));
