<template>
  <div id="register">
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
    ></vue-particles>
    <div class="form">
      <span class="login_span">学员注册</span>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="user">
          <el-input type="text" v-model="ruleForm.user" placeholder="账号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            placeholder="1-6位密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            placeholder="确认密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sname">
          <el-input
            type="text"
            v-model="ruleForm.sname"
            placeholder="姓名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sfz">
          <el-input type="text" v-model="ruleForm.sfz" placeholder="18位身份证号" prefix-icon="el-icon-postcard"></el-input>
        </el-form-item>
        <el-form-item prop="sphone">
          <el-input
            type="text"
            v-model="ruleForm.sphone"
            placeholder="11位手机号"
            prefix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
        <el-form-item class="operate">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
           <p class="operate_p" @click="goLogin">返回登录</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getRegister } from "../request/api.js";
export default {
  name: "Login",
  data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
        }
    return {
      ruleForm: {
        user: "",
        pwd: "",
        checkPass:'',
        sfz: "",
        sname: "",
        sphone: ""
      },
      rules: {
        user: [{ required: true, trigger: "blur" ,message:'请输入账号'}],
        pwd: [{ required: true, trigger: "blur",validator: validatePass },
        { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        sfz: [{ required: true, trigger: "blur" ,message:'身份证号格式不对',pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/}],
        sname: [{ required: true, trigger: "blur" ,message:'请输入真实姓名'}],
        sphone: [{ required: true, trigger: "blur" ,message:'手机号码格式不对',pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,}],
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          getRegister({
            name: this.ruleForm.user,
            password: this.ruleForm.pwd,
            sname: this.ruleForm.sname,
            sfz: this.ruleForm.sfz,
            sphone: this.ruleForm.sphone
          }).then(res => {
            if (res.status === 1) {
              this.$message({
                message: "注册成功，请前去登录",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ path: "/login" });
              }, 500);
            } 
            if(res.status===0) {
              this.$message({
                message: "注册失败，该用户已被注册",
                type: "success"
              });
              this.resetForm(formName)
            }
          });
        } else {
          console.log("用户名或密码错误");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goLogin(){
      this.$router.push({path:'/login'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#register {
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
    top: 10%;
    left: 32%;
    .login_span {
      color: #fff;
      font-size: 32px;
      letter-spacing: 2px;
      text-align: center;
      padding-left: 44%;
    }
    .demo-ruleForm {
      margin: 5% auto;
      width: 400px;
    }
    .operate {
      display: flex;
      justify-content: space-between;
      p {
        color: #fff;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>