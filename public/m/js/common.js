/**
 * Created by Geekzs on 2018/1/14.
 */


mui('.mui-scroll-wrapper').scroll({
  indicators: false,
  deceleration: 0.0005
});


var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000
});