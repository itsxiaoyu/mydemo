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
//注册
exports.register = (req,res)=>{
    console.log(req.body)
    res.send('测试')
}
//教练列表
exports.teacher = (req,res)=>{
    let sql="select * from teacher where 1=1";
    let arr = [];
    let name=req.body.name
    let phone=req.body.phone
    let gskm=req.body.gskm
    if(name!==""){
        name = "%"+name+"%";
        sql += " and tname like ?";
        arr.push(name);
    }
    if(phone!=""){
        phone = "%"+phone+"%";
        sql += " and tphone like ?";
        arr.push(phone);
    }
    if(gskm!=""){
        gskm = "%"+gskm+"%";
        sql += " and tgskm like ?";
        arr.push(gskm);
    }
    db.base(sql,arr,(result)=>{
        return res.json({ status: 1, msg: 'this is教练信息',result})
    })
}
exports.addteacher = (req,res)=>{
    let name=req.body.name
    let phone=req.body.phone
    let sfz=req.body.sfz
    let gskm=req.body.gskm
    let status=req.body.status
    let sql = 'insert into teacher(tname,tphone,tsfz,tgskm,tstatus) values(?,?,?,?,?)'
    db.base(sql,[name,phone,sfz,gskm,status],(result)=>{
        return res.json({ status: 1, msg: '添加',name:name})
    })
}
//更新
exports.updateteacher = (req,res)=>{
    let id=req.body.id
    let name=req.body.name
    let phone=req.body.phone
    let sfz=req.body.sfz
    let gskm=req.body.gskm
    let status=req.body.status
    let sql = 'update teacher set tname=?,tphone=?,tsfz=?,tgskm=?,tstatus=? where tid=?'
    db.base(sql,[name,phone,sfz,gskm,status,id],(result)=>{
        return res.json({ status: 1, msg: '更新',name:name})
    })
}
//查询所有学生或者此教练的所有学生
exports.myStudent = (req,res)=>{
    let id=req.body.id
    let arr=[]
    let sql = 'select * from student  where 1=1'
    if(id!==""){
        id = "%"+id+"%";
        sql += " and tid like ?";
        arr.push(id);
    }
    db.base(sql,arr,(result)=>{
        return res.json({ status: 1, msg: 'chaxun ',result})
    })
}
//查询当前教练同一时间的所有约车学生
exports.myCourse = (req,res)=>{
    //传入教练id,时间
    let id=req.body.id
    let time=req.body.time
    //查找1号教练的同一时间有几个预约学生
    let sql="select * from student where sid in(select sid from sc where tid=? and time=?)"
    db.base(sql,[id,time],(result)=>{
        return res.json({ status: 1, msg: '查询同一教练同一时间的所有学生 ',result})
    })
}
