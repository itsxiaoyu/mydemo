<template>
  <div style="width:99%">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="carnum" placeholder="车牌号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="primary" icon="el-icon-plus " @click="addOpen">添加车辆</el-button>
      </el-col>
    </el-row>
    <!-- 添加学员弹出框 -->
    <el-dialog title="添加车辆" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
        <el-form-item label="车牌号：" :label-width="formLabelWidth" prop="carnum">
          <el-input v-model="dialogForm.carnum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型：" :label-width="formLabelWidth" prop="type">
           <el-select v-model="dialogForm.type" placeholder="请选择">
            <el-option label="东风标致" value="东风标致"></el-option>
            <el-option label="桑塔纳" value="桑塔纳"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="购买时间：" :label-width="formLabelWidth" prop="cartime">
          <el-date-picker v-model="dialogForm.cartime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
         <el-form-item label="使用者：" :label-width="formLabelWidth" prop="tname">
           <el-select v-model="dialogForm.tname" placeholder="请选择">
            <el-option 
            v-for="(item,index) in teacherList"
            :key="index"
            :value="item.tname"
            :label="item.tname"

            ></el-option>
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
  </div>
</template>

<script>
import tableCom from "@/components/table";
import {getCar,getTeacher,getNotCarTeacher,getAddCar,getDeleteCar} from "@/request/api";
export default {
  name: "car",
  components: {
    tableCom
  },
  data() {
    return {
      carnum: "",
      tableData: null,
      teacherList:null,
      columns: [
        {
          title: "车牌号",
          data: "carnum",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "类型",
          data: "type",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "购买时间",
          data: "cartime",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "使用者",
          data: "tname",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "操作",
          data: "operate",
          showFlag: { align: "center", width: "", delete: true}
        }
      ],
      drawer: false,
      direction: "rtl",
      size: "40%",
      activeName: "first",
      dialogFormVisible: false,
      dialogForm: {
        carnum: "",
        type:'',
        cartime:'',
        tname: "",
      },
      formLabelWidth: "120px",
      rules: {
        carnum: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        cartime: [{ required: true, message: "请选择购买时间", trigger: "blur" }],
        tname: [{ required: true, message: "请选择使用者", trigger: "blur" }],
      },
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
      if (this.carnum === "") {
        this.getData();
      } else {
        getCar({
          carnum: this.carnum
        }).then(res => {
          this.tableData = res.result;
          this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        });
      }
    },
    //获取表格数据
    getData() {
      getCar({ carnum: "" }).then(res => {
        this.tableData = res.result;
        this.total=res.result.length
        this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      });
      getNotCarTeacher().then(res=>{
          this.teacherList=res.result
      })
    },
    deleteRow(row) {
      getDeleteCar({ id: row.carid }).then(res => {
        if (res.status === 1) {
          this.getData();
        }
      });
    },
    edit() {
     
    },
    addOpen() {
      this.dialogFormVisible = true;
      this.dialogForm.carnum = "";
      this.dialogForm.type = "";
      this.dialogForm.tname = "";
      this.dialogForm.cartime = "";
    },
    //添加
    addSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            getAddCar({
                carnum:this.dialogForm.carnum,
                type:this.dialogForm.type,
                cartime:this.dialogForm.cartime,
                tname:this.dialogForm.tname,
            }).then(res=>{
                if (res.status === 1) {
              this.getData();
              this.dialogFormVisible = false;
            } else {
              alert("添加失败");
              this.dialogFormVisible = false;
            }
            })
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
