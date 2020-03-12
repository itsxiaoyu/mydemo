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
    </el-row>
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
import {getComment} from "@/request/api";
export default {
  name: "Comment",
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
          data: "sname",
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
      // rate:2
      // colors: ['#99A9BF', '#F7BA2A', '#FF9900'] 
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
        console.log(res)
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
