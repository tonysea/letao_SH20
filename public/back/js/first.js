$(function(){
  
  var currentpage;
 
  
  render();
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
         page:currentpage||1,
         pageSize:5
      },
      success:function(info){
        console.log(info);
        var firstStr = template('firstTpl',info);
        $('tbody').html(firstStr);
        
        
        $("#paginator").bootstrapPaginator({
          //3的版本使用ul
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentpage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
            render();
          }
          })
      }
    })
  }
  
  
//  模态框
  $('#addBtn').click(function(){
    $("#addModal").modal('show');
  })
  //表单验证
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入分类名称'
          }
        }
      }
    }
  })
  
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$("#form").serialize(),
        success:function(info){
          console.log(info);
          $("#addModal").modal('hide');
          if(info.success){
            currentpage=1;
            render();
          }
        }
      })
 
      $('#form').data("bootstrapValidator").resetForm( true );
 
  });
  
})