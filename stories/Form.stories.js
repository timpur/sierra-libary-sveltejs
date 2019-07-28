import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

// import Input from "../src/Input.svelte";
import Form from "./Form.view.svelte";

storiesOf("Form", module).add("with validation", () => ({
  Component: Form,
  props: {}
}));
