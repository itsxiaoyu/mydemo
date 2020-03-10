<template>
  <div>
    <el-table :data="tableData" boder :fit="true" :stripe="true" :highlight-current-row="true" border>
      <el-table-column type="index" width="80" v-if="indexNum" label="序号" header-align="center" align="center">
      </el-table-column>
       <el-table-column type="selection" width="55" v-if="checkbox"></el-table-column>
      <el-table-column v-for="item in columns" :prop="item.key" :key="item.key" :label="item.title" :width="item.showFlag.width" :show-overflow-tooltip="true" header-align="center" :align="item.showFlag.align" >
        <template slot-scope="scope">
          <el-link  v-if="item.showFlag.delete" @click.native.prevent="deleteRow(scope.$index, tableData)" type="primary">删除</el-link>
          <el-link  v-if="item.showFlag.view" @click="view(scope.row)" type="primary">查看</el-link>
          <span v-else>{{scope.row[item.data]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    //表格数据
    tableData: {
      type: Array,
      default(){
        return [];
      }
    },
    //表格列.colums里面的属性 title: "列名",data: "属性名",
    //showFlag: {  align: "文字对齐方式", width: "列宽度",delete:"是否可删除",view："是否可查看"}
    columns: {
      type: Array,
      default(){
        return [];
      }
    },
    //是否需要多选框
     checkbox: {
      type: Boolean,
      default(){
        return true;
      }
    },
    //是否需要序号
    indexNum: {
      type: Boolean,
      default(){
        return true;
      }
    },
  },
  data() {
    return {
      
    };
  },
  mounted(){
  },
  methods: {
    view(row) {
      this.$emit("view", row);
    },
     deleteRow(index, rows) {
        rows.splice(index+1, 1);
        this.$emit("deleteRow",rows[index])
      },
  }
};
</script>
<style lang="scss" scoped>
</style>
