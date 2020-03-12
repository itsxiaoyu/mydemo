const db = require('./db.js')
exports.start = (req, res) => {
}
// 登录注册处理
exports.login = (req, res) => {
    let username = req.body.username
    let pwd = req.body.password
    // 查询语句
    let sql = 'select * from login where username = ?'
    db.base(sql, username, (result) => {
        if (!result.length) {
            return res.json({ status: 0, msg: '登录失败', username: username })
        } else {
            if (result[0].password == pwd) {
                return res.json({ status: 1, msg: '登录成功', username: username, password: pwd })
            }
            return res.json({ status: 0, msg: '密码错误', username: username })
        }
    })
}
exports.register = (req, res) => {
    console.log(req.body)
    res.send('测试')
}

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

//插入教练信息
exports.addTeacher = (req, res) => {
    let name = req.body.name
    let phone = req.body.phone
    let gskm = req.body.gskm
    let status = req.body.status
    let sfz = req.body.sfz
    let querysql = "select * from teacher where tname=?";
    let sql = 'insert into teacher(tname,tphone,tgskm,tstatus,tsfz) values(?,?,?,?,?)'
    db.base(querysql, name, (result) => {
        if (result.length > 0) {
            return res.json({ status: 0, msg: '该用户已注册' })
        } else {
            // gskm==="2"?gskm="科目二":gskm="科目三"
            // status==="1"?status="正常":status="请假"
            db.base(sql, [name, phone, gskm, status, sfz], (result) => {
                return res.json({ status: 1, msg: '添加成功', result })
            })
        }
    })
}
//删除教练
exports.deleteTeacher = (req, res) => {
    let id = req.body.id
    let sql = 'delete from teacher where tid=?'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '删除成功呢' })
    })
}
//更新
exports.updateTeacher = (req,res)=>{
    let id=req.body.id
    let name=req.body.name
    let phone=req.body.phone
    let sfz=req.body.sfz
    let gskm=req.body.gskm
    let status=req.body.status
    let qjsj=req.body.qjsj
    let qjyy=req.body.qjyy
    let sql = 'update teacher set tname=?,tphone=?,tsfz=?,tgskm=?,tstatus=?,tqjsj=?,tqjyy=? where tid=?'
    db.base(sql,[name,phone,sfz,gskm,status,qjsj,qjyy,id],(result)=>{
        return res.json({ status: 1, msg: '更新',result})
    })
}
//查询学生列表或者该教练的所有学生
exports.myStudent=(req,res)=>{
    let id=req.body.id
    let arr=[]
    let sql='select * from student where 1=1'
    if(id!==''){
        id="%"+id+"%"
        sql+=" and tid like ?"
        arr.push(id)
    }
    db.base(sql,arr,(result)=>{
        return res.json({ status: 1, msg: '学生列表',result})
    })
}
//查询当前教练同一时间的所有约车学生
exports.myCourse=(req,res)=>{
    //传入教练id,时间
    let id=req.body.id
    let time=req.body.time
    //查找1号教练的同一时间有几个预约学生
   let sql='SELECT * FROM student WHERE sid IN(SELECT sid FROM sc WHERE tid=? AND time=?)'
    db.base(sql,[id,time],(result)=>{
        return res.json({ status: 1, msg: '查询同一教练同一时间的所有学生 ',result})
    })
}
//获取学生信息
exports.student = (req,res)=>{
    let sql="select * from student where 1=1";
    let arr = [];
    let phone=req.body.phone
    if(phone!=""){
        phone = "%"+phone+"%";
        sql += " and sphone like ?";
        arr.push(phone);
    }
    db.base(sql,arr,(result)=>{
        return res.json({ status: 1, msg: 'this is学生信息',result})
    })
}
//删除学生信息
exports.deleteStudent = (req, res) => {
    let id = req.body.id
    let sql = 'DELETE FROM student WHERE sid=?'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '删除成功呢' })
    })
}
//插入学生信息
exports.addStudent = (req, res) => {
    let name = req.body.name
    let phone = req.body.phone
    let tid = req.body.tid
    let bmsj = req.body.bmsj
    let tc = req.body.tc
    let xf = req.body.xf
    let jd = req.body.jd
    let sfz = req.body.sfz
    let querysql = "SELECT * FROM student WHERE sname=?";
    let sql = 'INSERT INTO student(sname,sphone,tid,sbmsj,stc,sxf,sjd,sfz) VALUES(?,?,?,?,?,?,?,?)'
    db.base(querysql, name, (result) => {
        if (result.length > 0) {
            return res.json({ status: 0, msg: '该用户已注册' })
        } else {
            db.base(sql, [name, phone, tid, bmsj, tc,xf,jd,sfz], (result) => {
                return res.json({ status: 1, msg: '添加成功', result })
            })
        }
    })
}
//更新此学生信息
exports.updateStudent = (req,res)=>{
    let id=req.body.id
    let name=req.body.name
    let phone=req.body.phone
    let bmsj=req.body.bmsj
    let tc=req.body.tc
    let xf=req.body.xf
    let jd=req.body.jd
    let sfz=req.body.sfz
    let sql = 'UPDATE student SET sname=?,sphone=?,sbmsj=?,stc=?,sxf=?,sjd=?,sfz=? WHERE sid=?'
    db.base(sql,[name,phone,bmsj,tc,xf,jd,sfz,id],(result)=>{
        return res.json({ status: 1, msg: '更新',result})
    })
}
//查找此学生的预约记录
exports.myAppointment=(req,res)=>{
    let id=req.body.id
   let sql='SELECT sc.time,teacher.tname,teacher.tphone FROM sc,teacher WHERE sc.sid=? AND teacher.tid=sc.tid'
   db.base(sql,id,(result)=>{
        return res.json({ status: 1, msg: '查询学生 ',result})
    })
}
//查找全部评价内容
exports.comment = (req,res)=>{
    let name=req.body.name
    let sql="SELECT student.sname,teacher.tname,comment.pjxj,comment.pjnr,comment.pjsj FROM student,teacher,comment WHERE comment.sid=student.sid AND comment.tid=teacher.tid";
    let arr = [];
    if(name!=""){
        sql += " AND comment.tid IN(SELECT tid FROM teacher WHERE tname=?)";
        arr.push(name);
    }
    console.log(arr,sql)
    db.base(sql,arr,(result)=>{
        return res.json({ status: 1, msg: 'this is评论信息',result})
    })
}