//    (1) 如果没有登陆, 不需要下面的操作了, 直接拦截到登录页面即可
//    (2) 如果当前用户登录, 啥都不用干, 让用户继续访问即可
//    (3) 我们需要将不需要用户登录的页面 (登录页, 进行排除)
if(location.href.indexOf('login.html') === -1){
	$.ajax({
		type:'get',
		url:"/employee/checkRootLogin",
		success:function(info){
              // console.log(info);
              if(info.error === 400){
              	location.href='login.html';
              }
		}
	})
}


// 禁用进度条圆圈
NProgress.configure({ showSpinner: false });
// ajaxStart  第一个ajax开始发送的时候调用
//  ajaxStop   最后一个ajax结束时调用
$(document).ajaxStart(function(){
	NProgress.start();
	// console.log(1);
});
$(document).ajaxStop(function(){
	// console.log(2);
	setTimeout(function(){
		NProgress.done();
	},500)
})






$(function(){
	// 二级菜单的切换
	$('.list').click(function(){
		$('.options').stop().slideToggle();
	})



	//侧边栏隐藏
	$('.menu').click(function(){
		// alert(2);
		// 让侧边栏过度(定位之为0)
		$('.aside').toggleClass('hiddenAside');
         
         // 给主体部分过度取消padding-left值
		$('.main').toggleClass('hiddenAside');
		$('.main-top').toggleClass('hiddenAside');

	})

	$('.out').click(function(){
		// alert(2)
		$('#logoutModal').modal('show');
	})

	$('#logoutBtn').click(function(){
		$.ajax({
			type:'get',
			url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
            	console.log(info);
                if(info.success){
                	location.href='login.html';
                }
            }
		})
	})


})
