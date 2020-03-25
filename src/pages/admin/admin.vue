<template>
  <div id="login">
    <header-bar></header-bar>
    <el-container>
      <aside-bar :menuList="menu"></aside-bar>
      <div class="content-right" :style="{width: rightWidth +'%'}">
        <tabs></tabs>
        <div style="padding:20px">
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
    tabs,
  },
  data() {
    return {
    rightWidth:94
    };
  },
  computed: {
    ...mapState({
      menu:state=>state.menu.menu,
      isCollapse:state=>state.menu.isCollapse
    }),
  },
  watch: {
      isCollapse(val) {
        this.value = this.isCollapse;
        if(this.value===true){
          this.rightWidth=94
        }else{
          this.rightWidth=78
        }
      }
  },
  created() {
    this.$store.dispatch('getMenu',{index:1,path:this.$route.path})
  },
  methods: {
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-right{
  display:inline-block;
  min-height:600px;
}
</style>
