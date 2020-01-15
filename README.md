# mydemo

> 使用vue cli创建新的项目
>
> 1.支持 router。
>
> 2.支持vuex，store的模块化
>
> 3.添加element作为项目的UI
>
> 4.添加axios作为请求工具，封装axios
>
> 5.添加mockjs使项目支持mock。mock模块化
>
> 6.实现登录验证。进行路由守卫。分角色登录
>
> 7.渲染菜单组件，根据传值不同渲染不同菜单
>
> 8.tab导航监听路由

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
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: "Tabs",
  data() {
    return {};
  },
    computed: {
    ...mapState({
      tabs: state=>state.menu.tabs,
      activeItem: state=>state.menu.activeItem
    })
  },
  methods: {
    //tab切换。传递router
    tabClick (e) {
      this.$store.dispatch('clickMenuItem',{index:e.name})
      this.$router.push({ path: e.name })
    },
    //tab移除
    removeTab (e) {
      this.$router.push({ path: this.activeItem })
      this.$store.dispatch('closeTab',{index:e})
    }
  }
};
</script>

```

store/medules/menu.js

```
import { getMenu1 } from "../../request/api.js";
const state = {
  menu: [],
  tabs: [
    {
      label: '首页',
      index: 'index'
    }
  ],
  activeItem: 'index' // 默认选中首页
};
const mutations = {
  initMenu (state, param) {
    state.menu = param.menu
  },
  initTabs (state, tabs) {
    state.tabs = tabs
  },
//添加tab
  addTab (state, tab) {
    state.tabs.push(tab)
  },
  //切换tab
  switchTab (state, nowIndex) {
    state.activeItem = nowIndex
  }
};
const actions = {
  //获得菜单数据
  getMenu (context) {
    getMenu1().then(res=>{
      let menumap=res.data
      context.commit('initMenu', {menu:menumap})
    })
  },
  //点击菜单，接受index路由
  clickMenuItem (context, {index:index}) {
    if (index !== 'index') {
      var tab = context.state.tabs.find(f => f.index === index)
      if (!tab) {
        let menu = {}
        menu = context.state.menu.find(f => f.index === index)
        if (!menu) {
          menu = context.state.menu.map(a => a.children).flat().find(f => f.index === index)
        }
        let newTab = {
          label: menu.name,
          index: menu.index,
          closable: true
        }
        context.commit('addTab', newTab)
      }
    }
    context.commit('switchTab', index)
  },
  //关闭tab
  closeTab (context, {index:index}) {
    let indexNum = context.state.tabs.findIndex(f => f.index === index)
    let activeItem = context.state.activeItem
    let newTabs = context.state.tabs.filter(f => f.index !== index)
    context.commit('initTabs', newTabs)
    if (activeItem === index) {
      context.commit('switchTab', indexNum === 0 ? 'index' : newTabs[indexNum - 1].index)
    }
  }
};
export default {
    // namespaced: true,
    state,
    actions,
    mutations
  }

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

