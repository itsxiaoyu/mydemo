<template>
  <div style="width:90%;margin:0 auto;height:500px;overflow-y:scroll">
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(item,index) in releaseData"
        :key="index"
        :timestamp="item.rtime"
        placement="top"
      >
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <h2>{{item.rtitle}}<span style="font-weight:normal;font-size:12px;margin:20px">发布给：{{item.rpeople==='0'?'全部':item.rpeople==='1'?'学员':'教练'}} </span>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <el-button style="float: right;" type="danger" icon="el-icon-delete" circle @click="deleteItem(item.rid)"></el-button>
              </el-tooltip>
               <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
                <el-button style="float: right; margin: 0 10px" type="primary" icon="el-icon-reading" circle @click="view(item)"></el-button>
              </el-tooltip>
            </h2>
          </div>
          <article v-html="ellipsis(item.rcontent)" ></article>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <!-- <article v-html="myhtml"></article> -->
  </div>
</template>

<script>
import {getRelease,getDeleteRelease} from "@/request/api";
export default {
  name: "Release",
  components: {},
  data() {
    return {
      releaseData:null,
      people:'',
      reverse:true
    };
  },
  created() {
    this.getData()
  },
  methods: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 90) {
        return value.slice(0, 90) + "...";
      }
      return value;
  },
    getData(){
      getRelease({rpeople:''}).then(res=>{
        this.releaseData=res.result
        if(res.result.rpeople==='0'){
          this.people='全部人'
        }
        if(res.result.rpeople==='1'){
          this.people='学员'
        }
        if(res.result.rpeople==='2'){
          this.people='教练'
        }
      })
    },
    deleteItem(index){
      getDeleteRelease({id:index}).then(res=>{
        this.getData()
      })
    },
    view(item){
      this.$store.commit('setContent',item)
      this.$router.push({path:'/admin/viewRelease'})
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
