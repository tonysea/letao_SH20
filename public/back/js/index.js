$(function(){
	var pieChart = echarts.init(document.getElementById('con_pie'));
	var option = {
			title:{
				text:'热门品牌销售',
				subtext:'2017年6月',
				x:'center',//x轴的对齐方式
				//标题显示与否align
	            //文字基本设置
	            textStyle:{
	            	fontSize:20,
	                fontWeight:'bold',
	                fontFamily:'宋体'
	                // align:'left'
	            }
			},
			// 提示信息
			tooltip:{},
			// 图例
			legend:{

				orient:'vertical',
				left:'left',
				data:['耐克','阿迪','新百伦','李宁','阿迪王']
			},
			series: [{
				// 上侧小图标  点击可以控制显示消失
				name:'销量',
		        data: [  {value:335,name:'耐克'        },
	                    {value:310, name:'阿迪'},
	                    {value:234, name:'新百伦'},
	                    {value:135, name:'李宁'},
	                    {value:1548, name:'阿迪王'}],
		      // 图表显示的类型折饼图
		        type: 'pie'
		    }]
		};

        pieChart.setOption(option);

        var barChart = echarts.init(document.getElementById('con_bar'));

		  option = {
		    title:{
				text:"2017年注册人数",
				// x:'center',//x轴的对齐方式
				// y:'center'
	            // show:false//标题显示与否
			},
		    xAxis: {
		        type: 'category',
		        data: ['1月', '2月', '3月','4月','5月','6月', ]
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		        data: [1000, 1500, 1800, 1200,1000, 1100],
		        type: 'bar'
		    }]
         };
         barChart.setOption(option);


})
