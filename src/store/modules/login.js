import { getLogin} from "@/request/api.js";
import router from "../../router/index";


const state = {
  // ruleForm: {
  //   user: "",
  //   pwd: ""
  // },
  // result: null,
  // title: "",
};
const mutations = {
  // setLogin(state, param) {
  //   state.result = param.result;
  // },
  // setUser(state, n) {
  //   state.ruleForm.user = n;
  // },
  // setPwd(state, n) {
  //   state.ruleForm.pwd = n;
  // },
};
const actions = {
  //登录
  getLogin(context,{ 
    username:username,
    password:password}) {
    getLogin({
      username:username,
      password:password,
    }).then(res => {
        console.log(res)
        if(res.status==1){
          let ses = window.sessionStorage;
          ses.setItem("id", res.result.id);
          ses.setItem("username", res.result.username);
          ses.setItem("password", res.result.password);
          console.log(ses, "ses");
          // state.title = ses.username;
          if(res.result.role===1){
            router.push("/user/index")
            console.log(11111)
          }else{
            router.push("/admin/index");
          }
        }else{
          alert("密码错误！");
        }
    }); 
  },
  loginOut() {
    // 注销后 清除session信息 ，并返回登录页
    window.sessionStorage.removeItem("username");
    router.push("/login");
  },
};
export default {
    // namespaced: true,
    state,
    actions,
    mutations
  }