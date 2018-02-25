var db = require('./dboperation');

module.exports = {
  // 验证用户
  selectStudent: function(account, callback) {
    var sql = "select * from student where account = ?;";
    db.exec(sql, account, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 用户注册
  studentReg: function(account, password, phone, nicheng, name, callback) {
    var sql = "insert into student(account, password, phone, nicheng, name) values(?,?,?,?,?);";
    db.exec(sql, [account, password, phone, nicheng, name], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  getStudentInfo: function(id, callback) {
    var sql = "select * from student where id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改头像
  updateTouXiang: function(touxiangurl, id, callback) {
    var sql = "update student set touxiang = ? where id = ?;";
    db.exec(sql, [touxiangurl, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 修改昵称和签名
  updateNiQian: function(phone, nicheng, name, qianming, id, callback) {
    var sql = "update student set phone = ?, nicheng = ?, name = ?, qianming = ? where id = ?;";
    db.exec(sql, [phone, nicheng, name, qianming, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 发布二手物品
  addWuPin: function(name, introduce, price, fenleiid, studentid, callback) {
    var sql = "insert into wupin(name, introduce, price, fenleiid, studentid) values(?,?,?,?,?);";
    db.exec(sql, [name, introduce, price, fenleiid, studentid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 上传物品图片
  uploadWuPinImg: function(imgurl, id, callback) {
    var sql = "update wupin set img = ? where id = ?;";
    db.exec(sql, [imgurl, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 修改物品信息
  updateWuPin: function(name, introduce, price, fenleiid, id, callback) {
    var sql = "update wupin set name = ?, introduce = ?, price = ?, fenleiid = ? where id = ?;";
    db.exec(sql, [name, introduce, price, fenleiid, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取所有分类
  getFenLei: function(callback) {
    var sql = "select * from fenlei;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 首页显示未出售的最新的六个物品
  homeGetNewWuPin: function(callback) {
    var sql = "select * from wupin where gmstudentid = 0 order by id desc limit 0, 6;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 浏览显示未出售的二手物品（按分类）
  getAllFenLeiWuPin: function(fenleiid, callback) {
    var sql = "select * from wupin where fenleiid = ? and gmstudentid = 0;";
    db.exec(sql, fenleiid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看某个二手物品详情
  getThisWuPin: function(id, callback) {
    var sql = "select wupin.*, student.nicheng, student.phone, student.touxiang from wupin left join student on wupin.studentid = student.id where wupin.id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 给物品留言
  addLiuYan: function(content, wupinid, studentid, callback) {
    var sql = "insert into liuyan(content, wupinid, studentid) values(?,?,?);";
    db.exec(sql, [content, wupinid, studentid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 显示所有留言信息
  getLiuYan: function(wupinid, callback) {
    var sql = "select liuyan.content, student.nicheng, student.touxiang from liuyan left join student on liuyan.studentid = student.id where liuyan.wupinid = ?;";
    db.exec(sql, wupinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 预定物品
  yuDingWuPin: function(wupinid, studentid, callback) {
    var sql = "insert into yuding(wupinid, studentid) values(?,?);";
    db.exec(sql, [wupinid, studentid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看该物品是否已经预定
  isYuDing: function(wupinid, studentid, callback) {
    var sql = "select * from yuding where wupinid = ? and studentid = ?;";
    db.exec(sql, [wupinid, studentid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 取消预定
  removeyuDingWuPin: function(yudingid, callback) {
    var sql = "delete from yuding where id = ?;";
    db.exec(sql, yudingid, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看个人物品（type=0为未出售，type=1为已出售）
  getMyWuPin: function(studentid, type, callback) {
    var sql;
    if (type == 0) {
      sql = "select * from wupin where studentid = ? and gmstudentid = 0;";
    } else {
      sql = "select wupin.*, student.nicheng as gmnicheng, student.phone as gmphone from wupin left join student on wupin.gmstudentid = student.id where wupin.studentid = ? and wupin.gmstudentid != 0;";
    }
    db.exec(sql, studentid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 发布信息查找二手物品
  addXunWu: function(content, studentid, callback) {
    var sql = "insert into xunwu(content, studentid) values(?,?);";
    db.exec(sql, [content, studentid], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 显示所有寻物
  getXunWu: function(callback) {
    var sql = "select xunwu.*, student.nicheng, student.touxiang from xunwu left join student on xunwu.studentid = student.id;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 按名字查询未出售的物品
  getWuPinByname: function(wupin, callback) {
    var sql = "select * from wupin where name like '%" + wupin + "%' and gmstudentid = 0;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查询某分类下的所有物品
  getWuPinByfenlei: function(fenleiid, callback) {
    var sql = "select * from wupin where fenleiid = ?;";
    db.exec(sql, fenleiid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看我的预定
  getMyYuDing: function(studentid, callback) {
    var sql = "select wupin.* from yuding left join wupin on yuding.wupinid = wupin.id where yuding.studentid = ?;";
    db.exec(sql, studentid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看我买到的物品
  getMyGouMai: function(studentid, callback) {
    var sql = "select * from wupin where gmstudentid = ?;";
    db.exec(sql, studentid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 查看已预订用户
  getYuDingUser: function(wupinid, callback) {
    var sql = "select student.* from yuding left join student on yuding.studentid = student.id where wupinid = ?;";
    db.exec(sql, wupinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 出售物品
  chushouWuPin: function(gmstudentid, wupinid, callback) {
    var sql = "update wupin set gmstudentid = ? where id = ?;";
    db.exec(sql, [gmstudentid, wupinid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
