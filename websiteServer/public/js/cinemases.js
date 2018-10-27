$(window).load(function () {
    let Search = window.location.search;
    let movieId = Search.substring(1).split('=')[1];
    $.ajax({
        url: '/matchings',
        type: 'get',
        dataType: 'json',
        data: {
            type: 'movies',
            value: movieId
        },
        success: function (data) {
            console.log(data);
            $('#movie').html(`
                <img id="indexImg" src="http://127.0.0.1:3000/upload/${data[0].movies.indexImg}" alt="" />
                <div>
                    <h1 id="cnname">${data[0].movies.cnname}</h1>
                    <h2 id="enname">${data[0].movies.enname}</h2>
                    <span id="type">${data[0].movies.type}</span>
                    <span><span id="area">${data[0].movies.area}/</span><span>${data[0].movies.time}</span></span>
                    <span><span id="uptime">${data[0].movies.uptime}</span><span id="uparea">${data[0].movies.uparea}上映</span></span>
                    <p>
                        <a href=""><img src="../img/details/details_heart.png" alt="" />想看</a>
                        <a href=""><img src="../img/details/details_star.png" alt="" />评分</a>
                    </p>
                </div>
                <form action="">
                    <div>
                        <h2>用户评分</h2>
                        <h3 id="grade">${data[0].movies.grade}</h3>
                        <h4 id="gradeCount">（${data[0].movies.gradeCount}人评分）</h4>
                    </div>
                    <div>
                        <h2>专业评分</h2>
                        <h3>6.4</h3>
                        <h4>（45人评分）</h4>
                    </div>
                    <div>
                        <h2>累计票房</h2>
                        <h3>10.33亿</h3>
                    </div>
                </form>
             `);
             let s='';
            data.map(function(o){
                return s+=`
                <div>
                <div>
                    <h2>${o.cinemases.name}</h2>
                    <p>地址：${o.cinemases.addr}</p>
                </div>
                <p><span>￥<span>${o.rooms[0].price}</span></span>起</p>
                <a href="../html/rooms.html?id=${o.cinemases._id}&&movieId=${movieId}">选座购票</a>
            </div>`
            })
            $('#cinemases').html(s);
        }
    });
})