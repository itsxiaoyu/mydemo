<template>
  <div id="login">
    <div class="form">
      <div class="title">
        <h1>登录</h1>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            autocomplete="off"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from "../request/api.js";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        user: "",
        pwd: ""
      },
      rules: {
        user: [{ required: true, trigger: "blur" }],
        pwd: [{ required: true, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("getLogin",{username:this.ruleForm.user,password:this.ruleForm.pwd});
        } else {
          console.log("用户名或密码错误");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login {
  background: url("~@/assets/images/bg.jpg") center center no-repeat;
  height: 700px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .form {
    width: 600px;
    margin: 10% auto;
    height: 450px;
    background-color: #fff;
    box-shadow: 0 8px 25px 0 hsla(0, 0%, 82.7%, 0.35);
    border-radius: 10px;
    .title {
      width: 600px;
      height: 117px;
      border-radius: 10px 10px 0 0;
      background-color: #0371d1;
      font-size: 30px;
      color: #fff;
      line-height: 117px;
      h1 {
        text-align: center;
      }
    }
    .demo-ruleForm {
      margin: 10% auto;
      width: 400px;
    }
  }
}
</style>
