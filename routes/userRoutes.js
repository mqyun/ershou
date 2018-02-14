var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');

var usermodel = require('../models/usermodel');

// 首页
router.get('/', function(req, res, next) {
	res.render('student/index/index', {
		title: '跳蚤市场首页'
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

// 获取添加物品页面
router.post('/addWuPinView', function(req, res, next) {
  res.render('student/mysetting/_AddWuPin', {}, function(err, html) {
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

module.exports = router;
