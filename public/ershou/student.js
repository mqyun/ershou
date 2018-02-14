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

// 添加物品页面
$(document).on('click', '.getAddWuPinView', function() {
	ajaxPost('/addWuPinView', {}, function(result) {
		if (result.success) {
			$('#mywupin-content').html('');
			$('#mywupin-content').append(result.view);
		}
	});
});
