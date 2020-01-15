// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
import axios from 'axios';
Vue.prototype.$axios = axios;
import store from './store/index'//引入store
//解决菜单收缩文字不隐藏
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'production') require('./mock/index.js')

router.beforeEach((to,from,next)=>{
  if(to.meta.needLogin){
    //当页面需要登录的时候判断浏览器是否有sessionStorage
    if(window.sessionStorage.data){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#App',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
