$(window).load(function () {
    let obj = {
        phone: false,
        authCode: false,
        pwd: false,
        pwdOk: false
    };
    //判断手机号
    $('#phone input').blur(function () {
        let state = $('#phone>td:last')
        if (/^1\d{10}$/.test($('#phone input').val())) {
            $.ajax({
                url: '/users',
                type: 'get',
                dataType: 'json',
                data: {
                    type: 'phone',
                    value: $('#phone input').val()
                },
                success: function (data) {
                    if (data.length > 0) {
                        state.text('手机号已被使用');
                        state.css({ 'color': 'red', 'font-size': '14px' });
                        obj.phone = false;
                    } else {
                        state.text('√');
                        state.css({ 'color': 'green', 'font-size': '14px' });
                        obj.phone = true;
                    }
                }
            })
        } else {
            state.text('格式错误');
            state.css({ 'color': 'red', 'font-size': '14px' });
            obj.phone = false;
        }
    });
    //判断验证码
    $('#authCode input').blur(function () {
        let state = $('#authCode>td:last')
        if (/^\d{6}$/.test($('#authCode input').val())) {
            state.text('√');
            state.css({ 'color': 'green', 'font-size': '14px' });
            obj.authCode = true;
        } else {
            state.text('格式错误');
            state.css({ 'color': 'red', 'font-size': '14px' });
            obj.authCode = false;
        }
    });
    //判断密码格式
    $('#pwd input').blur(function () {
        let state = $('#pwd>td:last')
        if (/^\w{6,}$/.test($('#pwd input').val())) {
            state.text('√');
            state.css({ 'color': 'green', 'font-size': '14px' });
            obj.pwd = true;
        } else {
            state.text('格式错误');
            state.css({ 'color': 'red', 'font-size': '14px' });
            obj.pwd = false;
        }
    });
    //判断两个密码是否一致
    $('#pwdOk input').blur(function () {
        let state = $('#pwdOk>td:last')
        if ($('#pwdOk input').val() == $('#pwd input').val()) {
            state.text('√');
            state.css({ 'color': 'green', 'font-size': '14px' });
            obj.pwdOk = true;
        } else {
            state.text('密码不一致');
            state.css({ 'color': 'red', 'font-size': '14px' });
            obj.pwdOk = false;
        }
    });
    $('#signup input').click(function () {
        if (obj.phone && obj.authCode && obj.pwd && obj.pwdOk) {
            $.ajax({
                url: '/users',
                type: 'post',
                data: {
                    username: $('#phone input').val(),
                    phone: $('#phone input').val(),
                    pwd: $('#pwd input').val(),
                    privilege: 0
                },
                success: function (data) {
                    alert('注册成功');
                    location.href = '../html/login.html';
                }
            })
        }
    })
})
