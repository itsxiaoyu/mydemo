
import { getaddteacher,getMyStudent} from "@/request/api.js";
import router from "../../router/index";


const state = {
//  teacherList:null,
//  studentList:null
};
const mutations = {
  // setTeacher(state,params){
  //   state.teacherList=params.res
  // },
  // setStudent(state,params){
  //   state.studentList=params
  // }
};
const actions = {
  getaddteacher(context,{ 
    name:name,
    gskm:gskm}) {
        getaddteacher({
        name:name,
        gskm:gskm
    }).then(res => {
        console.log(res)
    }); 
  },
  // getMyStudent(context,{ 
  //   id:id}) {
  //     getMyStudent({
  //       id:id
  //   }).then(res => {
  //       console.log(res.result)
  //       context.commit('setStudent',res.result)
  //   }); 
  // },
};
export default {
    // namespaced: true,
    state,
    actions,
    mutations
  }