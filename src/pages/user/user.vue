<template>
  <div id="login">
    <header-bar></header-bar>
    <el-container>
      <aside-bar :menuList="menu2"></aside-bar>
      <div style="display:inline-block;height:600px;width:100%;">
        <tabs></tabs>
        <div style="padding:20px;">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import headerBar from "@/components/layout/headerBar";
import asideBar from "@/components/layout/asideBar";
import tabs from "@/components/layout/tabs";
import { mapState, mapActions } from 'vuex'

export default {
  name: "User",
  components: {
    headerBar,
    asideBar,
    tabs
  },
  data() {
    return {
      isCollapse: true,
      // menu: [
      //   {
      //     name: "首页",
      //     haschild: false,
      //     index: "/index",
      //     children: [],
      //     icon: "el-icon-s-home"
      //   },
      //   {
      //     name: "菜单1",
      //     haschild: true,
      //     index: "/menu1",
      //     icon: "el-icon-s-fold",
      //     children: [{ name: "子菜单1-1", haschild: false, index: "/menu1" }]
      //   },
      //   {
      //     name: "菜单2",
      //     haschild: true,
      //     index: "/menu2",
      //     icon: "el-icon-s-fold",
      //     children: [{ name: "子菜单2-1", haschild: false, index: "menu2" }]
      //   }
      // ]
    };
  },
   computed: {
    ...mapState({
      menu2:state=>state.menu.menu
    })
  },
  created() {
    this.$store.dispatch('getMenu',{index:2})
    // if (sessionStorage.getItem("store")) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(sessionStorage.getItem("store"))
    //     )
    //   );
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //   sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    // });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
