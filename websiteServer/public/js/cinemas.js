$(window).load(function () {
    $.ajax({
        url: '/cinemases',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data);
             let s='';
            data.map(function(o){
                return s+=`
                <div>
                <div>
                    <h2>${o.name}</h2>
                    <p>地址：${o.addr}</p>
                </div>
                <p><span>￥<span>33</span></span>起</p>
                <a href="../html/rooms.html?id=${o._id}">选座购票</a>
            </div>`
            })
            $('#cinemases').html(s);
        }
    });
})