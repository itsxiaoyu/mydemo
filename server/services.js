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
                return res.json({ status: 1, msg: '登录成功', result: result[0] })
            }
            return res.json({ status: 0, msg: '密码错误', username: username })
        }
    })
}
//更新登录信息
exports.updateLogin = (req, res) => {
    let id = req.body.id
    let name = req.body.username
    let password = req.body.password
    let sql = 'update login set username=?,password=? where id=?'
    db.base(sql, [name, password, id], (result) => {
        return res.json({ status: 1, msg: '更新', result })
    })
}
//注册
exports.register = (req, res) => {
    let name = req.body.name
    let password = req.body.password
    let sname = req.body.sname
    let sfz = req.body.sfz
    let sphone = req.body.sphone
    let role = 1
    let querysql = 'SELECT * FROM login WHERE username=?'
    let insertsql = 'INSERT INTO login(username,password,role) VALUES(?,?,?)'
    let querysql2 = 'SELECT id FROM login WHERE username=?'
    let insertsql2 = 'INSERT INTO student(sname,sfz,sphone,id) VALUES(?,?,?,?)'
    db.base(querysql, name, (result) => {
        if (result.length > 0) {
            return res.json({ status: 0, msg: '注册失败。该账号已注册', result })
        } else {
            db.base(insertsql, [name, password, role], (result) => {
                if (result) {
                    db.base(querysql2, name, (result) => {
                        let id = result[0].id
                        db.base(insertsql2, [sname, sfz, sphone, id], (result) => {
                            return res.json({ status: 1, msg: '注册success', result })
                        })
                    })
                }
            })
        }
    })
}
//首页待办事项列表
exports.todo = (req, res) => {
    let id = req.body.id
    let sql = "select * from todo where id=?";
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: 'this is todolist', result })
    })
}
//插入代办事件
exports.addTodo = (req, res) => {
    let id = req.body.id
    let todolist = req.body.todolist
    let sql = 'insert into todo(id,todolist) values(?,?)'
    db.base(sql, [id, todolist], (result) => {
        return res.json({ status: 1, msg: '添加成功todolist' })
    })
}
//删除待办事件
exports.deleteTodo = (req, res) => {
    let id = req.body.id
    let sql = 'delete from todo where oid=?'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '删除成功呢' })
    })
}

///////////////////////////////////教练///////////////////////////////////////////////
exports.teacher = (req, res) => {
    let sql = "select * from teacher where 1=1";
    let arr = [];
    let name = req.body.name
    let phone = req.body.phone
    let gskm = req.body.gskm
    if (name !== "") {
        name = "%" + name + "%";
        sql += " and tname like ?";
        arr.push(name);
    }
    if (phone != "") {
        phone = "%" + phone + "%";
        sql += " and tphone like ?";
        arr.push(phone);
    }
    if (gskm != "") {
        gskm = "%" + gskm + "%";
        sql += " and tgskm like ?";
        arr.push(gskm);
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: 'this is教练信息', result })
    })
}

