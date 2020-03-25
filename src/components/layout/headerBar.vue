<template>
  <div>
    <el-container>
      <el-header>
        <div class="header-title">
          <span @click="handleCollapse(isCollapse)">
          <i class="el-icon-s-fold" v-show="!isCollapse"></i>
          <i class="el-icon-s-unfold" v-show="isCollapse"></i>
          </span>
          <h1>驾校管理系统</h1>
        </div>
        <div class="header-right">
          <el-avatar  :src="circleUrl"></el-avatar>
           <el-dropdown>
          <span class="el-dropdown-link">
            {{title}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="loginOut">
                <i class="el-icon-switch-button"></i>退出
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
       
      </el-header>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderBar",
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      messageNum:0
    };
  },
  created() {
    this.initName();
  },

  computed: {
    // ...mapState({
    //   isCollapse: state => state.menu.isCollapse
    // }),
    isCollapse:{
        get(){
          return this.$store.state.menu.isCollapse
        },
        set(v){
          this.isCollapse = v
        }
    }
  },
  methods: {
    loginOut() {
      this.$store.dispatch("loginOut");
    },
    initName() {
      let ses = window.sessionStorage;
      this.title = ses.username;
    },
    handleCollapse(isCollapse){
     isCollapse=!isCollapse
      this.$store.commit('isCollapse',isCollapse)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  padding: 0 66px 0 20px;
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px !important;
  text-align: right;
  font-size: 20px;
  span {
    color: #fff;
    font-size: 20px;
  }
  .header-title{
    display: flex;
    width: 240px;
    justify-content: space-between;
    align-items: center;
    i{
      font-size: 36px;
      cursor: pointer;
    }
  }
  .header-right{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-avatar--circle{
      margin:0 10px 0 20px;
    }
    .message{
      i{
      font-size: 32px;
      }
    }
    
  }
}
</style>
