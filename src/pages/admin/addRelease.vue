<template>
  <div style="width:90%;margin:0 auto">
    <el-form ref="form" :model="form">
      <el-form-item label="发布对象:">
        <el-select v-model="form.people" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布标题:">
        <el-col :span="6">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <mavon-editor v-model="form.content" @change="handle" ref=md @imgAdd="$imgAdd"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAddRelease } from "@/request/api";
export default {
  name: "addRelease",
  data() {
    return {
      form: {
        title: "",
        people: "",
        content: '### demo \n ![image](0)'
      },
      // myhtml: "",
      defaultData: "preview",
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "学员"
        },
        {
          value: "2",
          label: "教练"
        }
      ],
      timeValue: "",
    };
  },
  created() {},
  methods: {
    handle(value, render) {
      this.myhtml = render;
      console.log(value, render);
    },
    submit() {
      var day = new Date();
      day.setTime(day.getTime());
      var month = day.getMonth() + 1;
      month > 10 ? (month = month) : (month = "0" + month);
      this.timeValue = day.getFullYear() + "-" + month + "-" + day.getDate();
      getAddRelease({
        title: this.form.title,
        content: this.myhtml,
        people: this.form.people,
        time: this.timeValue
      }).then(res => {
        this.$message({
          message: "发布成功",
          type: "success"
        });
        this.form = {
          title: "",
          people: "",
          content: ""
        };
      });
    },
    $imgAdd(pos, $file){
            // 将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           this.$axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((flag) => {
          })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
