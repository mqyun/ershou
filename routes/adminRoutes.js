var express = require('express');
var router = express.Router();

var fs = require('fs');

var adminmodel = require('../models/adminmodel');

// 管理员登录页面
router.get('/', function(req, res, next) {
  res.render('admin/login', {
    title: '管理员登录'
  });
});

// 管理员登录
router.post('/login', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  adminmodel.selectAdmin(account, function(err, rows) {
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
    req.session.usertype = 'admin';
    req.session.quanxian = rows[0].quanxian;
    res.json({
      'success': '登录成功'
    });
  });
});

// 获取分类管理页面
router.get('/fenlei', function(req, res, next) {
  adminmodel.getAllFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    res.render('admin/fenlei/index', {
      title: '分类管理',
      fenleiList: fenleiList
    });
  });
});

// 添加分类
router.post('/addFenLei', function(req, res, next) {
  var name = req.body.name;
  adminmodel.addFenLei(name, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加分类成功'
    });
  });
});

// 修改分类
router.post('/xgFenLei', function(req, res, next) {
  var fenleiid = req.body.fenleiid;
  var name = req.body.name;
  adminmodel.xgFenLei(name, fenleiid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '修改分类名称成功'
    });
  });
});

// 管理员物品管理页面
router.get('/wupin', function(req, res, next) {
  adminmodel.getWuPin(function(err, wupinList) {
    if (err) {
      return next(err);
    }
    adminmodel.getAllFenLei(function(err, fenleiList) {
      if (err) {
        return next(err);
      }
      res.render('admin/wupin/index', {
        title: '物品管理',
        wupinList: wupinList,
        fenleiList: fenleiList
      });
    });
  });
});

// 删除物品
router.post('/deleteWuPin', function(req, res, next) {
  var wupinid = req.body.wupinid;
  adminmodel.getThisWuPin(wupinid, function(err, wupinInfo) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    adminmodel.deleteWuPin(wupinid, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      var path = './public' + wupinInfo[0].img;
      fs.unlink(path, function() {
        res.json({
          'success': '删除物品成功'
        });
      });
    });
  });
});

router.get('/logout', function(req, res) {
  req.session.nicheng = '';
  req.session.uid = '';
  req.session.usertype = '';
  req.session.insertId = '';
  res.redirect('/');
});

module.exports = router;
