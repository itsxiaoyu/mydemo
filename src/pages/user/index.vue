<template>
  <div id="index">
  <div class="left">
 <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>个人资料</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="edit" v-show="!showInput">修改</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" @click="save" v-show="showInput">保存</el-button>
          </div>
          <div>
            <ul class="info">
              <li>角色：学员</li>
              <li>
                账号：
                <span v-show="showInput===false">{{username}}</span>
                <el-input
                  v-show="showInput===true"
                  v-model="username"
                  maxlength="10"
                  show-word-limit
                />
              </li>
              <li>
                密码：
                <span v-show="showInput===false">{{password}}</span>
                <el-input
                  v-show="showInput===true"
                  v-model="password"
                  maxlength="10"
                  show-word-limit
                />
              </li>
            </ul>
          </div>
        </el-card>
  </div>
  <div class="right">

  </div>
  </div>
</template>

<script>
import {getLoginStudent} from "@/request/api.js";
export default {
  name: "Index",
  data() {
    return {
      id:'',
      username: "",
      password: "",
      showInput: false,
    };
  },
  created() {
    this.initName()
    getLoginStudent({id:this.id}).then(res=>{
      console.log(res)
    })
  },
  methods: {
     initName() {
      let ses = window.sessionStorage;
      this.username = ses.username;
      this.password = ses.password;
      this.id = ses.id;
    },
      edit() {
      this.showInput = !this.showInput;
    },
    save() {
      this.showInput = !this.showInput;
      // getUpdateLogin({
      //   id: this.id,
      //   username: this.username,
      //   password: this.password
      // }).then(res => {
      //   this.$message({
      //     message: "保存成功，请重新登录",
      //     type: "success"
      //   });
      //   setTimeout(() => {
      //     this.$router.push({ path: "/login" });
      //   }, 1000);
      //   window.sessionStorage.removeItem("username");
      // });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#index{
  display: flex;
  justify-content: space-between;
  .left{
    width: 30%;
      li {
      margin-bottom: 10px;
    }
    .info {
      list-style: none;
    }
    .el-card {
      margin-bottom: 10px;
    }
    .el-input {
      width: 150px;
    }
  }
  .right{
    width:65%;
  }
}
</style>