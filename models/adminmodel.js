var db = require('./dboperation');

module.exports = {
  // 验证管理员
  selectAdmin: function(account, callback) {
    var sql = "select * from admin where account = ?;";
    db.exec(sql, account, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取所有分类
  getAllFenLei: function(callback) {
    var sql = "select * from fenlei;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 添加分类
  addFenLei: function(name, callback) {
    var sql = "insert into fenlei(name) values(?);";
    db.exec(sql, name, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 修改分类名称
  xgFenLei: function(name, id, callback) {
    var sql = "update fenlei set name = ? where id = ?;";
    db.exec(sql, [name, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取所有物品
  getWuPin: function(callback) {
    var sql = "select wupin.*, student.nicheng, student.phone from wupin left join student on wupin.studentid = student.id;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个物品
  getThisWuPin: function(id, callback) {
    var sql = "select * from wupin where id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 删除某个物品
  deleteWuPin: function(id, callback) {
    var sql = "delete from wupin where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
