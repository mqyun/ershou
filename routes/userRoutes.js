var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');

var usermodel = require('../models/usermodel');

// 首页
router.get('/', function(req, res, next) {
  usermodel.getFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    usermodel.homeGetNewWuPin(function(err, wupinList) {
      if (err) {
        return next(err);
      }
      res.render('student/index/index', {
        title: '跳蚤市场首页',
        fenleiList: fenleiList,
        wupinList: wupinList
      });
    });
  });
});

// 查看分类下的所有物品
router.get('/fenleiSelList/:fenleiid', function(req, res, next) {
  var fenleiid = req.params.fenleiid;
  usermodel.getFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    usermodel.getWuPinByfenlei(fenleiid, function(err, wupinList) {
      if (err) {
        return next(err);
      }
      res.render('student/wupin/list', {
        title: '物品列表',
        smalltip: '分类查看',
        fenleiList: fenleiList,
        wupinList: wupinList
      });
    });
  });
});

// 注册登陆页面
router.get('/reglogin', function(req, res, next) {
  res.render('student/index/reglogin', {
    title: '登录注册'
  });
});

// 学生注册
router.post('/reg', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name;
  var nicheng = req.body.nicheng;
  var phone = req.body.phone;
  usermodel.selectStudent(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '用户名存在'
      });
      return next(err);
    }
    usermodel.studentReg(account, password, phone, nicheng, name, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '注册成功'
      });
    });
  });
});

// 学生登录
router.post('/login', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  usermodel.selectStudent(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.nicheng = rows[0].nicheng;
    req.session.uid = rows[0].id;
    req.session.usertype = 'student';
    res.json({
      'success': '登录成功'
    });
  });
});

// 我的信息
router.get('/mysetting', function(req, res, next) {
  var uid = req.session.uid;
  usermodel.getStudentInfo(uid, function(err, userInfo) {
    if (err) {
      return next(err);
    }
    res.render('student/mysetting/index', {
      title: '我的信息',
      userInfo: userInfo[0]
    });
  });
});

// 修改信息
router.post('/updateNiQian', function(req, res, next) {
  var phone = req.body.phone;
  var nicheng = req.body.nicheng;
  var name = req.body.name;
  var qianming = req.body.qianming;
  var uid = req.session.uid;
  usermodel.updateNiQian(phone, nicheng, name, qianming, uid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
    }
    res.json({
      'success': '修改成功'
    })
  });
});

// 学生上传头像
router.post('/uploadTouXiang', function(req, res, next) {
  var userid = req.session.uid;
  var form = new multiparty.Form({
    uploadDir: './public/uploads/touxiang'
  });
  form.parse(req, function(err, fields, files) {
    if (!fs.existsSync('./public/uploads/touxiang')) {
      fs.mkdirSync('./public/uploads/touxiang');
    }
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp[0]);
      var filename = files.touxiang[0].originalFilename;
      var uploadedPath = files.touxiang[0].path;
      var dstPath = './public/uploads/touxiang/' + userid + '-' + filename;
      var sqlPath = '/uploads/touxiang/' + userid + '-' + filename;
      fs.rename(uploadedPath, dstPath, function(err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
      usermodel.updateTouXiang(sqlPath, userid, function(err) {
        if (err) {
          return next(err);
        }
      });
    }
    res.redirect('/mysetting');
  });
});

// 退出登录
router.get('/logout', function(req, res) {
  req.session.nicheng = '';
  req.session.uid = '';
  req.session.usertype = '';
  req.session.insertId = '';
  res.redirect('/');
});

// 物品管理页面
router.get('/mywupin', function(req, res, next) {
  res.render('student/mysetting/mywupin', {
    title: '物品管理'
  });
});

