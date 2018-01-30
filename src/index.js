import store from "./store";

import AlgClient from "./components/Client";
import AlgIndex from "./components/Index";
import AlgResults from "./components/Results";

const LibraryModule = {
  AlgClient, AlgIndex, AlgResults,

  install(Vue) {
    // Register custom algolia search store
    Vue.prototype.$algoliaStore = store
    // Register components with vue
    Vue.component("alg-client", AlgClient);
    Vue.component("alg-index", AlgIndex);
    Vue.component("alg-results", AlgResults);
  }
};

// Export library
export default LibraryModule;
