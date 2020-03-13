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
      name: "人员信息",
      haschild: true,
      icon: "el-icon-s-custom",
      children: [
        { name: "教练列表", haschild: false, index: "/admin/teacherList" },
        { name: "学员列表", haschild: false, index: "/admin/studentList" }
      ]
    },
    {
      name: "评论汇总",
      haschild: false,
      index: "/admin/comment",
      children: [],
      icon: "el-icon-s-comment"
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
  {"data":[
    {
      name: "首页",
      haschild: false,
      index: "/user/index",
      children: [],
      icon: "el-icon-s-home"
    },
     {
    name: "菜单1",
    haschild: true,
    icon: "el-icon-s-fold",
    children: [
      { name: "子菜单1-1", haschild: false, index: "/user/menu1" },
      { name: "子菜单1-2", haschild: false, index: "/user/menu2" }
    ]
  },
  ]}
);