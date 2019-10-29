<template>
  <div>component name here</div>
</template>

<script>
export default {
  name: 'component name here',
  route: {
    path: '',
    name: 'component name here',
    parent: 'home', // TODO：如果不是子路由，清删掉这条
    meta: { title: '新页面' },
    async: false,
  },
  components: {},
  data() {
    return {}
  },
  // TODO：多余的钩子记得删掉(包括我这句！)
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
  filters: {},
  computed: {},
  watch: {},
}
</script>

<style scoped lang='less'>
</style>
