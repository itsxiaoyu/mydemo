# mydemo

> 使用vue cli创建新的项目
>
> 1.支持 router。
>
> 2.支持vuex，store的模块化
>
> 3.添加element作为项目的UI
>
> 4.添加axios作为请求工具，封装axios，可使用get，post，getAwait，postAwait
>
> 5.添加mockjs使项目支持mock。mock模块化
>
> 6.实现登录验证。进行路由守卫。分角色登录。头部的用户名称存session，页面刷新不会消失。
>
> 7.渲染菜单组件，根据传值不同渲染不同菜单
>
> 8.tab导航监听路由，tab标签改变路由改变。路由改变tab标签改变
>
> 9.tab页面刷新路由不变，tab切换保持tab页内容不变
>
> 10.mysql作为数据库，nodejs写数据库操作，连接后台
>
> 11.引入Markdown编辑器
>
> 12.引入echarts绘制统计图

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# 1. 项目启动

###### 1.1安装Vue以及@Vue/cli,webpack

```
npm install vue
npm install -g @vue/cli
npm install -g webpack
```

注：node版本需求需要在8.9以上

###### 1.2创建项目

```
vue init webpack mydemo
```

注：报错

则先执行以下代码在创建项目，原因是升级到了vue/cli3，2创建项目的命令就不能用了了

```
npm i -g @vue/cli-init
```

###### 1.3运行项目

```
npm install
npm run dev
```

# 2. 项目配置

###### 2.1自动打开页面

![1578043417438](C:\Users\foresee\AppData\Roaming\Typora\typora-user-images\1578043417438.png)

###### 2.2引入elementUI

```
npm i element-ui -S

```

main.js中引入

```
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
```

###### 2.3引入scss

```
npm install --save-dev node-sass
npm install --save-dev sass-loader
```

使用

lang="scss"

**全局样式。文件夹assets/styles/common.scss**

###### 2.4引入vuex

```
npm install vuex --save
```

store文件夹下建立index.js

###### 2.5引入axios

```
npm install axios
```

main.js

```
import axios from 'axios';
Vue.prototype.$axios = axios;//全局注册，使用方法为:this.$axios
```

创建request文件夹，下面创建http.js文件和api.js文件

http.js。两种封装方式以get为例

```
//  封装get方法,返回promise对象
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
// 封装getAwait方法,返回async方法
export async function getAwait(url,params={}){
  let res=await axios.get(url,{params:params})
  res=res.data
  return res
}
```

api.js。接口存放

```
import { get, post } from './http'

//登录
export function getLogin(username,password){
	return get('/getLogin',username,password)
}
//home页面表格信息
export  function getUserInfo(param){
	return getAwait('/getUser',param)
}
```

页面使用

```
import {getUserInfo} from '../request/api.js'
  getUserInfo().then(res => {
    console.log(res)
  })
```



###### 2.6引入mock

下载

```
npm i mockjs --save
```

在main.js中引入。只在开发环境中使用

```
if (process.env.NODE_ENV !== 'production') require('./mock')
```

src目录下建立mock文件夹，下面在创建mock.js文件

```
import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock('/getUser',{
    'items|3': [{
        'name': Random.cname(),
        'age': Random.natural(22, 40),
        'date': Random.date('yyyy-MM-dd'),
        'address': Random.county(true)
      }]
})
```

###### 2.7 引入Markdown编辑器

下载

```
npm install mavon-editor --save
```

main.js

```
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
```

页面使用.自带@change事件，两个参数分别为输入值和HTML渲染后的值得格式。通过v-html在页面展示

```
 <mavon-editor v-model="form.content" @change="handle"></mavon-editor>
 <article v-html="myhtml"></article>
 ///////////////////////////////////////////////
  handle(value, render) {
      this.myhtml = render;
      console.log(value, render);
    },
```

###### 2.8 引入echarts

下载

```
 npm install echarts --save
```

main.js

```
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
```

使用

```
<div id="myChart" style="width: 600px;height: 400px;"></div>
/////////////////////////////////
 mounted(){
    this.drawChart()
  },
   drawChart(){
        let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
```



# 3.实现登录验证

思路：

