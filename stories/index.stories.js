import { storiesOf } from "@storybook/vue";

// Add more stories here to live develop your components
storiesOf("HelloWorld", module).add("story as a template", () => ({
  template: `<div>
    <alg-client app-id="latency" api-key="3d9875e51fbd20c7754e65422f7ce5e1">
      <alg-index id="bestbuy">
        <alg-results></alg-results>
      </alg-index>
    </alg-client>
  </div>`
}));
