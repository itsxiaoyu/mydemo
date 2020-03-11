<template>
  <div>
    <el-tabs :value="activeItem" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane
        v-for="(item,i) in tabs"
        :key="i"
        :label="item.label"
        :name="item.index"
        :closable="item.closable"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { getMenu1 } from "@/request/api";
export default {
  name: "Tabs",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menu,
      tabs: state => state.menu.tabs
    }),
    activeItem: {
      get() {
        return this.$store.state.menu.activeItem;
      },
      set(val) {
        this.$store.commit("switchTab", val);
      }
    }
  },
  mounted() {
    this.$store.dispatch("getTab", {
      index: this.$route.path,
      title: this.$route.meta.title
    });
  },
  watch: {
    // 判断路由是否已经打开
    $route(to, from) {
      let flag = false;
      //已打开，切换至当前路由标签
      for (let item of this.tabs) {
        let name = "/" + to.name;
        if (item.index === name) {
          this.$store.commit("switchTab", name);
          this.$router.push({ path: name });
          flag = true;
          break;
        }
      }
      //未打开,增加tab标签并切换
      if (!flag) {
        let target = this.menu.map(a => a.children).flat().find(f => f.index === to.path);
        this.$store.commit("addTab", {
          index: to.path,
          label: target.name,
          closable: true
        });
        this.$store.commit("switchTab", to.path);
      }
    }
  },

  methods: {
    //tab切换
    tabClick(e) {
      this.$store.dispatch("clickMenuItem", { index: e.name });
      this.$router.push({ path: e.name });
    },
    //tab移除
    removeTab(e) {
      this.$store.dispatch("closeTab", { index: e });
      this.$router.push({ path: this.activeItem });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