1. mock模拟用户数据
2. axios请求接口，
3. router中进行needLogin的判断，true为需要登录才能进入此页面
4. vuex中，将在login.vue中获取的用户名和密码进行验证。根据id判断用户类型，从而进入不同页面
5. 验证后，拿到token和usertitle，将token存储到sessionStorage中，usertitle存储至vuex的title，在home.vue中显示
6. 前端每次跳转时，就在main.js使用导航守卫(vue-router.beforeEach)判断 sessionStorage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面。
7. home.vue的退出可注销登录，注销后，就清除sessionStorage里的token信息并跳转到登录页面

# 4.组件的封装

###### 4.1 封装头部组件headerBar.vue

###### 4.2 封装侧边栏菜单组件asideBar.vue

**menuList传递侧边栏菜单名称等数据**。**通过判断menuList中是否有haschild来决定显示几级菜单**。需使用fragment标签来包裹来解决搜索菜单时文字不隐藏问题，因为el-menu不支持除自身的el-menu-item或el-submenu以外的标签，

fragment使用。先**npm install --save vue-fragment**

然后main.js中加入

```
// main.js
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
```

```
<template>
  <div class="box">
    <el-container style="display:inline-block">
      <el-menu
        style="height:600px;background:#545c64;"
        :unique-opened='true'
        :default-active="activeItem"
        router
        @select="clickMenuItem"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
      >
        <fragment v-for="(item,index) in menuList" :key="index+'level1'">
          <!--只有一级菜单-->
          <el-menu-item v-if="item.haschild==false" :index="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <!--二级菜单-->
          <el-submenu v-if="item.haschild==true" :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <fragment v-for="(item,index) in item.children" :key="index+'level2'">
              <el-menu-item :index="item.index">
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </fragment>
          </el-submenu>
        </fragment>
      </el-menu>
    </el-container>
    <!-- 侧边栏菜单开关 -->
      <div class="closeSide" @click="isCollapse=!isCollapse">
        <i class="el-icon-d-arrow-left" v-show="isCollapse==true"></i>
        <i class="el-icon-d-arrow-right" v-show="isCollapse==false"></i>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "AsideBar",
 //接受属性menuList菜单数据
  props: {
    menuList: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    ...mapState({
      activeItem:state=>state.menu.activeItem
    })
  },
  methods: {
    //传入当前点击菜单的router
    clickMenuItem(index){
      console.log(index)
      this.$store.dispatch('clickMenuItem',{index:index})
    }
  },
};
</script>
```

侧边栏菜单数据渲染。admin.vue中。**父组件admin.vue传递menu数据给子组件asideBar**.并且dispatch**传递index给vuex的getMenu来决定渲染哪个菜单**

```
 <aside-bar :menu="menu"></aside-bar>
 ///////////////////////////////////////
import asideBar from "@/components/layout/asideBar";
import { mapState, mapActions } from 'vuex'
components: {
    asideBar
  },
computed: {
  ...mapState({
  	menu:state=>state.menu.menu
  })
},
created() {
  this.$store.dispatch('getMenu',{index:1})
},
```

store/modules/menu.js。**通过传递的index不同从而判断渲染哪个菜单**

```
  //获取菜单
  getMenu (context,{index:index}) {
    if(index===1){
       getMenu1().then(res=>{
        let menumap=res.data
        context.commit('initMenu', {menu:menumap})
      })
    }else{
      getMenu2().then(res=>{
        let menumap=res.data
        context.commit('initMenu', {menu:menumap})
      })
    }
  },
```



###### 4.3 封装tab标签页导航tabs.vue。

```
<template>
  <div>
    <el-tabs :value="activeItem" type="card" @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.index"
        :label="item.label"
        :name="item.index"
        :closable="item.closable"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { getMenu1 } from "@/request/api";
export default {
  name: "Tabs",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menu,
      tabs: state => state.menu.tabs
    }),
    activeItem: {
      get() {
        return this.$store.state.menu.activeItem;
      },
      set(val) {
        this.$store.commit("switchTab", val);
      }
    }
  },
  mounted() {
    this.$store.dispatch("getTab", {
      index: this.$route.path,
      title: this.$route.meta.title
    });
  },
  watch: {
    // 判断路由是否已经打开
    $route(to, from) {
      let flag = false;
      //已打开，切换至当前路由标签
      for (let item of this.tabs) {
        let name = "/" + to.name;
        if (item.index === name) {
          this.$store.commit("switchTab", name);
          this.$router.push({ path: name });
          flag = true;
          break;
        }
      }
      //未打开,增加tab标签并切换
      if (!flag) {
        let target = this.menu.map(a => a.children).flat().find(f => f.index === to.path);
        this.$store.commit("addTab", {
          index: to.path,
          label: target.name,
          closable: true
        });
        this.$store.commit("switchTab", to.path);
      }
    }
  },

  methods: {
    //tab切换
    tabClick(e) {
      this.$store.dispatch("clickMenuItem", { index: e.name });
      this.$router.push({ path: e.name });
    },
    //tab移除
    removeTab(e) {
      this.$store.dispatch("closeTab", { index: e });
      this.$router.push({ path: this.activeItem });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>


```

