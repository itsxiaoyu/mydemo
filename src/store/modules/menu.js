import { getMenu1, getMenu2 } from "../../request/api.js";


const state = {
  //菜单
  menu: [],
  tabs: [],
  activeItem: "" ,// 默认选中首页
  isCollapse:true,//侧边栏展示
};
const mutations = {
  initMenu(state, param) {
    state.menu = param.menu;
  },
  initTabs(state, tabs) {
    state.tabs = tabs;
  },
  addTab(state, tab) {
    state.tabs.push(tab);
  },
  switchTab(state, nowIndex) {
    state.activeItem = nowIndex;
  },
  isCollapse(state,value){
    state.isCollapse=value
  }
};

const actions = {
  //获取菜单
  getMenu(context, { index: index ,path:path}) {
    context.state.tabs=[]
    if (index === 1) {
      getMenu1().then(res => {
        let menumap = res.data;
        if(path==='/admin/index'){
          context.commit("switchTab",path)
        }
        context.state.tabs.unshift({label:'首页',index:'/admin/index',closable:false})
        context.commit("initMenu", { menu: menumap });
      });
    } else {
      getMenu2().then(res => {
        let menumap = res.data;
        if(path==='/user/index'){
          context.commit("switchTab",path)
        }
        context.state.tabs.unshift({label:'首页',index:'/user/index',closable:false})
        context.commit("initMenu", { menu: menumap });
      });
    }
  },
  //获取tab
  getTab(context, { index: index, title: title }) {
    if (index !== "/admin/index" && index!=="/user/index") {
      context.state.activeItem = index;
      context.commit("switchTab", index);
      context.commit("addTab", { index: index, label: title, closable: true });
    } else {
      context.commit("switchTab", index);
    }
  },
  //点击菜单
  clickMenuItem(context, { index: index }) {
    if (index !== "/admin/index"&&index!=="/user/index") {
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
    if (activeItem === "/admin/index") {
      context.commit("switchTab", activeItem);
    } else {
      if(activeItem==="/user/index"){
      context.commit("switchTab", activeItem);
      }else{
        context.commit("switchTab", newTabs[indexNum - 1].index);
      }
    }
  }
};
export default {
  // namespaced: true,
  state,
  actions,
  mutations
};