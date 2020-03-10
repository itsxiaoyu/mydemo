<template>
  <div id="menu1">
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
            <span>科目二约车</span>
          </div>
          <div><h1>34</h1></div>
        </el-card>
      </el-col>
       <el-col :span="6">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>科目三约车</span>
          </div>
          <div><h1>45</h1></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getTeacher,getMyStudent} from '@/request/api.js'
export default {
  name: "Index",
  data() {
    return {
      teacherNum:'',
      studentNum:''
    };
  },
  created() {
    getTeacher({name:'',phone:'',gskm:''}).then(res=>{
      this.teacherNum=res.result.length
    }),
    getMyStudent({id:''}).then(res=>{
      this.studentNum=res.result.length
    })
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-card{
  text-align: center;
}
</style>