store/medules/menu.js

```
import { getMenu1, getMenu2 } from "../../request/api.js";

const state = {
  //菜单
  menu: [],
  tabs: [
    {
      label: "首页",
      index: "/index"
    }
  ],
  activeItem: "/index" // 默认选中首页
};
const mutations = {
  initMenu(state, param) {
    state.menu = param.menu;
  },
  initTabs(state, tabs) {
    state.tabs = tabs;
  },
  addTab(state, tab) {
    state.tabs.push(tab);
  },
  switchTab(state, nowIndex) {
    state.activeItem = nowIndex;
  }
};
const actions = {
  //获取菜单
  getMenu(context, { index: index }) {
    if (index === 1) {
      getMenu1().then(res => {
        let menumap = res.data;
        context.commit("initMenu", { menu: menumap });
      });
    } else {
      getMenu2().then(res => {
        let menumap = res.data;
        context.commit("initMenu", { menu: menumap });
      });
    }
  },
  //获取tab
  getTab(context, { index: index, title: title }) {
    if (index !== "/index") {
      context.state.activeItem = index;
      context.commit("switchTab", index);
      context.commit("addTab", { index: index, label: title, closable: true });
    } else {
      context.commit("switchTab", index);
    }
  },
  //点击菜单
  clickMenuItem(context, { index: index }) {
    if (index !== "/index") {
      var tab = context.state.tabs.find(f => f.index === index);
      if (!tab) {
        let menu = {};
        menu = context.state.menu.find(f => f.index === index);
        if (!menu) {
          menu = context.state.menu.map(a => a.children).flat().find(f => f.index === index);
        }
        let newTab = {
          label: menu.name,
          index: menu.index,
          closable: true
        };
        context.commit("addTab", newTab);
      }
    }
    context.commit("switchTab", index);
  },
  //关闭tab
  closeTab(context, { index: index }) {
    let indexNum = context.state.tabs.findIndex(f => f.index === index);
    let newTabs = context.state.tabs.filter(f => f.index !== index);
    context.commit("initTabs", newTabs);
    let activeItem = newTabs[indexNum - 1].index;
    if (activeItem === "/index") {
      context.commit("switchTab", "/index");
    } else {
      context.commit("switchTab", newTabs[indexNum - 1].index);
    }
  }
};
export default {
  state,
  actions,
  mutations
};


```

###### 4.4 封装表格table.vue

```
<template>
  <div>
    <el-table :data="tableData" boder :fit="true" :stripe="true" :highlight-current-row="true" border>
      <el-table-column type="index" width="80" v-if="indexNum" label="序号" header-align="center" align="center">
      </el-table-column>
       <el-table-column type="selection" width="55" v-if="checkbox"></el-table-column>
      <el-table-column v-for="item in columns" :prop="item.key" :key="item.key" :label="item.title" :width="item.showFlag.width" :show-overflow-tooltip="true" header-align="center" :align="item.showFlag.align" >
        <template slot-scope="scope">
          <el-link  v-if="item.showFlag.operate" @click="Handle(scope.row)" type="primary">{{scope.row[item.data]}}</el-link>
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
    //showFlag: {  align: "文字对齐方式", width: "列宽度",operate:"是否可点击操作"}
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
  methods: {
    Handle(row) {
      this.$emit("Handle", row);
    }
  }
};
</script>
```

页面引入。**tableData为表格数据，columns为列的对应属性，其中title为列名，data为该列对应属性名称，showFlag中align为文字对齐方式，width为列宽度，operate代表此列是否可操作**

