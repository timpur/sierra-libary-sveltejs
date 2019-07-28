import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Input from "../src/Input.svelte";

storiesOf("Input", module).add("with text and actions", () => ({
  Component: Input,
  props: {
    name: "test-input",
    label: "Test Input",
    placeholder: "Test Placeholder",
    error: "Value Required."
  }
}));
