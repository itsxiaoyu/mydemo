<template>
  <div id="appointment" style="width:99%">
    <el-row>
      <el-col :span="8">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
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
      <el-col :span="10">
        <el-alert title="请预约一个你喜欢的教练" type="success" :closable="false"></el-alert>
      </el-col>
    </el-row>
    <div class="table-box">
      <table-com
        :tableData="showData"
        :columns="columns"
        :checkbox="false"
        :indexNum="true"
        @appointment="appointment"
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
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="预约" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm">
        <el-form-item label="预约时间" prop="time">
          <el-date-picker
            v-model="dialogForm.time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptionsStart"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableCom from "@/components/table";
import { getTeacher, getLoginStudent, getAppointTeacher } from "@/request/api";
export default {
  name: "Appointment",
  components: {
    tableCom
  },
  data() {
    return {
      options: [
        { label: "科目二", value: "科目二" },
        { label: "科目三", value: "科目三" }
      ],
      searchForm: {
        gskm: ""
      },
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
          title: "教龄",
          data: "tage",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "操作",
          data: "operate",
          showFlag: { align: "center", width: "", appointment: true }
        }
      ],
      total: 0,
      pageSize: 5,
      pageIndex: 1,
      showData: [],
      dialogFormVisible: false,
      dialogForm: {
        time: ""
      },
      rules: {
        time: [{ required: true, message: "请输入时间", trigger: "blur" }]
      },
      pickerOptionsStart: {
        disabledDate(time) {
          return (
            time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          );
        }
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取表格数据
    getData() {
      getTeacher({ name: "", phone: "", gskm: "" }).then(res => {
        this.tableData = res.result;
        this.total = res.result.length;
        this.showData = this.tableData.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      });
      let ses = window.sessionStorage;
      this.id = ses.id;
      getLoginStudent({ id: this.id }).then(res => {
        this.sid = res.result[0].sid;
      });
    },
    //查询
    search() {
      if (
        this.searchForm.name === "" &&
        this.searchForm.phone === "" &&
        this.searchForm.gskm === ""
      ) {
        this.getData();
      } else {
        getTeacher({
          name: "",
          phone: "",
          gskm: this.searchForm.gskm
        }).then(res => {
          this.tableData = res.result;
          this.showData = this.tableData.slice(
            (this.pageIndex - 1) * this.pageSize,
            this.pageIndex * this.pageSize
          );
        });
      }
    },
    appointment(row) {
      this.tid = row.tid;
      this.dialogFormVisible = true;
      this.start=row.tqjsj.slice(0,10)
      this.end=row.tqjsj.slice(11)
    },
    addSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var time = new Date(this.dialogForm.time);
          var start = new Date(this.start);
          var end = new Date(this.end);
        if(time.getTime() >= start.getTime()&&time.getTime()<=end.getTime()){
             this.$message.error(
                `该教练${this.dialogForm.time}请假，请另约时间`
              );
        }else {
             getAppointTeacher({
            time: this.dialogForm.time,
            sid: this.sid,
            tid: this.tid
          }).then(res => {
            if (res.status === 0) {
              this.$message.error(
                `该教练${this.dialogForm.time}行程已满，请另约时间`
              );
            }
            if (res.status === 1) {
              this.$message.success(`预约成功`);
              this.dialogFormVisible = false;
            }
            
          });
        }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      console.log(`当前页: ${val}`);
      this.showData = this.tableData.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
