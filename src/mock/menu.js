import Mock from "mockjs";
Mock.mock('/getMenu1','get',{
  data: [
    {
      name: "首页",
      haschild: false,
      index: "/index",
      children: [],
      icon: "el-icon-s-home"
    },
    {
      name: "教练",
      haschild: true,
      icon: "el-icon-s-custom",
      children: [
        { name: "教练列表", haschild: false, index: "/menu3" },
        { name: "请假记录", haschild: false, index: "/menu4" }
      ]
    },
  ]
});
Mock.mock(
  "/getMenu2",
  {"data":[
    {
      name: "首页",
      haschild: false,
      index: "/index",
      children: [],
      icon: "el-icon-s-home"
    },
     {
    name: "菜单1",
    haschild: true,
    icon: "el-icon-s-fold",
    children: [
      { name: "子菜单1-1", haschild: false, index: "/menu1" },
      { name: "子菜单1-2", haschild: false, index: "/menu2" }
    ]
  },
  ]}
);

