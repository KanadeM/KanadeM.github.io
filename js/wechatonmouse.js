
$('.log-wechat-ljm').on('mousemove', function (ev) {
    var left = ev.clientX - 85
    var top = ev.clientY - 170
    $('.log-wechat-ljm-img').css({
        top: top + 'px',
        left: left + 'px',
        display: 'block'
    })
})
$('.log-wechat-ljm').on('mouseout', function () {
    $('.log-wechat-ljm-img').css('display', 'none')
})