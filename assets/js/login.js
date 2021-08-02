$(function () {
  // 1、设置点击文字实现登录和注册切换
  $(".login a").on("click", function () {
    $(".login").hide().next().show();
  });
  $(".register a").on("click", function () {
    $("register").hide().prev().show();
  });

  // 2.设置注册页面
  // 2.1注册前校验
  // 定义变量form（为啥要定义这个？？）
  var form = layui.form;
  form.verify({
    // 自定义校验规则 username
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字";
      }
    },
    // 自定义检验规则：pass
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 自定义检验规则：repass
    //value：表单的值、item：表单的DOM对象
    repass: function (value, item) {
      var passVal = $(".register .pass").val();
      if (passVal != value) {
        $(".register .myForm .pass,.register .myForm .repass").val('');
        return "两次密码不一致，请重新输入";
      }
    }
  });

    //3. 实现注册功能
    // 1.检查input标签中的name属性值是否和文档要求一致
    // 2.给form标签注册事件发送请求
    var BASE_URL = 'http://ajax.frontend.itheima.net';
    $('.register .myForm').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault();

        // 发送ajax请求
        $.ajax({
            type: 'POST',
            url: BASE_URL + '/api/reguser',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res.status);
                var layer = layui.layer;
                layer.msg(res.message);
                if (res.status === 0){
                    $('.login').show().next().hide();
                }
            }
        })
    })

    // 3.注册成功后切换登录界面
    $('.login .myForm').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: BASE_URL + '/api/login',
            data: $(this).serialize(),
            success: function(res){
                layer.msg(res.message);
                if(res.status === 0){
                    location.href = '../../../index.html';
                }
            }
        })
    })
});
