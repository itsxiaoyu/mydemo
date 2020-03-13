import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import menu from "./modules/menu";
import release from "./modules/release";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login,
    menu,
    release
  }
});
