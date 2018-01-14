/**
 * Created by Geekzs on 2018/1/14.
 */

$(function(){

  //发送ajax请求渲染商品管理表格
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){

    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        $('.product_tbody').html( template('productTpl',info) )

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event,originalEvent,type,page){
            currentPage=page;
            render();
          },
          itemTexts: function (type, page, current) {
            //根据type的不同，返回不同的字符串
            console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
            //return 111;
          },
          //tooltipTitles: function (type, page, current) {
          //  //根据type的不同，返回不同的字符串
          //  console.log(type, page, current);
          //  switch (type) {
          //    case "first":
          //      return "首页";
          //    case "prev":
          //      return "上一页";
          //    case "next":
          //      return "下一页";
          //    case "last":
          //      return "尾页";
          //    case "page":
          //      return "去第"+page+"页";
          //  }
          //  //return 111;
          //}


        })

      }

    })

  }

  //点击按钮弹出添加商品模态框,渲染二级分类列表
  $('.btn-add').on('click',function(){

    $('#productModal').modal('show');

    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);

        $('.dropdown-menu').html( template('listTpl',info) )
      }

    })

  })

  //下拉列表选中功能
  $('.dropdown-menu').on('click','a',function(){

    var id = $(this).data('id');
    $('.dropdown-text').text( $(this).text() );
    $('#brandid').val(id);

    $form.data('bootstrapValidator').updateStatus('brandid','VALID');

  })

  //上传图片功能
  var arrPic = [];
  $('#fileupload').fileupload({

    dataType:'json',
    done:function(e,data){

      if(arrPic.length>=3){
        return false;
      }

      var picAddr = data.result.picAddr;


      $('.img_box').append('<img src="'+picAddr+'" alt="" width="100" height="100">');

      arrPic.push(data.result);
      console.log(arrPic);

      if(arrPic.length===3){
        $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }

    }

  })


  //表单校验
  var $form = $('#form');
  $form.bootstrapValidator({

    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{

      brandid:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品的名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品的描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品的库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入合法的库存'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品的尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入合法的尺码,例如(32-44)'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品的原价'
          },
          regexp:{
            regexp:/\d/,
            message:'请输入合法的价格'
          }

        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品的价格'
          },
          regexp:{
            regexp:/\d/,
            message:'请输入合法的价格'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传3张图片'
          }
        }
      },

    }

  })



  //表单校验后发送ajax请求添加数据


  $form.on('success.form.bv',function(e){
    var data = $form.serialize();
    data+="&picName1="+ arrPic[0].picName + "&picAddr1=" +arrPic[0].picAddr + "&picName2="+ arrPic[1].picName + "&picAddr2=" +arrPic[1].picAddr + "&picName3=" + arrPic[2].picName + "&picAddr3=" +arrPic[2].picAddr;
    e.preventDefault();
    console.log(data);
    $.ajax({

      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function(info){
        if(info.success){
          $('#productModal').modal('hide');
          currentPage  = 1;
          render();
          $form.data("bootstrapValidator").resetForm(true)
          $('.dropdown-text').text('请选择二级分类');
          $('.img_box img').remove();
          arrPic = [];

        }
      }


    })

  })


})