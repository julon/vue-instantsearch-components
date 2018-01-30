<template lang="pug">
  .Index
    slot
</template>

<script>
export default {
  name: "Index",
  inject: ["appId", "client"],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  provide() {
    return {
      indexId: this.id
    };
  },
  created() {
    this.client.then(() => {
      this.$algoliaStore.dispatch("initIndex", {
        appId: this.appId,
        indexId: this.id
      });
      // empty search
      this.$algoliaStore.dispatch("search", {
        indexId: this.id,
        text: ""
      });
    });
  },
  destroyed() {
    this.$algoliaStore.dispatch("destroyIndex", {
      appId: this.appId,
      indexId: this.id
    });
  }
};
</script>
