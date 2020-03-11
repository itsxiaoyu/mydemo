import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import menu from "./modules/menu";
import teacher from "./modules/teacher";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login,
    menu,
    teacher
  }
});
