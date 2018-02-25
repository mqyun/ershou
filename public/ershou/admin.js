$(function() {

});

// 管理员登录
$(document).on('click', '.btn-adminlogin', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'account': account,
    'password': password
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/admin/login', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success + '，两秒钟之后跳转到首页！');
        setTimeout(function() {
          location.href = '/admin/fenlei';
        }, 2000);
      }
    });
  }
});

// 添加分类
$(document).on('click', '.btn-addfenleimodal', function() {
  layer.open({
    type: 1,
    title: '添加分类',
    area: ['360px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-3">分类名</label>\
    <div class="col-lg-9"><input type="text" name="fenlei-name" class="form-control"></div></div>\
    </div></div>',
    btn: ['添加'],
    shadeClose: true,
    yes: function(index, layero) {
      var name = $('input[name="fenlei-name"]').val();
      var data = {
        'name': name
      }
      layer.close(index);
      if (name.length == 0) {
        showTips('warning', 'Warning!', '请填写分类名称！');
      } else {
        ajaxPost('/admin/addFenLei', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            setTimeout(function() {
              location.reload();
            }, 1000);
          }
        });
      }
    }
  });
});

// 修改分类名称
$(document).on('click', '.btn-xgfenleiname', function() {
  var fenleiid = $(this).data('fenleiid');
  layer.open({
    type: 1,
    title: '修改分类',
    area: ['360px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-3">分类名</label>\
    <div class="col-lg-9"><input type="text" name="fenlei-name" class="form-control"></div></div>\
    </div></div>',
    btn: ['修改'],
    shadeClose: true,
    yes: function(index, layero) {
      var name = $('input[name="fenlei-name"]').val();
      var data = {
        'fenleiid': fenleiid,
        'name': name
      }
      layer.close(index);
      if (name.length == 0) {
        showTips('warning', 'Warning!', '请填写要修改的分类名称！');
      } else {
        ajaxPost('/admin/xgFenLei', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            setTimeout(function() {
              location.reload();
            }, 1000);
          }
        });
      }
    }
  });
});

// 删除物品
$(document).on('click', '.btn-deletewupin', function() {
  var wupinid = $(this).data('wupinid');
  var data = {
    'wupinid': wupinid
  }
  showBtnTips('success', '\n', '确定删除该物品吗?', '取消', '确定', function() {
    ajaxPost('/admin/deleteWuPin', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success);
        setTimeout(function() {
          location.reload();
        }, 1500);
      }
    });
  });
});
