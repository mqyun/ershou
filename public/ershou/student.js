$(function() {

});

// 注册
$(document).on('click', '.btn-reg', function() {
  var account = $('input[name="reg-account"]').val();
  var password = $('input[name="reg-password"]').val();
  var repassword = $('input[name="reg-repassword"]').val();
  var phone = $('input[name="reg-phone"]').val();
  var nicheng = $('input[name="reg-nicheng"]').val();
  var name = $('input[name="reg-name"]').val();
  var data = {
    'account': account,
    'password': password,
    'repassword': repassword,
    'phone': phone,
    'nicheng': nicheng,
    'name': name
  }
  if (account.length == 0 || password.length == 0 || repassword != password || phone.length == 0 || nicheng.length == 0 || name.length == 0) {
    showTips('warning', 'Warning!', '请检查注册信息!');
  } else {
    ajaxPost('/reg', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success + '！请您登录');
      }
    });
  }
});

// 登录
$(document).on('click', '.btn-login', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'account': account,
    'password': password
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/login', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success + '，两秒钟之后跳转至首页！');
        setTimeout(function() {
          location.href = '/';
        }, 2000);
      }
    });
  }
});

// 修改个人信息
$(document).on('click', '.btn-toxiugaigrxx', function() {
  $('.xggrxx-bottombtnli').show();
  $('.canxginput').attr('disabled', false);
});

$(document).on('click', '.btn-xggrxxqx', function() {
  $('.xggrxx-bottombtnli').hide();
  $('.canxginput').attr('disabled', true);
});

$(document).on('click', '.btn-xggrxx', function() {
  var phone = $('input[name="xggrxx-phone"]').val();
  var nicheng = $('input[name="xggrxx-nicheng"]').val();
  var name = $('input[name="xggrxx-name"]').val();
  var qianming = $('input[name="xggrxx-qianming"]').val();
  var data = {
    'phone': phone,
    'nicheng': nicheng,
    'name': name,
    'qianming': qianming
  }
  ajaxPost('/updateNiQian', data, function(result) {
    if (result.success) {
      showTips('success', '\n', result.success);
      setTimeout(function() {
        location.reload();
      }, 1500);
    }
  });
});

// 获取未出售物品
$(document).on('click', '.getWeiChuShouWuPin', function() {
  var data = {
    type: '0'
  }
  ajaxPost('/getWuPin', data, function(result) {
    if (result.success) {
      $('#mywupin-content').html('');
      $('#mywupin-content').append(result.view);
    }
  });
});

// 已出售物品
$(document).on('click', '.getYiChuShouWuPin', function() {
  var data = {
    type: '1'
  }
  ajaxPost('/getWuPin', data, function(result) {
    if (result.success) {
      $('#mywupin-content').html('');
      $('#mywupin-content').append(result.view);
    }
  });
});

// 我的预定
$(document).on('click', '.getMyYuDing', function() {
  ajaxPost('/getMyYuDing', {}, function(result) {
    if (result.success) {
      $('#mywupin-content').html('');
      $('#mywupin-content').append(result.view);
    }
  });
});

// 我购买的物品
$(document).on('click', '.getMyGouMai', function() {
  ajaxPost('/getMyGouMai', {}, function(result) {
    if (result.success) {
      $('#mywupin-content').html('');
      $('#mywupin-content').append(result.view);
    }
  });
});

// 添加物品页面
$(document).on('click', '.getAddWuPinView', function() {
  ajaxPost('/addWuPinView', {}, function(result) {
    if (result.success) {
      $('#mywupin-content').html('');
      $('#mywupin-content').append(result.view);
    }
  });
});

// 添加物品基本信息
$(document).on('click', '.btn-addwupininfo', function() {
  var name = $('input[name="name"]').val();
  var introduce = $('input[name="introduce"]').val();
  var price = $('input[name="price"]').val();
  var fenlei = $('select[name="fenlei"]').val();
  var data = {
    'name': name,
    'introduce': introduce,
    'price': price,
    'fenlei': fenlei
  }
  if (name.length == 0 || introduce.length == 0 || price.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/addWuPinInfo', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success);
        $('.wupininfo-view').hide();
        $('.uploadimg-view').show();
      }
    });
  }
});

// 发表留言
$(document).on('click', '.btn-addliuyan', function() {
  var liuyancontent = $('input[name="liuyancontent"]').val();
  var wupinid = $(this).data('wupinid');
  var data = {
    'liuyancontent': liuyancontent,
    'wupinid': wupinid
  }
  if (liuyancontent.length == 0) {
    showTips('warning', 'Warning!', '留言不能为空！');
  } else {
    ajaxPost('/addLiuYan', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success);
        setTimeout(function() {
          location.reload();
        }, 1500);
      }
    });
  }
});

// 预定物品
$(document).on('click', '.btn-addyuding', function() {
  var wupinid = $(this).data('wupinid');
  var data = {
    'wupinid': wupinid
  }
	showBtnTips('success', '\n', '确定预定物品吗？', '取消', '确定', function() {
		ajaxPost('/addYuDing', data, function(result) {
			if (result.success) {
				showTips('success', '\n', result.success);
				setTimeout(function() {
					location.reload();
				}, 1500);
			}
		});
	});
});

// 取消预定物品
$(document).on('click', '.btn-removeyuding', function() {
  var yudingid = $(this).data('yudingid');
  var data = {
    'yudingid': yudingid
  }
	showBtnTips('success', '\n', '确定取消预定吗？', '取消', '确定', function() {
		ajaxPost('/removeYuDing', data, function(result) {
			if (result.success) {
				showTips('success', '\n', result.success);
				setTimeout(function() {
					location.reload();
				}, 1500);
			}
		});
	});
});

// 出售给某用户
$(document).on('click', '.chushouit', function() {
  var yudinguid = $(this).data('yudinguid');
  var wupinid = $(this).data('wupinid');
  var data = {
    'yudinguid': yudinguid,
    'wupinid': wupinid
  }
	showBtnTips('success', '\n', '确定出售给该用户吗？', '取消', '确定', function() {
		ajaxPost('/chushouWuPin', data, function(result) {
			if (result.success) {
				showTips('success', '\n', result.success);
				setTimeout(function() {
					location.reload();
				}, 1500);
			}
		});
	});
});

// 发布寻物
$(document).on('click', '.btn-addxunwu', function() {
  var xunwucontent = $('input[name="xunwucontent"]').val();
  var data = {
    'content': xunwucontent
  }
  if (xunwucontent.length == 0) {
    showTips('warning', '\n', '请填写要发布的寻物信息');
  } else {
    showBtnTips('success', '\n', '确定发布寻物信息吗？', '取消', '确定', function() {
  		ajaxPost('/addXunWu', data, function(result) {
  			if (result.success) {
  				showTips('success', '\n', result.success);
  				setTimeout(function() {
  					location.reload();
  				}, 1500);
  			}
  		});
  	});
  }
});
