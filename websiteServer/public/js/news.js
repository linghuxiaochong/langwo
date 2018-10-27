$(window).load(function () {
    let Search = window.location.search;
    let informationsId = Search.substring(1).split('=')[1];
    $.ajax({
        url: '/informations/' + informationsId,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            $('#informations').html(`
            <h1>${data.title}</h1>
            <h2>猫眼电影 ${data.date} <img src="../img/news/viewIcon.png" alt=""/>${data.praise}</h2>
            <p> ${data.content}</p>
            <img src="http://127.0.0.1:3000/upload/${data.titleImg}" alt=""/>
            
            `)
        }
    })



})