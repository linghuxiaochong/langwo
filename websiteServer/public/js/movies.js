$(window).load(function () {
    function INpage(page) {
        $.ajax({
            url: '/movies',
            type: 'get',
            dataType: 'json',
            data: {
                page,
                rows: 12
            },
            success: function (data) {
                let s = '';
                data.rows.map(function (o) {
                    return s += `
                    <figure data-id="${o._id}">
                    <img src="http://127.0.0.1:3000/upload/${o.indexImg}" alt="" />
                    <figcaption>
                        <h1>${o.cnname}</h1>
                        <p><span>${o.grade}</span></p>
                    </figcaption>
                </figure>`
                })
                $('#movies').html(s);
                s = '';
                for (let i = 1; i <= data.maxpage; i++) {
                    s += `<input type="radio" name="remenpaixu" id='page${i}'/>
                    <label for='page${i}'>${i}</label>`;
                }
                $('#page').html(s);
                if (data.curpage > 1) {
                    $('#page').html(`<a data-page="${data.curpage - 1}">上一页</a>${$('#page').html()}`)
                };
                if (data.curpage < data.maxpage) {
                    $('#page').html(`${$('#page').html()}<a data-page="${parseInt(data.curpage) + 1}">下一页</a>`)
                }
            }
        });
    };
    INpage(1);
    $('#page').on('click', 'label', function () {
        INpage($(this).text());
    });
    $('#page').on('click', 'a', function () {
        INpage($(this).attr('data-page'));
    });
    $('#movies').on('click', 'figure', function () {
        location.href=`../html/details.html?id=${$(this).attr('data-id')}`
    });
})