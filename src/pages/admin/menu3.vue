<template>
  <div id="menu3" style="width:99%">
    <el-row>
      <el-col :span="18">
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
              <el-input v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
              <el-form-item label="">
              <el-input v-model="formInline.phone" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="formInline.gskm" placeholder="活动区域" clearable>
                <el-option label="科目二" value="shanghai"></el-option>
                <el-option label="科目三" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="dialogFormVisible=true">添加教练</el-button>
      </el-col>
    </el-row>
   
    <!-- 添加教练弹出框表单 -->
    <el-dialog title="添加教练" :visible.sync="dialogFormVisible">
  <el-form :model="dialogform">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="dialogform.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="dialogform.phone" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="身份证号" :label-width="formLabelWidth">
      <el-input v-model="dialogform.sfz" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="归属科目" :label-width="formLabelWidth">
      <el-select v-model="dialogform.gskm" placeholder="请选择活动区域">
        <el-option label="科目二" value="shanghai"></el-option>
        <el-option label="科目三" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>
<!-- 表格 -->
    <div class="table-box">
      <table-com
        :tableData="tableData"
        :columns="columns"
        :checkbox="true"
        :indexNum="false"
        @view="view"
      ></table-com>
    </div>
    <!-- 查看表格 -->
    <el-drawer
      title="我是标题"
      :with-header="false"
      :visible.sync="drawer"
      :direction="direction"
      :size="size"
      class="drawer"
    >
      <div class="drawer-content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="教练信息：" name="first">
            <el-form ref="form" :model="dialogform" label-width="100px">
              <el-form-item label="姓名：">
                <el-input v-model="dialogform.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号：">
                <el-input v-model="dialogform.phone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：">
                <el-input v-model="dialogform.sfz"></el-input>
              </el-form-item>
              <el-form-item label="归属科目：">
                <el-input v-model="dialogform.gskm"></el-input>
              </el-form-item>
              <el-form-item label="状态：">
                <el-input v-model="dialogform.status"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="edit">编辑</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="教学安排" name="second"> 
            <el-row>
              <h2 class="title-style"><span>{{dialogform.name}}</span><span>{{dialogform.gskm}}</span>的教学安排</h2>
            </el-row>
            <el-row class="dateSearch">
              <el-col :span="12">
                  <el-date-picker
                    v-model="timeValue"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="handle">查看</el-button>
              </el-col>
            </el-row>
            <el-row>
              <div class="table-box">
                <table-com
                  :tableData="courseData"
                  :columns="courseColumns"
                  :checkbox="false"
                  :indexNum="true"
                ></table-com>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="教练学员" name="third">
               <div class="table-box">
                <table-com
                  :tableData="studentData"
                  :columns="studentColumns"
                  :checkbox="false"
                  :indexNum="true"
                ></table-com>
              </div>
          </el-tab-pane>
          <el-tab-pane label="教练日志" name="fourth">教练日志</el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import tableCom from "@/components/table";
import { getTeacher,getupdateteacher,getMyStudent,getMyCourse} from "@/request/api.js";

export default {
  name: "Menu3",
  components: {
    tableCom
  },
  data() {
    return {
      value: "",
      options: [
        { label: "全职", value: "0" },
        { label: "科目一", value: "1" },
        { label: "科目二", value: "2" }
      ],
      tableData:null,
      columns: [
        {
          title: "姓名",
          data: "tname",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "手机号",
          data: "tphone",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "归属科目",
          data: "tgskm",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "状态",
          data: "tstatus",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "操作",
          data: "toperate",
          showFlag: { align: "center", width: "", delete: true, view: true }
        }
      ],
      drawer: false,
      direction: "rtl",
      size: "40%",
      activeName: "first",
      formInline: {
        name: "",
        phone: "",
        gskm: "",
      },
      dialogFormVisible: false,
      dialogform: {
          id:"",
          name: '',
          phone: '',
          sfz: "",
          gskm: "",
          status: ""
        },
        formLabelWidth: '120px',
        studentData:null,
        studentColumns:[
          {
          title: "姓名",
          data: "sname",
          showFlag: { align: "center", width: "" }
        },
         {
          title: "手机号",
          data: "sphone",
          showFlag: { align: "center", width: "" }
        },
        ],
        courseData:null,
        courseColumns:[
          {
          title: "姓名",
          data: "sname",
          showFlag: { align: "center", width: "" }
        },
         {
          title: "手机号",
          data: "sphone",
          showFlag: { align: "center", width: "" }
        },
        ],
        timeValue:''
    };
  },
created(){
getTeacher({
      name:this.formInline.name,
      phone:this.formInline.phone,
      gskm:this.formInline.gskm,
      }).then(res=>{
  this.tableData=res.result
})
},
  methods: {
    search(){
    getTeacher({
      name:this.formInline.name,
      phone:this.formInline.phone,
      gskm:this.formInline.gskm,
      }).then(res=>{
      this.tableData=res.result
    })
    },
    edit(){
      getupdateteacher({
        id:this.dialogform.id,
        name:this.dialogform.name,
        phone:this.dialogform.phone,
        sfz:this.dialogform.sfz,
        gskm:this.dialogform.gskm,
        status:this.dialogform.status
      }).then(res=>{
        this.drawer=false
      })
    },
    view(row) {
      this.drawer = true;
      this.dialogform.id=row.tid
      this.dialogform.name=row.tname
      this.dialogform.phone=row.tphone
      this.dialogform.sfz=row.tsfz
      this.dialogform.gskm=row.tgskm
      this.dialogform.status=row.tstatus
      getMyStudent({id:row.tid}).then(res=>{
        this.studentData=res.result
      })
      //当天的教学安排
      var day = new Date();
      day.setTime(day.getTime());
      var month=day.getMonth()+1
      month>10?month=month:month='0'+month
      this.timeValue = day.getFullYear()+"-" + month + "-" + day.getDate();
      getMyCourse({id:this.dialogform.id,time:this.timeValue}).then(res=>{
        this.courseData=res.result
      })
    },
    save(){
      this.$store.dispatch("getaddteacher",{
        name:this.dialogform.name,
        gskm:this.dialogform.gskm}
        );
        this.dialogFormVisible=false
    },
    //查询教学安排
    handle(){
      getMyCourse({id:this.dialogform.id,time:this.timeValue}).then(res=>{
        console.log(res,'this is course table')
        this.courseData=res.result
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.drawer-content {
  padding: 20px;
}
.dateSearch{
  margin-bottom: 20px;
}
.title-style{
  font-weight: normal;
  color: #333;
  span{
    font-weight: bold;
    margin: 0 5px;
  }
}
</style>