// 获取物品
router.post('/getWuPin', function(req, res, next) {
  var uid = req.session.uid;
  var type = req.body.type;
  usermodel.getMyWuPin(uid, type, function(err, wupinList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('student/mysetting/_WuPinList', {
      wupinList: wupinList
    }, function(err, html) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 获取我预定的物品
router.post('/getMyYuDing', function(req, res, next) {
  var uid = req.session.uid;
  usermodel.getMyYuDing(uid, function(err, wupinList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('student/mysetting/_WuPinList', {
      wupinList: wupinList
    }, function(err, html) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 获取我购买的物品
router.post('/getMyGouMai', function(req, res, next) {
  var uid = req.session.uid;
  usermodel.getMyGouMai(uid, function(err, wupinList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('student/mysetting/_WuPinList', {
      wupinList: wupinList
    }, function(err, html) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 获取添加物品页面
router.post('/addWuPinView', function(req, res, next) {
  usermodel.getFenLei(function(err, fenleiList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('student/mysetting/_AddWuPin', {
      fenleiList: fenleiList
    }, function(err, html) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 添加物品基本信息
router.post('/addWuPinInfo', function(req, res, next) {
  var name = req.body.name;
  var introduce = req.body.introduce;
  var price = req.body.price;
  var fenleiid = req.body.fenlei;
  var studentid = req.session.uid;
  usermodel.addWuPin(name, introduce, price, fenleiid, studentid, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    req.session.insertId = rows.insertId;
    res.json({
      'success': '添加二手物品基本信息成功，接下来请上传图片'
    });
  })
});

// 上传二手物品图片
router.post('/uploadImg', function(req, res, next) {
  var wupinid = req.session.insertId;
  var form = new multiparty.Form({
    uploadDir: './public/uploads/wupinimg'
  });
  form.parse(req, function(err, fields, files) {
    if (!fs.existsSync('./public/uploads/wupinimg')) {
      fs.mkdirSync('./public/uploads/wupinimg');
    }
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp[0]);
      var filename = files.wupinimg[0].originalFilename;
      var uploadedPath = files.wupinimg[0].path;
      var dstPath = './public/uploads/wupinimg/' + wupinid + '-' + filename;
      var sqlPath = '/uploads/wupinimg/' + wupinid + '-' + filename;
      fs.rename(uploadedPath, dstPath, function(err) {
        if (err) {
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
      usermodel.uploadWuPinImg(sqlPath, wupinid, function(err) {
        if (err) {
          return next(err);
        }
      });
    }
    res.redirect('/mywupin');
  });
});

// 查看物品详情
router.get('/detail/:id', function(req, res, next) {
  var wupinid = req.params.id;
  var studentid = req.session.uid;
  usermodel.getThisWuPin(wupinid, function(err, wupinInfo) {
    if (err) {
      return next(err);
    }
    usermodel.getLiuYan(wupinid, function(err, liuyanList) {
      if (err) {
        return next(err);
      }
      usermodel.isYuDing(wupinid, studentid, function(err, isYuDing) {
        if (err) {
          return next(err);
        }
        usermodel.getFenLei(function(err, fenleiList) {
          if (err) {
            return next(err);
          }
          usermodel.getYuDingUser(wupinid, function(err, yudingUserList) {
            if (err) {
              return next(err);
            }
            res.render('student/wupin/detail', {
              title: '物品详情',
              wupinInfo: wupinInfo[0],
              liuyanList: liuyanList,
              isYuDing: isYuDing,
              fenleiList: fenleiList,
              yudingUserList: yudingUserList
            });
          });
        });
      });
    });
  });
});

// 发表留言
router.post('/addLiuYan', function(req, res, next) {
  var content = req.body.liuyancontent;
  var wupinid = req.body.wupinid;
  var studentid = req.session.uid;
  usermodel.addLiuYan(content, wupinid, studentid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '留言成功'
    });
  });
});

// 预定物品
router.post('/addYuDing', function(req, res, next) {
  var wupinid = req.body.wupinid;
  var studentid = req.session.uid;
  usermodel.yuDingWuPin(wupinid, studentid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '预定成功'
    });
  });
});

// 取消预定物品
router.post('/removeYuDing', function(req, res, next) {
  var yudingid = req.body.yudingid;
  usermodel.removeyuDingWuPin(yudingid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '取消预定成功'
    });
  });
});

// 根据名字查询物品
router.post('/wupinlist', function(req, res, next) {
  var wupinname = req.body.wupinname;
  usermodel.getFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    usermodel.getWuPinByname(wupinname, function(err, wupinList) {
      if (err) {
        return next(err);
      }
      if (wupinname.length == 0) {
        wupinname = '不限'
      }
      res.render('student/wupin/list', {
        title: '物品列表',
        smalltip: '查询：' + wupinname,
        fenleiList: fenleiList,
        wupinList: wupinList
      });
    });
  });
});

// 出售某物品
router.post('/chushouWuPin', function(req, res, next) {
  var gmstudentid = req.body.yudinguid;
  var wupinid = req.body.wupinid;
  usermodel.chushouWuPin(gmstudentid, wupinid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '出售成功'
    });
  })
});

// 查看寻物信息
router.get('/xunwuInfo', function(req, res, next) {
  usermodel.getXunWu(function(err, xunwuList) {
    if (err) {
      return next(err);
    }
    res.render('student/xunwu/index', {
      title: '寻物信息',
      xunwuList: xunwuList
    });
  });
});

// 发布寻物
router.post('/addXunWu', function(req, res, next) {
  var content = req.body.content;
  var studentid = req.session.uid;
  usermodel.addXunWu(content, studentid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '发布寻物成功'
    });
  });
});

module.exports = router;
