<template>
  <div id="menu3" style="width:99%">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="searchForm.name" placeholder="教练姓名"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="searchForm.phone" placeholder="教练手机号"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-select v-model="searchForm.gskm" clearable placeholder="归属科目">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="primary" icon="el-icon-plus " @click="addOpen">添加教练</el-button>
      </el-col>
    </el-row>
    <!-- 添加教练弹出框 -->
    <el-dialog title="添加教练" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="dialogForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="sfz">
          <el-input v-model="dialogForm.sfz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
           <el-select v-model="dialogForm.status" placeholder="请选择状态">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="请假" value="请假"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="归属科目" :label-width="formLabelWidth" prop="gskm">
          <el-select v-model="dialogForm.gskm" placeholder="请选择活动区域">
            <el-option label="科目二" value="科目二"></el-option>
            <el-option label="科目三" value="科目三"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <div class="table-box">
      <table-com
        :tableData="showData"
        :columns="columns"
        :checkbox="false"
        :indexNum="true"
        @view="view"
        @deleteRow="deleteRow"
      ></table-com>
    </div>
    <div class="pagination-style">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 查看 -->
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
            <el-form ref="form" :model="dialogForm" label-width="100px">
              <el-form-item label="姓名：">
                <el-input v-model="dialogForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号：">
                <el-input v-model="dialogForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：">
                <el-input v-model="dialogForm.sfz"></el-input>
              </el-form-item>
              <el-form-item label="归属科目：">
                 <el-select v-model="dialogForm.gskm" placeholder="请选择活动区域">
                  <el-option label="科目二" value="科目二"></el-option>
                  <el-option label="科目三" value="科目三"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态：">
                <el-select v-model="dialogForm.status" placeholder="请选择状态">
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="请假" value="请假"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="dialogForm.status==='请假'" label="请假时间：">
                   <el-date-picker
                    v-model="dialogForm.qjsj"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item v-if="dialogForm.status==='请假'" label="请假原因：">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="dialogForm.qjyy">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="edit">编辑</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="预约信息" name="second">
            <el-row>
              <h2 class="title-style"><span>{{dialogForm.name}}</span><span>{{dialogForm.gskm}}</span>的教学安排</h2>
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
                <el-button type="primary" @click="handle">查询</el-button>
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
        </el-tabs>
      </div>
    </el-drawer>
      
  </div>
</template>

