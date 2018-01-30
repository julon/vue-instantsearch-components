<template lang="pug">
  .Results
    ul
      li(v-for="hit in hits" :key="hit.objectID")
        a(:href="hit.url" target="_blank")
          img(:src="hit.image")
          .text {{ hit.name }}
</template>

<script>
export default {
  name: "Results",
  inject: ['appId', 'indexId'],
  computed: {
    hits () {
      const response = this.$algoliaStore.getters.response(this.indexId)
      return response && response.hits
    }
  }
};
</script>