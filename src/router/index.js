import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    //needLogin判断是否需要登录才可以进入
    { path: '/', component:()=>import('@/pages/login')},
    { path: '/login', component:()=>import('@/pages/login')},
    { 
      path: '/user',
      component:()=>import('@/pages/user/user'),
      meta:{needLogin:true},
      children:[
         {
          path:'/user/index',
          name:'user/index',
          component:()=>import('@/pages/user/index'),
          meta:{needLogin:true,title:'首页'},
        },
        {
          path:'/user/appointment',
          name:'user/appointment',
          component:()=>import('@/pages/user/appointment'),
          meta:{needLogin:true,title:'我的预约'},
        },
        {
          path:'/user/postComment',
          name:'user/postComment',
          component:()=>import('@/pages/user/postComment'),
          meta:{needLogin:true,title:'评论列表'},
        },
        {
          path:'/user/studentView',
          name:'user/studentView',
          component:()=>import('@/pages/user/studentView'),
          meta:{needLogin:true,title:'公告详情'},
        },
      ]
    },
    { 
      path: '/admin',
      component:()=>import('@/pages/admin/admin'),
      meta:{needLogin:true},
      children:[
        {
          path:'/admin/index',
          name:'admin/index',
          component:()=>import('@/pages/admin/index'),
          meta:{needLogin:true,title:'首页'},
        },
        {
          path:'/admin/teacherList',
          name:'admin/teacherList',
          component:()=>import('@/pages/admin/teacherList'),
          meta:{needLogin:true,title:'教练列表'},
        },
        {
          path:'/admin/studentList',
          name:'admin/studentList',
          component:()=>import('@/pages/admin/studentList'),
          meta:{needLogin:true,title:'学员列表'},
        },
        {
          path:'/admin/comment',
          name:'admin/comment',
          component:()=>import('@/pages/admin/comment'),
          meta:{needLogin:true,title:'评论汇总'},
        },
        {
          path:'/admin/release',
          name:'admin/release',
          component:()=>import('@/pages/admin/release'),
          meta:{needLogin:true,title:'发布公告'},
        },
        {
          path:'/admin/addRelease',
          name:'admin/addRelease',
          component:()=>import('@/pages/admin/addRelease'),
          meta:{needLogin:true,title:'新增公告'},
        },
        {
          path:'/admin/viewRelease',
          name:'admin/viewRelease',
          component:()=>import('@/pages/admin/viewRelease'),
          meta:{needLogin:true,title:'公告详情'},
        },
      ]
    },
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}