<script>
import tableCom from "@/components/table";
import { getTeacher, getDeleteTeacher,getUpdateTeacher, getAddTeacher,getMyStudent,getMyCourse } from "@/request/api";
export default {
  name: "Menu3",
  components: {
    tableCom,
  },
  data() {
    return {
      options: [
        { label: "科目二", value: "科目二" },
        { label: "科目三", value: "科目三" }
      ],
      tableData: null,
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
          data: "operate",
          showFlag: { align: "center", width: "", delete: true, view: true }
        }
      ],
      studentData:null,
      studentColumns:[
         {
          title: "姓名",
          data: "sname",
          showFlag: { align: "center", width: "" }
        },
         {
          title: "电话",
          data: "sphone",
          showFlag: { align: "center", width: "" }
        },
      ],
      drawer: false,
      direction: "rtl",
      size: "40%",
      activeName: "first",
      searchForm: {
        name: "",
        phone: "",
        gskm: "",
      },
      dialogFormVisible: false,
      dialogForm: {
        id:"",
        name: "",
        phone: "",
        sfz: "",
        gskm: "",
        status: "",
        qjsj:'',
        qjyy:''
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        gskm: [{ required: true, message: "请选择科目", trigger: "blur" }]
      },
      courseData:null,
      courseColumns:[
        {
          title:"姓名",
          data:"sname",
          showFlag:{align:"center",width:""}
        },
        {
          title:"手机号",
          data:"sphone",
          showFlag:{align:"center",width:""}
        },
      ],
      timeValue:'',
      total:0,
      pageSize:5,
      pageIndex:1,
      showData:[]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取表格数据
    getData() {
      getTeacher({name:'',phone:'',gskm:''}).then(res => {
        console.log(res)
        this.tableData = res.result;
        this.total=res.result.length
        this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)

      });
    },
    //查看
    view(row) {
      this.drawer = true;
      this.dialogForm.id=row.tid
      this.dialogForm.name=row.tname
      this.dialogForm.phone=row.tphone
      this.dialogForm.sfz=row.tsfz
      this.dialogForm.gskm=row.tgskm
      this.dialogForm.status=row.tstatus
      if(row.tqjsj===null||row.tqjyy===null){
        this.dialogForm.qjsj=""
        this.dialogForm.qjyy=""
      }else{
        this.dialogForm.qjsj=row.tqjsj.split('至')
        this.dialogForm.qjyy=row.tqjyy
      }
      getMyStudent({id:row.tid}).then(res=>{
        console.log(res)
        this.studentData=res.result
      })
        //当天的教学安排
      var day=new Date()
      day.setTime(day.getTime())
      var month=day.getMonth()+1
      month>10?month=month:month='0'+month
      this.timeValue=day.getFullYear()+"-"+month+"-"+day.getDate()
      getMyCourse({id:this.dialogForm.id,time:this.timeValue}).then(res=>{
      this.courseData=res.result
      })
    },
    //搜索时间内练车学员
    handle(){
       getMyCourse({id:this.dialogForm.id,time:this.timeValue}).then(res=>{
        console.log(res,'this is course table')
        this.courseData=res.result
      })
    },
    //删除
    deleteRow(row) {
      getDeleteTeacher({ id: row.tid }).then(res => {
        if (res.status === 1) {
          this.getData();
        }
      });
    },
    edit(){
      var sj=this.dialogForm.qjsj[0]+'至'+this.dialogForm.qjsj[1]
      getUpdateTeacher({
        id:this.dialogForm.id,
        name:this.dialogForm.name,
        phone:this.dialogForm.phone,
        sfz:this.dialogForm.sfz,
        gskm:this.dialogForm.gskm,
        status:this.dialogForm.status,
        qjsj:sj,
        qjyy:this.dialogForm.qjyy
      }).then(res=>{
        this.getData()
        this.drawer=false
      })
    },
    //查询
    search(){
      if(this.searchForm.name===''&&this.searchForm.phone===''&&this.searchForm.gskm===''){
        this.getData()
      }else{
         getTeacher({
        name:this.searchForm.name,
        phone:this.searchForm.phone,
        gskm:this.searchForm.gskm
        }).then(res=>{
          this.tableData=res.result
          this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        })
      }
    },
    addOpen(){
      this.dialogFormVisible=true
      this.dialogForm.id=""
      this.dialogForm.name=""
      this.dialogForm.phone=""
      this.dialogForm.sfz=""
      this.dialogForm.gskm=""
      this.dialogForm.status=""
      this.dialogForm.qjsj=""
      this.dialogForm.qjyy=""
    },
    //添加
    addSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getAddTeacher({
            name: this.dialogForm.name,
            phone: this.dialogForm.phone,
            sfz: this.dialogForm.sfz,
            gskm: this.dialogForm.gskm,
            status: this.dialogForm.status
          }).then(res => {
            console.log(res);
            if (res.status === 1) {
              this.getData();
            } else {
              alert("该用户已注册");
              this.dialogFormVisible = false;
            }
          });
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize=val
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex=val
        console.log(`当前页: ${val}`);
      this.showData=this.tableData.slice((val-1)*this.pageSize,val*this.pageSize)
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.drawer-content {
  padding: 20px;
}
.dateSearch{
  margin-bottom: 20px;;
}
.title-style{
  font-weight: normal;
  color:#909399;
  span{
    font-weight: bold;
    margin:0 5px;
    color: #333;
  }
}
</style>