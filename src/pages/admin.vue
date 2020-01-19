<template>
  <div id="login">
    <header-bar></header-bar>
    <el-container>
      <aside-bar :menuList="menu"></aside-bar>
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
  name: "Admin",
  components: {
    headerBar,
    asideBar,
    tabs
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    ...mapState({
      menu:state=>state.menu.menu
    })
  },
  created() {
    this.$store.dispatch('getMenu',{index:1})
  },
  methods: {
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
