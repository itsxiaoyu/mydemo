const db = require('./db.js')
exports.start = (req,res)=>{
}
// 登录注册处理
exports.login = (req,res)=>{
    let username = req.body.username
    let pwd = req.body.password
    // 查询语句
    let sql = 'select * from login where username = ?'
    db.base(sql,username,(result)=>{
        if(!result.length){
            return res.json({ status: 0, msg: '登录失败',username:username })
        }else{
            if(result[0].password==pwd){
                return res.json({ status: 1, msg: '登录成功',username:username,password:pwd })
            }
            return res.json({ status: 0, msg: '密码错误',username:username })
        }
    })
}
exports.register = (req,res)=>{
    console.log(req.body)
    res.send('测试')
}

