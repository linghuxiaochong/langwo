$('input[type="button"]').click(function () {
    $.ajax({
        url: '/users/login',
        type: 'post',
        data: {
            username: $('input[type="text"]').val(),
            pwd: $('input[type="password"]').val()
        },
        success: function (data) {
            if (data.status == 1) {
                alert('登陆成功');
                location.href = '../html/index.html';
            }else{
                alert('账号密码错误');
            }
        }
    })
})