<template>
  <div id="menu3" style="width:99%">
    <el-row :gutter="12" style="margin-right:0;">
      <el-col :span="4">
        <el-input placeholder="请输入教练姓名或电话"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="4" :offset="8" class="text-right">
        <el-button type="primary" icon="el-icon-plus " @click="drawer = true">添加教练</el-button>
      </el-col>
    </el-row>
    <div class="table-box">
      <table-com
        :tableData="tableData"
        :columns="columns"
        :checkbox="true"
        :indexNum="false"
        @view="view"
      ></table-com>
    </div>
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
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="姓名：">
                <span>{{form.name}}</span>
              </el-form-item>
              <el-form-item label="手机号：">
                <span>{{form.phone}}</span>
              </el-form-item>
              <el-form-item label="身份证号：">
                <span>{{form.ID}}</span>
              </el-form-item>
              <el-form-item label="归属科目：">
                <span>{{form.gskm}}</span>
              </el-form-item>
              <el-form-item label="状态：">
                <span>{{form.status}}</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">编辑</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="预约信息" name="second">预约信息</el-tab-pane>
          <el-tab-pane label="教练学员" name="third">教练学员</el-tab-pane>
          <el-tab-pane label="教练日志" name="fourth">资金记录</el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import tableCom from "@/components/table";
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
      tableData: [
        {
          name: "周涛",
          phone: "123455643322",
          gskm: "科目二",
          status: "请假",
          operate: "删除"
        }
      ],
      columns: [
        {
          title: "姓名",
          data: "name",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "手机号",
          data: "phone",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "归属科目",
          data: "gskm",
          showFlag: { align: "center", width: "" }
        },
        {
          title: "状态",
          data: "status",
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
      form: {
        name: "周教练",
        phone: "123424324413",
        ID: "23213134141451",
        gskm: "科目二",
        status: "请假"
      }
    };
  },

  methods: {
    view(row) {
      this.drawer = true;
      console.log(row);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.drawer-content {
  padding: 20px;
}
</style>
