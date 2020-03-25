<template>
  <div style="width:90%;margin:0 auto;">
    <div class="table">
      <el-table :data="tableData" :show-header="false">
        <el-table-column prop="econtent"></el-table-column>
        <el-table-column prop="etime" width="100px"></el-table-column>
        <el-table-column width="100px" prop="estatus"></el-table-column>
      </el-table>
    </div>
    <el-form :model="form" label-width="120px" class="form">
      <el-form-item label="我的建议：" :span="8">
        <el-input
          v-model="form.econtent"
          placeholder="请写上你的宝贵建议"
          type="textarea"
          maxlength="100"
          show-word-limit
          rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getInsertMessage, getStudentMessage } from "@/request/api";
export default {
  name: "Suggest",
  components: {},
  data() {
    return {
      tableData: null,
      form: {
        econtent: ""
      }
    };
  },
  created() {
    this.initName();
    this.getData();
  },
  methods: {
    initName() {
      let ses = window.sessionStorage;
      this.id = ses.id;
    },
    getData() {
      getStudentMessage({ sid: this.id }).then(res => {
        this.tableData = res.result;
      });
    },
    onSubmit() {
      var day = new Date();
      day.setTime(day.getTime());
      var month = day.getMonth() + 1;
      month > 10 ? (month = month) : (month = "0" + month);
      this.timeValue = day.getFullYear() + "-" + month + "-" + day.getDate();
      getInsertMessage({
        sid: this.id,
        etime:this.timeValue,
        econtent: this.form.econtent
      }).then(res => {
        this.getData();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  height: 200px;
  overflow-y: scroll;
}
.form{
    width: 55%;
}
</style>
