<template>
  <div>
    <el-container>
      <el-header>
        <h1>管理系统</h1>
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
      </el-header>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderBar",
  data() {
    return {};
  },
  created() {
    this.initName();
  },
  computed: {
    // ...mapState({
    //   title: state => state.login.title
    // }),
  },
  methods: {
    loginOut() {
      this.$store.dispatch("loginOut");
    },
    initName() {
      let ses = window.sessionStorage;
      this.title = ses.username;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  padding: 0 66px;
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
}
</style>
