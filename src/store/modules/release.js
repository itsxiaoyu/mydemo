const state = {
  content:null,  //发布内容
};
const mutations = {
  setContent(state,param){
    state.content=param
  },
};
const actions = {
 
};
export default {
    // namespaced: true,
    state,
    actions,
    mutations
  }