<template>
  <div style="width:99%">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="primary" icon="el-icon-plus " @click="addOpen">添加学员</el-button>
      </el-col>
    </el-row>
    <!-- 添加学员弹出框 -->
    <el-dialog title="添加学员" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input v-model="dialogForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="dialogForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="formLabelWidth" prop="sfz">
          <el-input v-model="dialogForm.sfz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报名时间：" :label-width="formLabelWidth">
          <el-date-picker v-model="dialogForm.bmsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="学费：" :label-width="formLabelWidth">
           <el-select v-model="dialogForm.xf" placeholder="请选择">
            <el-option label="已交" value="已交"></el-option>
            <el-option label="未交" value="未交"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="套餐：" :label-width="formLabelWidth" v-show="dialogForm.xf==='已交'">
           <el-select v-model="dialogForm.tc" placeholder="请选择">
            <el-option label="学生班" value="学生班"></el-option>
            <el-option label="普通班" value="普通班"></el-option>
            <el-option label="速成班" value="速成班"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="进度：" :label-width="formLabelWidth" prop="gskm" v-show="dialogForm.xf==='已交'">
          <el-select v-model="dialogForm.jd" placeholder="请选择">
            <el-option label="科目二" value="科目二"></el-option>
            <el-option label="科目三" value="科目三"></el-option>
          </el-select>
        </el-form-item> -->
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
          <el-tab-pane label="学员信息" name="first">
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
              <el-form-item label="报名时间：">
                <el-date-picker v-model="dialogForm.bmsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="学费：">
                 <el-select v-model="dialogForm.xf" clearable >
                    <el-option
                      v-for="item in xfoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="套餐：" v-show="dialogForm.xf==='已交'">
                  <el-select v-model="dialogForm.tc" placeholder="请选择">
                    <el-option label="学生班" value="学生班"></el-option>
                    <el-option label="普通班" value="普通班"></el-option>
                    <el-option label="速成班" value="速成班"></el-option>
                  </el-select>
              </el-form-item>
              <!-- <el-form-item label="进度：">
                <el-select v-model="dialogForm.jd" placeholder="请选择">
                  <el-option label="科目二" value="科目二"></el-option>
                  <el-option label="科目三" value="科目三"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="edit">编辑</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="预约信息" name="second">
            <el-row>
              <h2 class="title-style">
                <span>{{dialogForm.name}}</span>
                <span>{{dialogForm.jd}}</span>的预约记录
              </h2>
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
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import tableCom from "@/components/table";
import {
  getDeleteStudent,
  getUpdateStudent,
  getAddStudent,
  getStudent,
  getMyAppointment
} from "@/request/api";
export default {
  name: "Menu4",
  components: {
    tableCom
  },
  data() {
    return {
      phone: "",
      options: [
        { label: "科目二", value: "科目二" },
        { label: "科目三", value: "科目三" }
      ],
      xfoptions:[
        { label: "已交", value: "已交" },
        { label: "未交", value: "未交" }
      ],
      tableData: null,
      columns: [
        {
          title: "姓名",
          data: "sname",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "账号",
          data: "username",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "密码",
          data: "password",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "手机号",
          data: "sphone",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "报名时间",
          data: "sbmsj",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "套餐",
          data: "stc",
          showFlag: { align: "center", width: "" }
        },
         {
          title: "套餐",
          data: "sxf",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "操作",
          data: "operate",
          showFlag: { align: "center", width: "", delete: true, view: true }
        }
      ],
      drawer: false,
      direction: "rtl",
      size: "40%",
      activeName: "first",
      dialogFormVisible: false,
      dialogForm: {
        id: "",
        username:'',
        password:'',
        name: "",
        phone: "",
        sfz: "",
        jd: "",
        tc: "",
        xf: "",
        bmsj: ""
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      courseData: null,
      courseColumns: [
        {
          title: "预约时间",
          data: "time",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "预约教练",
          data: "tname",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "联系教练",
          data: "tphone",
          showFlag: { align: "center", width: "" }
        }
      ],
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
    search() {
      if (this.phone === "") {
        this.getData();
      } else {
        getStudent({
          phone: this.phone
        }).then(res => {
          this.tableData = res.result;
          this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        });
      }
    },
    //获取表格数据
    getData() {
      getStudent({ phone: "" }).then(res => {
        this.tableData = res.result;
        this.total=res.result.length
        this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      });
    },
    //查看
    view(row) {
      this.drawer = true;
      this.dialogForm.id = row.sid;
      this.dialogForm.name = row.sname;
      this.dialogForm.phone = row.sphone;
      this.dialogForm.sfz = row.sfz;
      this.dialogForm.bmsj = row.sbmsj;
      this.dialogForm.tc = row.stc;
      this.dialogForm.xf = row.sxf;
      getMyAppointment({id:this.dialogForm.id}).then(res=>{
        this.courseData=res.result
        this.dialogForm.jd=res.result[0].tgskm
      })
    },
    deleteRow(row) {
      getDeleteStudent({ id: row.sid }).then(res => {
        if (res.status === 1) {
          this.getData();
        }
      });
    },
    edit() {
      getUpdateStudent({
        id: this.dialogForm.id,
        name: this.dialogForm.name,
        phone: this.dialogForm.phone,
        sfz: this.dialogForm.sfz,
        bmsj: this.dialogForm.bmsj,
        tc: this.dialogForm.tc,
        xf: this.dialogForm.xf,
        // jd: this.dialogForm.jd
      }).then(res => {
        this.getData();
        this.drawer = false;
      });
    },
    addOpen() {
      this.dialogFormVisible = true;
      this.dialogForm.id = "";
       this.dialogForm.username = "";
      this.dialogForm.password = "";
      this.dialogForm.name = "";
      this.dialogForm.phone = "";
      this.dialogForm.sfz = "";
      this.dialogForm.jd = "";
      this.dialogForm.tc = "";
      this.dialogForm.xf = "";
      this.dialogForm.bmsj = "";
    },
    //添加
    addSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getAddStudent({
            username:this.dialogForm.username,
            password:this.dialogForm.password,
            name: this.dialogForm.name,
            phone: this.dialogForm.phone,
            sfz: this.dialogForm.sfz,
            // jd: this.dialogForm.jd,
            tc: this.dialogForm.tc,
            xf: this.dialogForm.xf,
            bmsj: this.dialogForm.bmsj
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
