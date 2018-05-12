$(function(){
  
   render();
   var currentpage;
   var pageSize;
   function render(){
     console.log(currentpage);
  
     $.ajax({
       url:"/user/queryUser",
       type:'get',
       data:{
         page: currentpage|| 1 ,
         pageSize: 5 ,
       },
       success:function(info){
         // console.log(info);
         
         var userStr = template('userTpl',info);
         $('.table tbody').html(userStr);
         
         //分页插件
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
           
           
           
         });
  
  
         //   模态框
         $('tbody').on('click','button',function(){
           // console.log(1);
           $('#logoutModal').modal('show');
           var id = $(this).parent().data('id');
           console.log(id);
           
           // isDelete取反btn-danger本为1
           var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
           
           $('#confirm').off().click(function(){
               $.ajax({
                 url:'/user/updateUser',
                 type:'post',
                 data:{
                   id:id,
                   isDelete:isDelete
                 },
                 success:function(info){
                   console.log(info);
                   if(info.success){
                     
                     $('#logoutModal').modal('hide');
                   render();
                   
                   }
                 }
               })
             
           })
         })
         
       }
       
     })
   }
   

  
})