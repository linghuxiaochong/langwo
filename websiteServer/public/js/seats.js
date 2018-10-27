$(window).load(function () {
    let Search = window.location.search;
    let matchings = Search.substring(1).split('&&');
    let matchingId = matchings[0].split('=')[1];
    let roomTime = matchings[1].split('=')[1];
    console.log(matchingId, roomTime);
    $.ajax({
        url: '/matchings/' + matchingId,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let room = data.rooms.filter(function (o) { return o.time.split(' ')[1] == roomTime });
            console.log(room);
            let roomSeats = data.cinemases.rooms.filter(function (o) { return o.name == room[0].name })
            console.log(roomSeats);
            $('#movie').html(`
        <img src="http://127.0.0.1:3000/upload/${data.movies.indexImg}" alt="">
                <div>
                    <h1>${data.movies.cnname}</h1>
                    <p>类型：<span>${data.movies.type}</span></p>
                    <p>时长：<span>${data.movies.time}</span></p>
                </div>
        `);
            $('#cinemas').html(`
        <p>影院：<span>${data.cinemases.name}</span></p>
        <p>影厅：<span>${room[0].name}</span></p>
        <p>版本：<span>原版3D</span></p>
        <p>场次：<span>${room[0].time}</span></p>
        <p>票价：<span>￥${room[0].price}/张</span></p>
        `)
            let s = '';
            let row = 1;
            eval(roomSeats[0].seats).forEach(function (item, index) {
                let str = '';
                if (item.includes(1)) {
                    str += `<td>${row}</td>`;
                    let column = 1;
                    item.forEach(function (ite, ind) {
                        if (ite == 1) {
                            str += `<td class="optionalSeat" data-seatsindex="${index}-${ind}" data-seats="${row}排${column++}座"></td>`;
                        } else if (ite == 0) {
                            str += '<td></td>';
                        }
                    });
                    row++;
                } else {
                    str += `<td></td>`;
                };

                str = `<tr>${str}</tr>`;
                s += str;
            });
            $('#seats').html(s);
            if (room[0].buySeats) {
                for (let item of room[0].buySeats) {
                    for (let ite of item.tickets) {
                        $(`td[data-seatsindex="${ite}"]`).attr('class', 'soldSeat');
                    }
                }
            }
            let seatsNum = 0;
            $('#seats').on('click', '.optionalSeat', function () {
                if (seatsNum < 5) {
                    $(this).attr('class', 'selectedSeat');
                    let s = '';
                    let money = 0;
                    $('.selectedSeat').each(function () {
                        s += `<span>${$(this).attr('data-seats')}</span>`;
                        money += parseFloat(room[0].price);
                    })
                    $('#allSeats').html(s);
                    $('#money').text(money);
                    seatsNum++;
                } else {
                    alert('最多购买5张');
                }
            });
            $('#seats').on('click', '.selectedSeat', function () {
                $(this).attr('class', 'optionalSeat');
                let s = '';
                let money = 0;
                $('.selectedSeat').each(function () {
                    s += `<span>${$(this).attr('data-seats')}</span>`;
                    money += parseFloat(room[0].price);
                })
                $('#allSeats').html(s);
                $('#money').text(money);
                seatsNum--;
            });
            $('#affirm').click(function () {
                let tickets = [];
                $('.selectedSeat').each(function () {
                    tickets.push($(this).attr('data-seatsindex'));
                })
                $.ajax({
                    url: '/getSession',
                    type: 'get',
                    success: function (data) {
                        if (data.username) {
                            if (confirm('确认支付购买吗')) {
                                let affirmSeats = {
                                    userId: data.username,
                                    tickets,
                                };
                                $.ajax({
                                    url: '/matchings/' + matchingId,
                                    type: 'get',
                                    dataType: 'json',
                                    success: function (data) {
                                        for (let item of data.rooms) {
                                            if (item.time.split(' ')[1] == roomTime) {
                                                item.buySeats ? item.buySeats.push(affirmSeats) : item.buySeats = [affirmSeats];
                                            }
                                        };
                                        $.ajax({
                                            url: '/matchings/' + matchingId,
                                            type: 'put',
                                            data: {
                                                rooms: JSON.stringify(data.rooms)
                                            },
                                            success: function (data) {
                                                alert('购票成功');
                                                window.location.reload();
                                            }
                                        })

                                    }
                                })
                            }

                        } else {
                            if (confirm('请先登录账号')) {
                                location.href = '../html/login.html';
                            }
                        }
                    }
                })

            })
        }
    });

})