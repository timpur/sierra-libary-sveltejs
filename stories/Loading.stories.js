import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Loading from "../src/Loading.svelte";

storiesOf("Loading", module)
  .add("with bar", () => ({
    Component: Loading,
    props: { bar: true }
  }))
  .add("with spinner", () => ({
    Component: Loading,
    props: { bar: false }
  }));
