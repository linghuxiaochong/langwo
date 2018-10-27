$(window).load(function () {
    let Search = window.location.search;
    let matchings = Search.substring(1).split('&&');
    let cinemasesId = matchings[0].split('=')[1];
    console.log(matchings[1]);
    $.ajax({
        url: '/matchings',
        type: 'get',
        dataType: 'json',
        data: {
            type: 'cinemases',
            value: cinemasesId
        },
        success: function (data) {
            let s = "";
            data.map(function (o) {
                return s += `
                <img data-id='${o._id}' src="http://127.0.0.1:3000/upload/${o.movies.indexImg}" alt="">`
            });
            $('#movies').html(s);
            $(`#movies>img[data-id="${data[0]._id}"]`).css({ border: '3px solid #ef4339', transform: 'scale(1.1)' })
            s = `<tr>
                    <td>放映时间</td>
                    <td>语言版本</td>
                    <td>放映厅</td>
                    <td>售价（元）</td>
                    <td>选座购票</td>
                </tr>`;
            $('#movie').html(`
                    <h1>${data[0].movies.cnname}<span>${data[0].movies.grade} <span>分</span></span></h1>
                    <p>
                        <span>时长 :<span>${data[0].movies.time}</span></span>
                        <span>类型 :<span>${data[0].movies.type}</span></span>
                        <span>主演 :<span>${data[0].movies.actor[0].name}</span></span>
                    </p>
                    <ul>
                        <span>观影时间：</span>
                        <li>今天 9月12</li>
                        <li>明天 9月13</li>
                        <li>后天 9月14</li>
                    </ul>
                    `)
            data[0].rooms.map(function (o) {
                return s += `
                                <tr>
                        <td>
                            <h2>${o.time.split(' ')[1]}</h2>
                            <p>13:38散场</p>
                        </td>
                        <td>原版3D</td>
                        <td>${o.name}</td>
                        <td>￥${o.price}</td>
                        <td><a href="../html/seats.html?id=${data[0]._id}&&time=${o.time.split(' ')[1]}">选座购票</a> </td>
                    </tr>`
            });
            $('#rooms').html(s);
            $('#cinemases').html(`
            <img src="../img/rooms/1_0822151022.jpg" alt="" />
            <div>
                <h1>${data[0].cinemases.name}</h1>
                <span>${data[0].cinemases.addr}</span>
                <span>电话：${data[0].cinemases.tel}</span>
                <span>影院服务 —————————————————</span>
                <p>
                    <span><span>3D眼镜</span>免押金</span>
                    <span><span>可停车</span>目前免费，详情现场咨询影城</span>
                </p>
            </div>
                `);
            if (matchings[1]) {
                let movieId = matchings[1].split('=')[1];
                let selectedmovie = data.filter(function (o) { return o.movies._id == movieId });
                console.log(selectedmovie);
                $('#movies>img').css({ border: '3px solid white', transform: 'scale(1)' })
                $(`#movies>img[data-id="${selectedmovie[0]._id}"]`).css({ border: '3px solid #ef4339', transform: 'scale(1.1)' })
                $('#movie').html(`
                <h1>${selectedmovie[0].movies.cnname}<span>${selectedmovie[0].movies.grade} <span>分</span></span></h1>
                <p>
                    <span>时长 :<span>${selectedmovie[0].movies.time}</span></span>
                    <span>类型 :<span>${selectedmovie[0].movies.type}</span></span>
                    <span>主演 :<span>${selectedmovie[0].movies.actor[0].name}</span></span>
                </p>
                <ul>
                    <span>观影时间：</span>
                    <li>今天 9月12</li>
                    <li>明天 9月13</li>
                    <li>后天 9月14</li>
                </ul>
                `)
                let s = `<tr>
                <td>放映时间</td>
                <td>语言版本</td>
                <td>放映厅</td>
                <td>售价（元）</td>
                <td>选座购票</td>
            </tr>`;
                selectedmovie[0].rooms.map(function (o) {
                    return s += `
                                    <tr>
                            <td>
                                <h2>${o.time.split(' ')[1]}</h2>
                                <p>13:38散场</p>
                            </td>
                            <td>原版3D</td>
                            <td>${o.name}</td>
                            <td>￥${o.price}</td>
                            <td><a href="../html/seats.html?id=${selectedmovie[0]._id}&&time=${o.time.split(' ')[1]}">选座购票</a> </td>
                        </tr>`
                });
                $('#rooms').html(s);

            }
        }
    })
    $('#movies').on('click', 'img', function () {
        $.ajax({
            url: '/matchings/' + $(this).attr('data-id'),
            type: 'get',
            dataType: 'json',
            success: (data) => {
                console.log(data);
                $('#movies>img').css({ border: '3px solid white', transform: 'scale(1)' })
                $(this).css({ border: '3px solid #ef4339', transform: 'scale(1.1)' })
                $('#movie').html(`
                <h1>${data.movies.cnname}<span>${data.movies.grade} <span>分</span></span></h1>
                <p>
                    <span>时长 :<span>${data.movies.time}</span></span>
                    <span>类型 :<span>${data.movies.type}</span></span>
                    <span>主演 :<span>${data.movies.actor[0].name}</span></span>
                </p>
                <ul>
                    <span>观影时间：</span>
                    <li>今天 9月12</li>
                    <li>明天 9月13</li>
                    <li>后天 9月14</li>
                </ul>
                `)
                let s = `<tr>
                <td>放映时间</td>
                <td>语言版本</td>
                <td>放映厅</td>
                <td>售价（元）</td>
                <td>选座购票</td>
            </tr>`;
                data.rooms.map(function (o) {
                    return s += `
                                    <tr>
                            <td>
                                <h2>${o.time.split(' ')[1]}</h2>
                                <p>13:38散场</p>
                            </td>
                            <td>原版3D</td>
                            <td>${o.name}</td>
                            <td>￥${o.price}</td>
                            <td><a href="../html/seats.html?id=${data._id}&&time=${o.time.split(' ')[1]}">选座购票</a> </td>
                        </tr>`
                });
                $('#rooms').html(s);
            }
        })
    })

})