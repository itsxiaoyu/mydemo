<template>
  <div id="index">
    <div class="left">
      <el-row>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>个人资料</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="edit"
              v-show="!showInput"
            >修改</el-button>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="save"
              v-show="showInput"
            >保存</el-button>
          </div>
          <div>
            <ul class="info">
              <li>角色：管理员</li>
              <li>
                账号：
                <span v-show="showInput===false">{{username}}</span>
                <el-input
                  v-show="showInput===true"
                  v-model="username"
                  maxlength="10"
                  show-word-limit
                />
              </li>
              <li>
                密码：
                <span v-show="showInput===false">{{password}}</span>
                <el-input
                  v-show="showInput===true"
                  v-model="password"
                  maxlength="10"
                  show-word-limit
                />
              </li>
            </ul>
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>代办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="addItem">添加</el-button>
          </div>
          <div>
            <el-alert
              v-for="(item,index) in todolist"
              :key="index"
              type="success"
              @close="deleteItem(item.oid)"
            >
              <template slot="title">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="item.todolist"
                >
                  <el-button type="text" slot="reference">{{ellipsis(item.todolist)}}</el-button>
                </el-popover>
              </template>
            </el-alert>
          </div>
        </el-card>
      </el-row>
    </div>
    <div class="right">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>教练总数</span>
            </div>
            <div>
              <h1>{{teacherNum}}</h1>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>学员总数</span>
            </div>
            <div>
              <h1>{{studentNum}}</h1>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>未交费人数</span>
            </div>
            <div>
              <h1>{{notPaying}}</h1>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="6">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>拿证人数</span>
            </div>
            <div>
              <h1>45</h1>
            </div>
          </el-card>
        </el-col> -->
      </el-row>
      <el-row style="display:flex;justify-content:space-around;margin-top:43px">
        <div id="myChart" style="width: 50%;height: 400px;"></div>
        <div id="myRightChart" style="width: 50%;height: 400px;"></div>
      </el-row>
    </div>
    <el-dialog title="添加代办事项" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="活动名称" label-width="80px" prop="todoItem">
          <el-input v-model="form.todoItem" type="textarea" :rows="5"></el-input>
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
import {
  getUpdateLogin,
  getTeacher,
  getStudent,
  getNotPaying,
  getTodo,
  getAddTodo,
  getDeleteTodo
} from "@/request/api.js";
export default {
  name: "Index",
  data() {
    return {
      id: "",
      username: "",
      password: "",
      teacherNum: 0,
      studentNum: 0,
      notPaying: 0,
      showInput: false,
      todolist: null,
      dialogFormVisible: false,
      form: {
        todoItem: ""
      },
      rules: {
        todoItem: [
          { required: true, message: "请输入代办事项", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur"
          }
        ]
      },
      xsb:0,
      ptb:0,
      scb:0,
      ksr:0,
      kms:0,
    };
  },
  created() {
    this.initName();
    getTeacher({ name: "", phone: "", gskm: "" }).then(res => {
      this.teacherNum = res.result.length;
    }),
    getTeacher({ name: "", phone: "", gskm: "科目二" }).then(res => {
      this.kmr=res.result.length
    }),
    getTeacher({ name: "", phone: "", gskm: "科目三" }).then(res => {
      this.kms=res.result.length
    }),
      getStudent({ phone: "" }).then(res => {
        this.studentNum = res.result.length;
        for(var item of res.result){
          if(item.stc==="学生班"){
           this.xsb++
          }
          if(item.stc==="普通班"){
           this.ptb++
          }
          if(item.stc==="速成班"){
           this.scb++
          }
        }
      }),
      getNotPaying().then(res => {
        this.notPaying = res.result.length;
      });
    this.getTodoData();
  },
  mounted() {
    setTimeout(() => {
      this.drawChart();
      this.drawRightChart()
    }, 1000);
  },
  methods: {
    initName() {
      let ses = window.sessionStorage;
      this.username = ses.username;
      this.password = ses.password;
      this.id = ses.id;
    },
    edit() {
      this.showInput = !this.showInput;
    },
    save() {
      this.showInput = !this.showInput;
      getUpdateLogin({
        id: this.id,
        username: this.username,
        password: this.password
      }).then(res => {
        this.$message({
          message: "保存成功，请重新登录",
          type: "success"
        });
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1000);
        window.sessionStorage.removeItem("username");
      });
    },
    getTodoData() {
      getTodo({ id: this.id }).then(res => {
        this.todolist = res.result;
      });
    },
    deleteItem(id) {
      getDeleteTodo({ id: id }).then(res => {
        this.getTodoData();
      });
    },
    addItem() {
      this.dialogFormVisible = true;
    },
    addSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          getAddTodo({ id: this.id, todolist: this.form.todoItem }).then(
            res => {
              this.getTodoData();
              this.dialogFormVisible = false;
              this.form.todoItem = "";
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    },
    drawChart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "各科教练人数占比",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["科目二教练", "科目三教练"]
        },
        series: [
          {
            name: "人数占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "40%"],
            data: [
              { value: this.kmr, name: "科二教练" },
              { value: this.kms, name: "科三教练" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
     drawRightChart() {
      let myChart = this.$echarts.init(document.getElementById("myRightChart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "各套餐人数占比",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["学生班", "普通班","速成班"]
        },
        series: [
          {
            name: "人数占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "40%"],
            data: [
              { value: this.xsb, name: "学生班" },
              { value: this.ptb, name: "普通班" },
              { value: this.scb, name: "速成班" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#index {
  display: flex;
  justify-content: space-around;
  .el-row {
    margin-bottom: 10px;
  }
  .left {
    width: 30%;
    li {
      margin-bottom: 10px;
    }
    .info {
      list-style: none;
    }
    .el-card {
      margin-bottom: 10px;
    }
    .el-input {
      width: 150px;
    }
    .el-alert {
      margin-bottom: 10px;
    }
  }
  .right {
    width: 65%;
    .el-card {
      text-align: center;
    }
  }
}
</style>