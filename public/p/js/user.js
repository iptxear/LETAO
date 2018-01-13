/**
 * Created by Geekzs on 2018/1/13.
 */

$(function(){

  //发送ajax请求渲染用户表格数据
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){

    $.ajax({

      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $(".user_tbody").html( template("userTpl",info) );

        //生成页码分页器
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            //console.log(page);
            currentPage = page;
            render();
          }
        });
      }

    })

  }

  //注册启用禁用功能
  $(".user_tbody").on("click","button",function(){

    $("#changeModal").modal('show');

    var id = $(this).parent().attr("data-id");
    var isDelete = $(this).parent().attr("data-isDelete");

    $('.btn_change').off().on('click',function(){

      $.ajax({

        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          //console.log(info);
          $("#changeModal").modal('hide');
          render();

        }

      })

    })

  })


})
