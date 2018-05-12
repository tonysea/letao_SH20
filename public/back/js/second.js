$(function(){
  
  var currentpage;

  render();
  function render() {
     $.ajax({
       url:'/category/querySecondCategoryPaging',
       type:'get',
       data:{
         page:currentpage||1,
         pageSize:5
       },
       success:function(info){
         console.log(info);
         var secondStr=template('secondTpl',info);
         $('tbody').html(secondStr);
  
  
         //分页
         $("#paginator").bootstrapPaginator({
           
           bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
           currentPage:currentpage,//当前页
           totalPages:Math.ceil(info.total/info.size),//总页数
           size:"small",//设置控件的大小，mini, small, normal,large
           onPageClicked:function(event, originalEvent, type,page){
             //为按钮绑定点击事件 page:当前点击的按钮值
             currentpage=page;
             render();
           }
         })
       }
     })
  }
  
  $("#addBtn").click(function(){
    $("#addModal").modal('show');
  })
  
  $.ajax({
    url:'/category/queryTopCategoryPaging',
    type:'get',
    data:{
      page:1,
      pageSzie:100
    },
    success:function(info){
      console.log(info);
      var listStr=template('listTpl',info);
        $('.dropdown-menu').html(listStr);
      //获取id
     
  
    }
  })
  
  $('.dropdown-menu').on('click','.ulList',function(){
    var txt = $(this).text();
    $(".dropdown-text").text(txt);
    var id = $(this).data('id');
    // console.log(id);
    $('.categoryId').val(id);
    console.log($('.categoryId'));
    
    ////一级分类复制成功后更新状态为成功的
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  
  })
  
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var imgUrl=data.result.picAddr;
      $('#brandLogo').val(imgUrl);
      $('#imgBox img').attr('src',imgUrl);
      
      //上传成功后更新状态为成功的
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
    
    
  });
  
  
//  表单验证
  $('#form').bootstrapValidator({
    //默认不会对隐藏域进行校验,重置后可以
    excluded: [],
    
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请输入一级分类名称'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      }
    }
  })
  
  
  $('#form').on('success.form.bv',function(e){
    
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function(info){
        // console.log($('#form').serialize());
        if(info.success){
          console.log(info);
          currentpage=1;
          render();
          $('#form').data("bootstrapValidator").resetForm( true );
          //地址是在html里生效啊
          $('#imgBox img').attr('src','./images/hh.jpg')

          $("#addModal").modal('hide');
          $(".dropdown-text").text('请输入一级分类');
          
        }
        
      }
      
    })
  })
  
})