//插入教练信息
exports.addTeacher = (req, res) => {
    let name = req.body.name
    let phone = req.body.phone
    let gskm = req.body.gskm
    let status = req.body.status
    let sfz = req.body.sfz
    let tage = req.body.tage
    let querysql = "select * from teacher where tname=?";
    let sql = 'insert into teacher(tname,tphone,tgskm,tstatus,tsfz,tage) values(?,?,?,?,?,?)'
    db.base(querysql, name, (result) => {
        if (result.length > 0) {
            return res.json({ status: 0, msg: '该用户已注册' })
        } else {
            db.base(sql, [name, phone, gskm, status, sfz,tage], (result) => {
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
exports.updateTeacher = (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let phone = req.body.phone
    let sfz = req.body.sfz
    let gskm = req.body.gskm
    let status = req.body.status
    let qjsj = req.body.qjsj
    let qjyy = req.body.qjyy
    let tage = req.body.tage
    let sql = 'update teacher set tname=?,tphone=?,tsfz=?,tgskm=?,tstatus=?,tqjsj=?,tqjyy=?,tage=? where tid=?'
    db.base(sql, [name, phone, sfz, gskm, status, qjsj, qjyy,tage, id], (result) => {
        return res.json({ status: 1, msg: '更新', result })
    })
}
//查询学生列表或者该教练的所有学生
exports.myStudent = (req, res) => {
    let id = req.body.id
    let arr = []
    let sql = 'SELECT * FROM student WHERE 1=1'
    if (id !== '') {
        id = id
        sql += " AND student.sid IN(SELECT sc.sid FROM sc WHERE sc.tid=?)"
        arr.push(id)
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: '学生列表', result })
    })
}
//查询当前教练同一时间的所有约车学生
exports.myCourse = (req, res) => {
    //传入教练id,时间
    let id = req.body.id
    let time = req.body.time
    //查找1号教练的同一时间有几个预约学生
    let sql = 'SELECT * FROM student WHERE sid IN(SELECT sid FROM sc WHERE tid=? AND time=?)'
    db.base(sql, [id, time], (result) => {
        return res.json({ status: 1, msg: '查询同一教练同一时间的所有学生 ', result })
    })
}
/////////////////////////////////学员/////////////////////////////////////////
//获取学生信息
exports.student = (req, res) => {
    // let sql="select * from student where 1=1";
    // let arr = [];
    // let phone=req.body.phone
    // if(phone!=""){
    //     phone = "%"+phone+"%";
    //     sql += " and sphone like ?";
    //     arr.push(phone);
    // }
    // db.base(sql,arr,(result)=>{
    //     return res.json({ status: 1, msg: 'this is学生信息',result})
    // })
    let sql = "select * from login,student where student.id=login.id";
    let arr = [];
    let phone = req.body.phone
    if (phone != "") {
        phone = "%" + phone + "%";
        sql += " and student.sphone like ?";
        arr.push(phone);
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: 'this is学生信息', result })
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
    let username = req.body.username
    let password = req.body.password
    let sname = req.body.name
    let sphone = req.body.phone
    let sbmsj = req.body.bmsj
    let stc = req.body.tc
    let sxf = req.body.xf
    // let jd = req.body.jd
    let sfz = req.body.sfz
    let role = 1
    // let querysql = "SELECT * FROM student WHERE sname=?";
    // let sql = 'INSERT INTO student(sname,sphone,sbmsj,stc,sxf,sjd,sfz) VALUES(?,?,?,?,?,?,?)'
    // db.base(querysql, name, (result) => {
    //     if (result.length > 0) {
    //         return res.json({ status: 0, msg: '该用户已注册' })
    //     } else {
    //         db.base(sql, [name, phone, bmsj, tc,xf,jd,sfz], (result) => {
    //             return res.json({ status: 1, msg: '添加成功', result })
    //         })
    //     }
    // })
    let querysql = 'SELECT * FROM login WHERE username=?'
    let insertsql = 'INSERT INTO login(username,password,role) VALUES(?,?,?)'
    let querysql2 = 'SELECT id FROM login WHERE username=?'
    let insertsql2 = 'INSERT INTO student(sname,sphone,sbmsj,stc,sxf,sfz,id) VALUES(?,?,?,?,?,?,?)'
    db.base(querysql, username, (result) => {
        if (result.length > 0) {
            return res.json({ status: 0, msg: '添加失败。该账号已注册', result })
        } else {
            db.base(insertsql, [username, password, role], (result) => {
                if (result) {
                    db.base(querysql2, username, (result) => {
                        let id = result[0].id
                        db.base(insertsql2, [sname, sphone, sbmsj, stc, sxf, sfz, id], (result) => {
                            return res.json({ status: 1, msg: '添加success', result })
                        })
                    })
                }
            })
        }
    })
}
//更新此学生信息
exports.updateStudent = (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let phone = req.body.phone
    let bmsj = req.body.bmsj
    let tc = req.body.tc
    let xf = req.body.xf
    let jd = req.body.jd
    let sfz = req.body.sfz
    let sql = 'UPDATE student SET sname=?,sphone=?,sbmsj=?,stc=?,sxf=?,sjd=?,sfz=? WHERE sid=?'
    db.base(sql, [name, phone, bmsj, tc, xf, jd, sfz, id], (result) => {
        return res.json({ status: 1, msg: '更新', result })
    })
}
//查找此学生的预约记录
exports.myAppointment = (req, res) => {
    let id = req.body.id
    let sql = 'SELECT sc.time,teacher.tname,teacher.tphone,teacher.tgskm FROM sc,teacher WHERE sc.sid=? AND teacher.tid=sc.tid'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '查询学生 ', result })
    })
}
//查找未交费学生
exports.notPaying = (req, res) => {
    let id = '未交'
    let sql = 'SELECT * FROM student WHERE sxf=?'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '查询未交费 ', result })
    })
}

