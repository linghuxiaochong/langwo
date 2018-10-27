$(window).load(function () {
    $.ajax({
        url: '/informations',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let s = '';
            data.map(function (o) {
                return s += ` 
                <div data-id="${o._id}">
                <img src="http://127.0.0.1:3000/upload/${o.titleImg}" alt="">
                <p>${o.title}</p>
                <div>
                    <span>猫眼娱乐</span>
                    <span>${o.praise}</span>
                </div>
            </div>`
            })
            $('#informations').html(s);
        }
    });
    $('#informations').on('click','div',function(){
        location.href=`../html/news.html?id=${$(this).attr('data-id')}`;
    })
})