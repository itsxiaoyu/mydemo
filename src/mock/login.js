import Mock from "mockjs";
//登录数据
Mock.mock("/getLogin",'get', {
  error_code: 0,
  data: [
    {
      id: "1",
      usertitle: "管理员",
      username: "admin",
      password: "123456",
      token: "123133123"
    },
    {
      id: "2",
      usertitle: "用户",
      username: "root",
      password: "root",
      token: "65454634"
    }
  ]
});