//////////////////////////评价///////////////////////////////////////
//查找全部评价内容
exports.comment = (req, res) => {
    let name = req.body.name
    let sql = "SELECT teacher.tname,comment.mname,comment.pjxj,comment.pjnr,comment.pjsj FROM teacher,comment WHERE  comment.tid=teacher.tid";
    let arr = [];
    if (name != "") {
        sql += " AND comment.tid IN(SELECT tid FROM teacher WHERE tname=?)";
        arr.push(name);
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: 'this is评论信息', result })
    })
}
//插入
exports.addComment = (req, res) => {
    let name = req.body.name
    let tname = req.body.tname
    let pjxj = req.body.pjxj
    let pjnr = req.body.pjnr
    let pjsj = req.body.pjsj
    let querySql = 'SELECT teacher.tid from teacher WHERE teacher.tname=?'
    let sql = 'INSERT INTO `comment`(mname,tid,pjxj,pjnr,pjsj) values(?,?,?,?,?)'
    db.base(querySql, [tname], (result) => {
        let tid = result[0].tid
        db.base(sql, [name, tid, pjxj, pjnr, pjsj], (result) => {
            return res.json({ status: 1, msg: '添加评论成功', result })
        })
    })

}
///////////////////////////////发布/////////////////////////////////////////
//查找所有发布内容
exports.release = (req, res) => {
    let rpeople = req.body.rpeople
    let arr = []
    let sql = 'SELECT * FROM `release` WHERE 1=1'
    if (rpeople != "") {
        rpeople = rpeople;
        sql += " and rpeople=?";
        arr.push(rpeople);
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: '所有公告 ', result })
    })
}
exports.deleteRelease = (req, res) => {
    let id = req.body.id
    let sql = 'DELETE FROM `release` WHERE rid=?'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '删除成功呢' })
    })
}
//插入
exports.addRelease = (req, res) => {
    let title = req.body.title
    let content = req.body.content
    // let people = req.body.people
    let time = req.body.time
    let sql = 'INSERT INTO `release`(rtitle,rcontent,rtime) values(?,?,?)'
    db.base(sql, [title, content, time], (result) => {
        return res.json({ status: 1, msg: '添加内容成功', result })
    })
}
//////////////////////////////user登录///////////////////////////////////
//查找登录学生信息
exports.loginStudent = (req, res) => {
    let id = req.body.id
    let sql = 'SELECT * FROM login,student WHERE login.id=? AND student.id=login.id'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '查询登录信息 ', result })
    })
}
//预约教练，一个教练同一天只能有三个学员
exports.appointTeacher = (req, res) => {
    let time = req.body.time
    let tid = req.body.tid
    let sid = req.body.sid
    let qyerySql = 'SELECT * FROM sc WHERE tid=? and time=?'
    let sql = 'INSERT INTO SC(time,sid,tid) VALUES(?,?,?)'
    db.base(qyerySql, [tid, time], (result) => {
        if (result.length > 2) {
            return res.json({ status: 0, msg: '插入失败，教练行程已满 ', result })
        } else {
            db.base(sql, [time, sid, tid], (result) => {
                return res.json({ status: 1, msg: '插入成功 ', result })
            })
        }
    })
}
//更新user
exports.updateUser = (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let phone = req.body.phone
    let sfz = req.body.sfz
    let sql = 'UPDATE student SET sname=?,sphone=?,sfz=? WHERE sid=?'
    db.base(sql, [name, phone, sfz, id], (result) => {
        return res.json({ status: 1, msg: '更新', result })
    })
}
//////////////////////车辆///////////////////////////
//车辆列表
exports.car = (req, res) => {
    let carnum = req.body.carnum
    let arr = []
    let sql = 'SELECT * FROM car,teacher WHERE car.tid=teacher.tid'
    if (carnum != "") {
        carnum = carnum;
        sql += " and carnum=?";
        arr.push(carnum);
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: '所有车辆 ', result })
    })
}
//无车教练名单
exports.notCarTeacher = (req, res) => {
    let sql = 'select * from  teacher where (select count(1) as tid from car where teacher.tid = car.tid) = 0'
    db.base(sql, null, (result) => {
        return res.json({ status: 1, msg: '无车教练名单 ', result })
    })
}
//插入
exports.addCar = (req, res) => {
    let carnum = req.body.carnum
    let type = req.body.type
    let cartime = req.body.cartime
    let tname = req.body.tname
    let queryNum = 'SELECT carnum FROM car WHERE carnum=?'
    let querySql = 'SELECT tid FROM teacher WHERE tname=?'
    let sql = 'INSERT INTO `car`(carnum, type, cartime, tid) values(?,?,?,?)'
    db.base(queryNum, carnum, (result) => {
        if (result.length > 0) {
            return res.json({ status: 0, msg: '此车牌已添加' })
        } else {
            db.base(querySql, tname, (result) => {
                let id = result[0].tid
                console.log(id)
                db.base(sql, [carnum, type, cartime, id], (result) => {
                    return res.json({ status: 1, msg: '添加car', result })
                })
            })
        }
    })
}
//删除车辆
//删除学生信息
exports.deleteCar = (req, res) => {
    let id = req.body.id
    let sql = 'DELETE FROM car WHERE carid=?'
    db.base(sql, id, (result) => {
        return res.json({ status: 1, msg: '删除成功car' })
    })
}
///////////////////消息中心///////////////////////////
//消息列表
exports.message = (req, res) => {
    let estatus = req.body.estatus
    let arr = []
    let sql = 'SELECT * FROM message,student WHERE message.sid=student.sid'
    if (estatus != "") {
        estatus = estatus;
        sql += " and estatus=?";
        arr.push(estatus);
    }
    db.base(sql, arr, (result) => {
        return res.json({ status: 1, msg: '所有消息 ', result })
    })
}
//更新
exports.updateMessage = (req, res) => {
    let estatus = req.body.estatus
    let eid = req.body.eid
    let sql = 'UPDATE message SET estatus=? WHERE eid=?'
    db.base(sql, [estatus,eid], (result) => {
        return res.json({ status: 1, msg: '更新message', result })
    })
}
//插入
exports.insertMessage = (req, res) => {
    let estatus = '未处理'
    let sid = req.body.sid
    let econtent=req.body.econtent
    let etime=req.body.etime
    let sql = 'INSERT INTO message(econtent,sid,etime,estatus) VALUES(?,?,?,?)'
    db.base(sql, [econtent,sid,etime,estatus], (result) => {
        return res.json({ status: 1, msg: '插入message', result })
    })
}
//查询该学员提交的的message
exports.studentMessage = (req, res) => {
    let sid = req.body.sid
    let sql = 'SELECT * FROM message WHERE sid=?'
    db.base(sql, sid, (result) => {
        return res.json({ status: 1, msg: 'studnet的message', result })
    })
}