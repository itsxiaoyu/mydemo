<template>
  <div>
    <el-tabs :value="activeItem" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.index"
        :label="item.label"
        :name="item.index"
        :closable="item.closable"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: "Tabs",
  data() {
    return {};
  },
    computed: {
    ...mapState({
      tabs: state=>state.menu.tabs,
      activeItem: state=>state.menu.activeItem
    })
  },
  methods: {
    //tab切换
    tabClick (e) {
      this.$store.dispatch('clickMenuItem',{index:e.name})
      this.$router.push({ path: e.name })
    },
    //tab移除
    removeTab (e) {
      this.$router.push({ path: this.activeItem })
      this.$store.dispatch('closeTab',{index:e})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
