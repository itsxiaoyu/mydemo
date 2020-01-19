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
  // namespaced: true,
  state,
  actions,
  mutations
};
