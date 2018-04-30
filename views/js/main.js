layui.use('carousel', function(){
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
        elem: '#test10'
        ,width: '100%' //设置容器宽度
        ,height: '400px'
        ,arrow: 'hover' //始终显示箭头
        ,interval:3000
    });
});