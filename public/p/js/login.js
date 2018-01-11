/**
 * Created by Geekzs on 2018/1/11.
 */

//=============表单验证================
$(function(){

  //添加校验
  $("form").bootstrapValidator({
    //不同状态下的提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空！"
          },
          callback:{
            message:"用户名不存在！"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"用户密码不能为空！"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须为6-12位"
          },
          callback:{
            message:"密码错误！"
          }
        }
      }

    }


  })

  //ajax校验
  $("form").on("success.form.bv",function(e){

    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="index.html"
        };
        if(info.error==1000){
          console.log(0);
          $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
        };
        if(info.error==1001){
          console.log(1);
          $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
        };
      }

    })
  })

  //表单重置
  $("[type='reset']").on("click",function(){
    $("form").data("bootstrapValidator").resetForm();
  })


})