$(function(){
	$('#form').bootstrapValidator({

		// 表单验证
		fields:{
			username:{
				validators:{
					notEmpty:{
						message:'用户名不能为空'
					},
					stringLength:{
						min:2,
						max:6,
						message:'用户名长度必须在2到6位之间'
					}
				}
			},
			password:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					stringLength:{
						min:6,
						max:12,
						message:"密码长度必须在6到12位之间"
					}
				}
			}
		}
	})
})