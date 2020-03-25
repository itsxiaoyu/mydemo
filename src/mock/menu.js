import Mock from "mockjs";
Mock.mock('/getMenu1','get',{
  data: [
    {
      name: "首页",
      haschild: false,
      index: "/admin/index",
      children: [],
      icon: "el-icon-s-home"
    },
    {
      name: "车辆管理",
      haschild: false,
      index: "/admin/car",
      children: [],
      icon: "el-icon-truck"
    },
    {
      name: "评论汇总",
      haschild: false,
      index: "/admin/comment",
      children: [],
      icon: "el-icon-s-comment"
    },
    {
      name: "消息中心",
      haschild: false,
      index: "/admin/message",
      children: [],
      icon: "el-icon-message"
    },
    {
      name: "人员信息",
      haschild: true,
      icon: "el-icon-s-custom",
      children: [
        { name: "教练列表", haschild: false, index: "/admin/teacherList" },
        { name: "学员列表", haschild: false, index: "/admin/studentList" }
      ]
    },
    {
      name: "发布公告",
      haschild: true,
      index: "/admin/release",
      icon: "el-icon-s-promotion",
      children: [
        { name: "历史公告", haschild: false, index: "/admin/release" },
        { name: "新增公告", haschild: false, index: "/admin/addRelease" },
        // { name: "公告详情", haschild: false, index: "/admin/viewRelease" },
        
      ],
    },
  ]
});
Mock.mock(
  "/getMenu2",
  'get',
  {"data":[
    {
      name: "首页",
      haschild: false,
      index: "/user/index",
      children: [],
      icon: "el-icon-s-home"
    },
    {
      name: "我的预约",
      haschild: false,
      index: "/user/appointment",
      children: [],
      icon: "el-icon-phone-outline",
    },
    {
    name: "评论列表",
    haschild: false,
    index: "/user/postComment",
    children: [],
    icon: "el-icon-goods",
    },
    {
      name: "我的建议",
      haschild: false,
      index: "/user/suggest",
      children: [],
      icon: "el-icon-message",
      },
  ]}
);