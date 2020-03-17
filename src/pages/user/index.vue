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
            <li><label>角色：</label><span>学员</span></li>
            <li>
              <label>账号：</label>
              <span v-show="showInput===false">{{username}}</span>
              <el-input v-show="showInput===true" v-model="username" maxlength="10" show-word-limit/>
            </li>
            <li>
              <label>密码：</label>
              <span v-show="showInput===false">{{password}}</span>
              <el-input v-show="showInput===true" v-model="password" maxlength="10" show-word-limit/>
            </li>
            <li>
              <label>姓名：</label>
              <span v-show="showInput===false">{{sname}}</span>
              <el-input v-show="showInput===true" v-model="sname" maxlength="10" show-word-limit/>
            </li>
            <li>
              <label>身份证：</label>
                <span v-show="showInput===false">{{sfz}}</span>
              <el-input v-show="showInput===true" v-model="sfz" maxlength="18" show-word-limit/>
            </li>
            <li>
              <label>电话：</label>
                <span v-show="showInput===false">{{sphone}}</span>
              <el-input v-show="showInput===true" v-model="sphone" maxlength="11" show-word-limit/>
            </li>
              <li>
              <label>学费：</label>
                <span>{{sxf}}</span>
              <el-button v-show="sxf==='未交'" type="text" style="padding:0;float:right">请去驾校进行缴费</el-button>
            </li>
            <li v-show="sxf==='已交'">
              <label>报名时间：</label>
                <span>{{sbmsj}}</span>
            </li>
            <li v-show="sxf==='已交'">
              <label>进度：</label>
                <span>{{sjd}}</span>
            </li>
            <li v-show="sxf==='已交'">
              <label>套餐：</label>
                <span>{{stc}}</span>
            </li>
          </ul>
      </div>
    </el-card>
  </div>
  <div class="right">
<el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(item,index) in releaseData"
        :key="index"
        :timestamp="item.rtime"
        placement="top"
      >
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <h2>{{item.rtitle}}<span style="font-weight:normal;font-size:12px;margin:20px">发布给：{{item.rpeople==='0'?'全部':item.rpeople==='1'?'学员':'教练'}} </span>
               <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
                <el-button style="float: right; margin: 0 10px" type="primary" icon="el-icon-reading" circle @click="view(item)"></el-button>
              </el-tooltip>
            </h2>
          </div>
          <article v-html="ellipsis(item.rcontent)" ></article>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
  </div>
</template>

<script>
import {getLoginStudent,getUpdateLogin,getUpdateUser,getRelease,} from "@/request/api.js";
export default {
  name: "Index",
  data() {
    return {
      id:'',
      username: "",
      password: "",
      showInput: false,
      sname:'',
      sfz:'',
      sphone:'',
      sbmsj:'',
      sjd:'',
      sxf:'',
      stc:'',
      releaseData:null,
      people:'',
      reverse:true
    };
  },
  created() {
    this.initName()
    this.getData()
    getLoginStudent({id:this.id}).then(res=>{
      this.sid=res.result[0].sid
      this.sname=res.result[0].sname
      this.sfz=res.result[0].sfz
      this.sphone=res.result[0].sphone
      this.sbmsj=res.result[0].sbmsj
      this.sjd=res.result[0].sjd
      this.sxf=res.result[0].sxf
      this.stc=res.result[0].stc
    })
  },
  methods: {
     initName() {
      let ses = window.sessionStorage;
      this.username = ses.username;
      this.password = ses.password;
      this.id = ses.id;
    },
     getData(){
      getRelease({rpeople:'1'}).then(res=>{
        this.releaseData=res.result
        if(res.result.rpeople==='0'){
          this.people='全部人'
        }
        if(res.result.rpeople==='1'){
          this.people='学员'
        }
        if(res.result.rpeople==='2'){
          this.people='教练'
        }
      })
    },
     ellipsis(value) {
      if (!value) return "";
      if (value.length > 90) {
        return value.slice(0, 90) + "...";
      }
      return value;
  },
   view(item){
      this.$store.commit('setContent',item)
      this.$router.push({path:'/user/studentView'})
    },
    edit() {
      this.showInput = !this.showInput;
    },
    save() {
      this.showInput = !this.showInput;
      getUpdateLogin({
        id: this.id,
        username: this.username,
        password: this.password
      }).then(res => {
        getUpdateUser({
         id:this.sid,
         name:this.sname,
         phone:this.sphone,
         sfz:this.sfz,
        }).then(res=>{
        this.$message({
          message: "保存成功，请重新登录",
          type: "success"
        });
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1000);
        })
        window.sessionStorage.removeItem("username");
      });
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
      li{
        label{
          width:80px;
          display: inline-block;
        }
      }
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