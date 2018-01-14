/**
 * Created by Geekzs on 2018/1/13.
 */

$(function(){

  //发送ajax请求渲染二级分类表格
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render(){

    $.ajax({

      tyoe:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('.second_tbody').html( template('secondTpl',info) )

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

  };

  //添加二级分类

  $('.btn-add').on('click',function(){

    $('#secondcateModal').modal('show');

    var currentPage = 1;
    var pageSize = 100;
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        $('.dropdown-menu').html(template('listTpl',info))
      }
    })


  })


  //表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message:"请上传品牌图片"
          }
        }
      }
    }


  })

  //下拉列表选中
  $(".dropdown-menu").on("click", "a", function () {
    //修改了按钮的内容
    $(".dropdown-text").text($(this).text());

    //获取id，把id赋值给categoryId的隐藏
    var id = $(this).data("id");
    $("#categoryId").val(id);

    //手动把categoryId设置为VALID状态
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });





  //图片上传
  $("#fileupload").fileupload({
    dataType: 'json',
    //文件上传成功时，会执行的回调函数
    done: function (e, data) {
    //通过data.result可以获取到一个对象，这个对象的picAddr属性就是图片的地址
      console.log(data);
      var result = data.result.picAddr;
      $("#img").attr("src", result);

      //修改隐藏域的value值
      $("#brandLogo").val(result);

      //让brandLogo改为VALID状态
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });


  //验证完成后提交ajax
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({

      type:'post',
      url:"/category/addSecondCategory",
      data:$("#form").serialize(),
      success:function (info) {
        if(info.success) {
          $("#secondcateModal").modal("hide");
          //重新渲染第一页
          page = 1;
          render();

          //重置表单样式
          $("#form").data("bootstrapValidator").resetForm(true);

          $(".dropdown-text").text('请选择一级分类');
          $("#img").attr("src", 'images/none.png');
        }
      }


    })


  })




  })

