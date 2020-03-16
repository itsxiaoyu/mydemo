<template>
  <div id="index">
    <div class="left">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>个人资料</span>
          <el-button type="text" class="button">修改</el-button>
          </div>
          <div>
            <ul class="info">
              <li>账号：{{username}}</li>
              <li>密码：{{password}}</li>
            </ul>
        </div>
        </el-card>
         <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>代办事项</span>
          <el-button type="text" class="button">添加</el-button>
          </div>
          <div>
            el
        </div>
        </el-card>
    </div>
    <div class="right">
 <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>教练总数</span>
          </div>
          <div><h1>{{teacherNum}}</h1></div>
        </el-card>
      </el-col>
       <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>学员总数</span>
          </div>
          <div><h1>{{studentNum}}</h1></div>
        </el-card>
      </el-col>
       <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>未交费人数</span>
          </div>
          <div><h1>{{notPaying}}</h1></div>
        </el-card>
      </el-col>
       <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>拿证人数</span>
          </div>
          <div><h1>45</h1></div>
        </el-card>
      </el-col>
    </el-row>
     <el-row>
      拿证人数echart
    </el-row>
    </div>
   
   
  </div>
</template>

<script>
import {getTeacher,getMyStudent,getNotPaying} from '@/request/api.js'
export default {
  name: "Index",
  data() {
    return {
      username:'',
      password:'',
      teacherNum:'',
      studentNum:'',
      notPaying:'',
    };
  },
  created() {
    getTeacher({name:'',phone:'',gskm:''}).then(res=>{
      this.teacherNum=res.result.length
    }),
    getMyStudent({id:''}).then(res=>{
      this.studentNum=res.result.length
    }),
    getNotPaying().then(res=>{
      this.notPaying=res.result.length
    }),
    this.initName()
  },
  methods: {
    initName() {
      let ses = window.sessionStorage;
      this.username = ses.username;
      this.password=ses.password
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#index{
  display: flex;
  justify-content: space-around;
}
.left{
  width: 30%;
  .el-card{
    margin-bottom: 20px;
  }
  .info {
    list-style: none;
      li{
        margin: 5px auto;
    }
  }
  .button {
    padding: 0;
    float: right;
  }
}
.right{
  width:65%;
  .el-card{
  text-align: center;
}
}
</style>