```
    <table-com :tableData="tableData" :columns="columns":checkbox="true":indexNum="false" @Handle="handle"></table-com>
/////////////////////////
  tableData:[
        {
          name:"周涛",
          phone:"123455643322",
          gskm:"科目二",
          status:"请假",
          operate:"删除",
        }
      ],
   columns: [
        {
          title: "姓名",
          data: "name",
          showFlag: {  align: "center", width: ""}
        },
        {
          title: "手机号",
          data: "phone",
          showFlag: {  align: "center", width: "" }
        },
        {
          title: "归属科目",
          data: "gskm",
          showFlag: {  align: "center", width: "" }
        },
        {
          title: "状态",
          data: "status",
          showFlag: { align: "center", width: "" }
        },
         {
          title: "操作",
          data: "operate",
          showFlag: {  align: "center", width: "",operate: true,}
        },
      ],
```



# 5.模块化

###### 5.1vuex的使用

![1578995044333](C:\Users\foresee\AppData\Roaming\Typora\typora-user-images\1578995044333.png)

index.js统一管理。main.js只需要引入**import store from './store/index'**

```
import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import menu from "./modules/menu";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login,
    menu
  }
});
```

modules目录下的文件为各个功能所需要的状态管理

###### 5.2mock的使用

![1578995175399](C:\Users\foresee\AppData\Roaming\Typora\typora-user-images\1578995175399.png)

index.js统一管理。main.js只需引入**require('./mock/index.js')**

```
require('@/mock/login')
require('@/mock/menu')
const Mock = require("mockjs")
```

# 6.后台搭建

6.1 下载wampServer

6.2 建立数据库driver,登录表login，字段id,username,password

6.4 npm下载mysql和body-parser

6.3 根目录下创建目录server进行数据库操作，server目录下四个文件，分别为app.js入口文件，db.js链接数据库，router.js路由文件，services.js处理业务逻辑

![1579421943108](C:\Users\foresee\AppData\Roaming\Typora\typora-user-images\1579421943108.png)

app.js

```
// 创建express服务器
const express = require('express')
const app = express()
// 注册解析 表单数据的 body-parser
const bodyParser = require('body-parser')
// 将请求响应设置content-type设置为application/json
const router = require('./router.js')
app.use('/api/*', function (req, res, next) {
	// 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // next()方法表示进入下一个路由
    next();
});
// post
app.use(bodyParser.urlencoded({extended:false}))
// 处理json格式的参数
app.use(bodyParser.json())
// 配置路由
app.use(router)
// 服务器已经启动
app.listen('4000',function(){
    console.log('running...')
})

```

db.js

```
let mysql = require('mysql')
exports.base = (sql,data,callback)=>{
	let connection = mysql.createConnection({
	host     : 'localhost',
  	user     : 'root',
  	password : '',
  	database : 'mytest'
	})
	connection.connect();
	connection.query(sql,data, function (error, results, fields) {
  	if (error) throw error;
  		callback && callback(results)
	})
	connection.end();
}
```

router.js

```
const express = require('express')
const router = express.Router()
const services = require('./services.js')
// router.get('/',services.start)
// 登录功能
router.post('/api/login',services.login)

// 注册功能
router.post('/api/register',services.register)
module.exports = router

```

services.js

```
const db = require('./db.js')
exports.start = (req,res)=>{
}
// 登录注册处理
exports.login = (req,res)=>{
    let username = req.body.username
    let pwd = req.body.password
    // 查询语句
    let sql = 'select * from login where username = ?'
    db.base(sql,username,(result)=>{
        if(!result.length){
            return res.json({ status: 0, msg: '登录失败',username:username })
        }else{
            if(result[0].password==pwd){
                return res.json({ status: 1, msg: '登录成功',username:username,password:pwd })
            }
            return res.json({ status: 0, msg: '密码错误',username:username })
        }
    })
}
exports.register = (req,res)=>{
    console.log(req.body)
    res.send('测试')
}
```

6.4 启动

```
PS C:\Users\foresee\Desktop\demo>$ npm run dev
PS C:\Users\foresee\Desktop\demo\server> node app
```

7.Vue导出数据到Excel电子表格

https://blog.csdn.net/a772116804/article/details/104835378