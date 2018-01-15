/**
 * Created by Geekzs on 2018/1/14.
 */


mui('.mui-scroll-wrapper').scroll({
  indicators: false,
  deceleration: 0.0005,
  startX: 0, //初始化时滚动至x
  startY: 0 //初始化时滚动至y
});


var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000
});