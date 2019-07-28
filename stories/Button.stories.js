import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Button from "../src/Button.svelte";

const on = { click: action("clicked") };

storiesOf("Button", module)
  .add("with text and actions", () => ({
    Component: Button,
    props: { text: "Hello Button" },
    on
  }))
  .add("with secondary color", () => ({
    Component: Button,
    props: {
      text: "secondary",
      color: "secondary"
    },
    on
  }))
  .add("with big size", () => ({
    Component: Button,
    props: {
      text: "big size",
      size: "big"
    },
    on
  }))
  .add("with mobile full", () => ({
    Component: Button,
    props: {
      text: "mobile full",
      mobileFull: true
    },
    on
  }));
