$(window).load(function () {
    let Search = window.location.search;
    let movieId = Search.substring(1).split('=')[1];
    $.ajax({
        url: '/movies/' + movieId,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            $('#indexImg').attr('src', `http://127.0.0.1:3000/upload/${data.indexImg}`);
            $('#cnname').text(data.cnname);
            $('#enname').text(data.enname);
            $('#type').text(data.type);
            $('#area').text(data.area + ' / ');
            $('#time').text(data.time);
            $('#uptime').text(data.uptime);
            $('#uparea').text(data.uparea + '上映');
            $('#want').text(data.want);
            $('#grade').text(data.grade);
            $('#gradeCount').text(data.gradeCount);
            $('#intro').text(data.intro);
            $('#director').text(data.director[0].name);
            $('#buyTicket').click(function () {
                location.href = `../html/cinemases.html?id=${movieId}`;
            })
            let s = "";
            if (data.comment) {
                data.comment.map(function (o) {
                    return s += `<div>
                            <img src="../img/details/details_guest.png" alt="" />
                            <div>
                                <div>
                                    <p>
                                        <span>${o.name}<span>购</span></span>
                                        <span>${o.time}
                                            <img src="../img/details/details_color_l.png" alt="" /><img src="../img/details/details_color_r.png"
                                                alt="" />
                                            <img src="../img/details/details_color_l.png" alt="" /><img src="../img/details/details_color_r.png"
                                                alt="" />
                                            <img src="../img/details/details_color_l.png" alt="" /><img src="../img/details/details_color_r.png"
                                                alt="" />
                                            <img src="../img/details/details_color_l.png" alt="" /><img src="../img/details/details_color_r.png"
                                                alt="" />
                                            <img src="../img/details/details_color_l.png" alt="" /><img src="../img/details/details_color_r.png"
                                                alt="" />
                                        </span>
                                    </p>
                                    <a href="">举报</a>
                                    <a href=""><img src="../img/news/good.png" alt="" />${o.praise}</a>
                                </div>
                                <div>
                                    <p>${o.text}</p>
                                </div>
                            </div>
                            </div>`
                })
                $('#comment').html($('#comment').html() + s)
            }

        }
    })
    $.ajax({
        url: '/getSession',
        type: 'get',
        success: function (data) {
            console.log(data);
            $('#comment').on('click', '#updateComment', function () {
                if (data.username) {
                    $('#newComment').css('display', 'block');
                } else {
                    if (confirm('请先登录在评论')) {
                        location.href = '../html/login.html';
                    }
                }
            });
            $('#comment').on('click', '#newComment>input', function () {
                $.ajax({
                    url: '/movies/' + movieId,
                    type: 'put',
                    data: {
                        name: data.username,
                        time: new Date().toLocaleDateString(),
                        praise: 0,
                        text: $('#newComment>textarea').val()
                    },
                    success: function () {
                        window.location.reload();
                    }
                })
                $('#newComment').css('display', 'none');
            });
        }
    });
})