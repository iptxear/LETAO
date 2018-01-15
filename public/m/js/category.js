/**
 * Created by Geekzs on 2018/1/15.
 */

$(function(){


  //渲染一级分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info);
      $('.cate_left').html(template('tpl_left',info));
      renderRight(1);
    }

  })


  //渲染二级分类
  function renderRight(id){

    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
        $('.cate_right').html(template('tpl_right',info))
      }
    })

  }


  //注册点击事件（请求二级分类数据）

  $('.cate_left').on('click','a',function(){
    $(this).addClass('active').parent().siblings().children().removeClass('active');
    var id = $(this).data('id');
    renderRight(id);
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,0);
  })


})