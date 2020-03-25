<template>
  <div style="width:90%;margin:0 auto;height:500px;overflow-y:scroll">
    <el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="未处理" name="first">
          <span slot="label">未处理<el-badge :value="num1" /></span>
        <el-table :data="tableData" :show-header="false">
            <el-table-column prop="econtent">
            </el-table-column>
            <el-table-column prop="etime" width="100px"></el-table-column>
            <el-table-column prop="sname" width="100px"></el-table-column>
            <el-table-column  width="100px">
                <template slot-scope="scope">
                    <el-button @click="handClick(scope.$index,scope.row)">已处理</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="已处理" name="second">
        <span slot="label">已处理<el-badge :value="num2" /></span>
        <el-table :data="tableData2" :show-header="false">
            <el-table-column prop="econtent">
            </el-table-column>
            <el-table-column prop="etime" width="100px"></el-table-column>
            <el-table-column prop="sname" width="100px"></el-table-column>
            <el-table-column  width="100px">
                <template slot-scope="scope">
                    <el-button @click="handClick(scope.$index,scope.row)">已处理</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import {getMessage,getUpdateMessage} from "@/request/api";
export default {
  name: "Message",
  components: {},
  data() {
    return {
     activeName: 'first',
     tableData:null,
     tableData2:null,
     num1:0,
     num2:0
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData(){
      getMessage({estatus:'未处理'}).then(res=>{
          this.tableData=res.result
          this.num1=this.tableData.length
      })
      getMessage({estatus:'已处理'}).then(res=>{
          this.tableData2=res.result
          this.num2=this.tableData2.length
      })
    },
    tabClick(tab) {
        if(tab.index===0){
          getMessage({estatus:'未处理'}).then(res=>{
          this.tableData=res.result
          this.num1=this.tableData.length
            })  
        }else{
            getMessage({estatus:'已处理'}).then(res=>{
                this.tableData2=res.result
                this.num2=this.tableData2.length
            })  
        }
    },
    handClick(index,row){
        getUpdateMessage({eid:row.eid,estatus:'已处理'}).then(res=>{
            this.getData()
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
