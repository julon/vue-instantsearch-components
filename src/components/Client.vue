<template lang="pug">
  .Client
    slot
</template>

<script>
export default {
  name: "Client",
  props: {
    appId: {
      type: String,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    }
  },
  provide() {
    return {
      appId: this.appId,
      // provide a promise to component children since init is async
      client: this.$algoliaStore.dispatch("initClient", {
        appId: this.appId,
        apiKey: this.apiKey,
        options: {}
      })
    };
  },
  destroyed() {
    this.$algoliaStore.dispatch("destroyClient", {
      appId: this.appId,
      id: this.id
    });
  }
};
</script>
