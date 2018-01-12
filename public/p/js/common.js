/**
 * Created by Geekzs on 2018/1/11.
 */
$(function(){

//进度条功能


  //关闭进度环
  NProgress.configure({ showSpinner: false });

  //ajax请求开始时开启进度条
  $(document).ajaxStart(function(){

    NProgress.start();

  });
  //ajax请求完成时结束进度条
  $(document).ajaxStop(function(){

    setTimeout(function(){
      NProgress.done();
    },1000);

  })

//===============================================
//登录退出


  //发送ajax请求判断是否登录
  if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function(info){
        if(info.error == 400){
          location.href = "login.html";
        }
      }
    })
  }

  //点击退出按钮弹出退出界面(模态框)
  $('.logOut').on('click', function () {
    $('#myModal').modal('show')
  })

  //发送ajax请求退出登录
  $('.btn_logOut').on('click',function(){

    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(info){
        if(info.success){
          location.href="login.html";
        }
      }
    })

  })

//===============================================
//列表展开隐藏


  //左侧边栏列表展开隐藏
  $('.menu').on("click",function(){
    $(".lt_aside").toggleClass("active");
    $(".lt_main").toggleClass("active");
  })

  //左侧边栏分类管理列表展开隐藏
  $(".cate").on("click",function(){
    $(this).next().slideToggle();
  })




})