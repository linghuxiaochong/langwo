$(window).load(function () {
    $.ajax({
        url: '/hot',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let s = '';
            data.map(function (o) {
                return s += ` 
                <figure>
                    <img data-id='${o.movies._id}' src="http://127.0.0.1:3000/upload/${o.movies.indexImg}" alt=""/>
                    <p>
                    <span>${o.movies.cnname}</span>
                    <span>${o.movies.grade}</span>
                    </p>
                    <figcaption>
                        <a href="../html/cinemases.html?id=${o.movies._id}">购票</a>
                    </figcaption>
                </figure>`
            })
            $('#hot').html(s);
            $('#hot').on('click','img',function(){
                location.href=`../html/details.html?id=${$(this).attr('data-id')}`
            })
        }
    });
    $.ajax({
        url: '/stay',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let s = '';
            data.map(function (o) {
                return s += `
                 <figure>
                <figcaption>
                    <img data-id='${o.movies._id}' src="http://127.0.0.1:3000/upload/${o.movies.indexImg}" alt="" />
                    <h4>${o.movies.want}人想看</h4>
                    <a href="">预告片</a>
                    <a href="">预售</a>
                </figcaption>
                <p>${o.movies.uptime}上映</p>
            </figure>`
            })
            $('#stay').html(s);
            $('#stay').on('click','img',function(){
                location.href=`../html/details.html?id=${$(this).attr('data-id')}`
            })
        }
    })
    $.ajax({
        url: '/movies',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            let s = '<h1>今日票房</h1>';
            data = _.sortBy(data, function (item) {
                return -item.gradeCount;
            });
            for(let i=0;i<10;i++){
                if(i==0){
                    s+=`
                    <div>
                    <img src="http://127.0.0.1:3000/upload/${data[i].indexImg}" alt="" />
                    <h2>
                        <a href="">${data[i].cnname}</a>
                        <span>${data[i].gradeCount}</span>
                    </h2>
                </div>`;
                }else{
                    s+=`
                    <div>
                    <i>${i+1}</i>
                    <a href="">${data[i].cnname}</a>
                    <span>${data[i].gradeCount}</span>
                </div>
                    `
                }
            };
            s+=` <footer>
            <h3>今日大盘</h3>

            <p>
                <a href=""><span>1.03</span>亿</a>
                <span>北京时间：22:46:26</span>
            </p>

            <p>
                <a href="">查看更多&gt</a>
                <span>猫眼专业版实时票房数据</span>
            </p>
        </footer>`;
            $('#gradeCount').html(s);


        }
    });
})