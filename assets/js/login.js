$(function () {
  // 点击"去注册账号" 的连接
  $("#link-reg").on('click', function () {
    $(".login-box").hide()
    $(".reg-box").show();
  })
  // 点击"去登录" 的连接
  $("#link-login").on('click', function () {
    $(".reg-box").hide();
    $(".login-box").show()
  })

  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    // layui自定义规则，两种方式
    // username: function(value,item){
    // return '用户名不能全为数字';
    // },
    pwd: [
      /^[\S]{6,12}$/, '密码必须6-12位，并且不能出现空格'
    ],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的值
      // 还需要拿到密码框中的内容
      // 然后进行一次判断
      // 如果判断失败，则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表单提交的事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault()

    var data = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }

    $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功");
      // 模拟人的点击行为
      $("#link-login").click()
    })
  })


  // 监听登录的事件[ START ]
  $("#form_login").on("submit", function (e) {
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: 'http://www.liulongbin.top:3007/api/login',
      // 快速获取表单的数据
      data: $("#form_login").serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        // rigou 666666
        layer.msg('登录成功');
        // console.log(res.token)
        // 将登陆成功的token存到localStorage中
        localStorage.setItem('token', res.token)
        // 跳到后台主页
        location.href = 'index.html'
      }
    })
  })
  // 监听登录的事件[ END ]


})
