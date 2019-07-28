import { storiesOf } from "@storybook/svelte";
import { action } from "@storybook/addon-actions";

import Notification from "../src/Notification.svelte";

storiesOf("Notification", module)
  .add("with success", () => ({
    Component: Notification,
    props: { type: "success", message: "Success" }
  }))
  .add("with info", () => ({
    Component: Notification,
    props: { type: "info", message: "Info" }
  }))
  .add("with warning", () => ({
    Component: Notification,
    props: { type: "warning", message: "Warning" }
  }))
  .add("with error", () => ({
    Component: Notification,
    props: { type: "error", message: "Error" }
  }));
