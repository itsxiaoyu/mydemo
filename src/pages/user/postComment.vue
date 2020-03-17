<template>
  <div style="width:99%">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="name" placeholder="被评者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="primary" icon="el-icon-plus " @click="add">添加评论</el-button>
      </el-col>
    </el-row>
      <el-dialog title="添加评论" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
        <el-form-item label="评论人：" label-width="100px" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="被评者：" label-width="100px" prop="tname">
          <el-input v-model="dialogForm.tname"></el-input>
        </el-form-item>
        <el-form-item label="评价星级：" label-width="100px" prop="pjxj" class="rate">
          <el-rate v-model="dialogForm.pjxj"></el-rate>
        </el-form-item>
        <el-form-item label="评价内容：" label-width="100px" prop="pjnr">
          <el-input v-model="dialogForm.pjnr" type="textarea" :rows="3"></el-input>
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
import {getComment,getAddComment} from "@/request/api";
export default {
  name: "PostComment",
  components: {
    tableCom
  },
  data() {
    return {
      name: "",
      tableData: null,
      columns: [
        {
          title: "评价人",
          data: "mname",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "被评者",
          data: "tname",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "评价星级",
          data: "pjxj",
          showFlag: { align: "center", width: "",rate:true }
        },
        {
          title: "评价内容",
          data: "pjnr",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "评价时间",
          data: "pjsj",
          showFlag: { align: "center", width: "" }
        }
      ],
      total:0,
      pageSize:5,
      pageIndex:1,
      showData:[],
      dialogFormVisible:false,
      dialogForm:{
        name:'',
        tname:'',
        pjxj:0,
        pjnr:''
      },
       rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        tname: [{ required: true, message: "请输入被评论者名字", trigger: "blur" }],
        pjxj: [{ required: true, message: "请选择评价星级", trigger: "blur" }],
        pjnr: [{ required: true, message: "请输入200字以内评价内容", trigger: "blur" },
         { min: 1, max: 200, message: "长度在 1 到 200 个字", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
     //获取表格数据
    getData() {
      getComment({ name: "" }).then(res => {
        this.tableData = res.result;
        this.total=res.result.length
        this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      });
    },
    search() {
      if (this.name === "") {
        this.getData();
      } else {
        getComment({
          name: this.name
        }).then(res => {
          this.tableData = res.result;
          this.showData=this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        });
      }
    },
    add(){
      this.dialogFormVisible=true
      this.dialogForm={
        name:'',
        tname:'',
        pjxj:0,
        pjnr:'',
      }
    },
    addSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           var day=new Date()
          day.setTime(day.getTime())
          var month=day.getMonth()+1
          month>10?month=month:month='0'+month
          this.timeValue=day.getFullYear()+"-"+month+"-"+day.getDate()
          getAddComment({
            name:this.dialogForm.name,
            tname:this.dialogForm.tname,
            pjxj:this.dialogForm.pjxj,
            pjnr:this.dialogForm.pjnr,
            pjsj:this.timeValue
          }).then(res=>{
            this.getData()
          })
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
.rate{
  .el-rate {
    height: 20px;
    line-height: 2.3;
}
}

</style>
