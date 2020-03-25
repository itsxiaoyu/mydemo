<template>
  <div id="login">
    <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles>
    <div class="form">
      <span class="login_span">登录</span>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item  prop="user">
          <el-input type="text" v-model="ruleForm.user" placeholder="账号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item  prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            autocomplete="off"
            @keyup.enter.native="submitForm"
            placeholder="密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item class="operate">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <p class="operate_p" @click="goRegister">没有账号? 去注册</p>
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
        user: [{ required: true, trigger: "blur",message:'请输入账号' }],
        pwd: [{ required: true, trigger: "blur",message:'请输入密码' }]
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
    },
    goRegister(){
      this.$router.push({path:'/register'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login {
  background: url("~@/assets/images/bg.jpg") center center no-repeat;
  // background: #333;
  height: 700px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .form {
    position: absolute;
    top:20%;
    left: 30%;
    .login_span{
      color: #fff;
      font-size: 32px;
      letter-spacing: 2px;
      text-align: center;
      padding-left: 55%;
    }
    .demo-ruleForm {
      margin: 5% auto;
      width: 400px;
    }
    .operate{
      display: flex;
      justify-content: space-between;
      p{
        color: #fff;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: #409EFF;
        }
      }
      
    }
  }
}
</style>