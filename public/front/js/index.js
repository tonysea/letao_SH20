$(function(){
  //轮播图
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
  //区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false , //是否显示滚动条
    // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    // bounce: true //是否启用回弹 默认为true
  });
  
})