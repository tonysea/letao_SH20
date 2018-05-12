$(function(){
  
    var currentPage=1;
    var pageSize=2;
    
    render();
    function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      success:function(info){
        console.log(info);
        var productStr=template('productTpl',info);
        $('tbody').html(productStr);
        
        //分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          size: "normal",
          // itemTexts 可以控制按钮文本
          // 一旦配置了 itemTexts, 每个按钮都会去调用这个 itemTexts
          // 会将这个方法的返回值, 作为按钮的文本
          // type 用于标记按钮的功能类型, page 普通页码, first prev next last
          // page 指的是按钮点击后跳转到那一页
          // current 表示当前页
          
          itemTexts:function(type,page,current){
            switch(type){
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'page':
                return page;
            }
            // 设置了 tooltipTitles提示文本用法同上
          },
          //为按钮绑定点击事件 page:当前点击的按钮值
          onPageClicked:function(event, originalEvent, type,page){
                currentPage=page;
                render();
          }
        });
      }
     })
    }
    //显示模态框
    $('#addBtn').click(function(){
      $("#addModal").modal('show');
    })
  
  //添加二级分类
  $.ajax({
    url:'/category/querySecondCategoryPaging',
    type:'get',
    data:{
      page:1,
      pageSize:100,
    },
    success:function(info){
      console.log(info);
      var cateStr = template('cateTpl',info);
      $('.dropdown-menu').html(cateStr);
      
      $('.dropdown-menu').on('click','.lis',function(){
        
        var id= $(this).data('id');
        console.log(id);
        //
        $('.brandId').val(id);
        console.log($(this).text());
        $(".dropdown-text").text($(this).text());
        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
      })
    }
  })
  
  //上传图片
  var picAdd=[];
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，data.result
    //上传图片是一张一张的
    done:function (e, data) {
      console.log(data);
      //将图片信息添加到数组中
      picAdd.unshift(data.result);
      console.log(picAdd)
      $('#imgUrl').val(picAdd[0].picAddr)
      $('#form').data('bootstrapValidator').updateStatus('imgUrl','VALID')
      //动态添加图片
      $('#imgBox').prepend('<img src="'+picAdd[0].picAddr+'" width="100" alt="">')
      //限制3张
      if(picAdd.length > 3){
        picAdd.pop();
        $('#imgBox img:last-of-type').remove();
      }
      
      
    }
    
  });
  
  
  
  //表单验证
   $('#form').bootstrapValidator({
     //设定不校验的表单类型为空
     excluded:[],
     //图标
     feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',
       invalid: 'glyphicon glyphicon-remove',
       validating: 'glyphicon glyphicon-refresh'
     },
     fields:{
       brandId:{
         validators:{
             notEmpty:{
               message:'请选择二级分类'
             }
           }
       },
       proName:{
         validators:{
             notEmpty:{
               message:'请输入产品名称'
             }
           }
       },
       proDesc:{
         validators:{
           notEmpty:{
             message:'请输入产品描述'
           }
         }
       },
       num:{
         validators:{
           notEmpty:{
             message:'请输入产品库存'
           },
           regexp: {
             regexp: /^[1-9]\d*$/,
             message: '非0数字开头'
           }
           
         }
       },
       size:{
         validators:{
           notEmpty:{
             message:'请输入产品尺寸'
           },
           regexp: {
             regexp:/^\d{2}-\d{2}$/,
             message: '尺码实例35-42'
           }
         }
       },
       oldPrice:{
         validators:{
           notEmpty:{
             message:'请输入产品原价'
           }
         }
       },
       price:{
         validators:{
           notEmpty:{
             message:'请输入产品现价'
           }
         }
       },
       imgUrl:{
         validators:{
           notEmpty:{
             message:'请添加三张图片'
           }
         }
       },
     }
   })
  

  
  
  $('#form').on('success.form.bv',function(e){
  
  
    console.log($('#form').serialize());
    var dataStr=$('#form').serialize();
    dataStr+='&'+'picName1='+picAdd[0].picName+''+'&'+'picAttr1='+picAdd[0].picAddr+'';
    dataStr+='&'+'picName1='+picAdd[1].picName+''+'&'+'picAttr1='+picAdd[1].picAddr+'';
    dataStr+='&'+'picName1='+picAdd[2].picName+''+'&'+'picAttr1='+picAdd[2].picAddr+'';

    
    console.log(dataStr);
    
    e.preventDefault();
   
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:dataStr,
      success:function(info){
        console.log(info);
        //添加成功
        if(info.success){
          //隐藏模态框
          $('#addModal').modal('hide');
           //重置表单
           $('#form').data("bootstrapValidator").resetForm(true);
          //手动重置项
          $('.dropdown-text').text('请选择分类');
          $('#imgBox').html('');
          //刷新
          currentPage=1;
          render();
        }
      }
    })
    
  })
  
  
 
})