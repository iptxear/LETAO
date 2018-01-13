/**
 * Created by Geekzs on 2018/1/13.
 */

$(function(){

  //发送ajax请求渲染一级分类表格

  var currentPage = 1;
  var pageSize = 5;
  render();

  function render(){

    $.ajax({

      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);

        $(".first_tbody").html( template("firstTpl", info) )

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });

      }

    })

  }



  //弹出一级分类模态框

  $(".btn-add").on("click",function(){

    $('#firstcateModal').modal('show');

  })



  // 表单验证（提交按钮必须是submit 必须在表单内 或者关联表单form="form"）
  $('#form').bootstrapValidator({

    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    fields:{

      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类的名称',
          }
        }
      }

    }

  })


  //表单验证通过后事件阻止submit默认行为，使用ajax请求
  $('#form').on("success.form.bv",function(e){

    e.preventDefault();

    $.ajax({
      type:'post',
      url:' /category/addTopCategory',
      data: $('#form').serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          $('#firstcateModal').modal('hide');
          currentPage = 1;
          render();

          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }

    })


  })







})

