<template>
  <div class="box">
    <el-container style="display:inline-block">
      <el-menu
        style="height:600px;background:#545c64;"
        :unique-opened='true'
        :default-active="activeItem"
        router
        @select="clickMenuItem"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
      >
        <fragment v-for="(item,index) in menuList" :key="index+'level1'">
          <!--只有一级菜单-->
          <el-menu-item v-if="item.haschild==false" :index="item.index+''">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <!--二级菜单-->
          <el-submenu v-if="item.haschild==true" :index="item.index+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <fragment v-for="(item,index) in item.children" :key="index+'level2'">
              <el-menu-item :index="item.index+''">
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </fragment>
          </el-submenu>
        </fragment>
      </el-menu>
    </el-container>
    <!-- 侧边栏菜单开关 -->
      <div class="closeSide" @click="isCollapse=!isCollapse">
        <i class="el-icon-d-arrow-left" v-show="isCollapse==true"></i>
        <i class="el-icon-d-arrow-right" v-show="isCollapse==false"></i>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "AsideBar",
  props: {
    menuList: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    ...mapState({
      activeItem:state=>state.menu.activeItem
    })
  },
  methods: {
    //传入当前点击菜单的router
    clickMenuItem(index){
      this.$store.dispatch('clickMenuItem',{index:index})
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.closeSide{
  height: 100%;
  position: absolute;
  right: -10px;
  top: 0;
  background: rgb(84, 92, 100);
  display: flex;
  align-items: center;
  &:hover{
    background: rgb(67, 74, 80);
  }
  i{
    color: #fff;
  }
}
.box{
  position: relative;
  margin-right: 10px;
}
</style>
