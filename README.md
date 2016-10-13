# dateselect
 自定义日历选择器封装对象dateSelect
 
  <h4>配置参数如下</h4>
  curTime为当前系统时间，默认调取当月日历，并标注当前日期
  position为日历选择器相对触发元素的位置
  offset为触发元素的位置
  target为 触发元素
  
<pre>
 dateSelect({
		//curTime:{y:2016,m:09,d:05},//2016-09-01
		position:"bottom",//top,bottom,left,right
		offset:{
			t:e.target.offsetTop,
			l:e.target.offsetLeft,
			b:e.target.offsetTop+e.target.offsetHeight,
			r:e.target.offsetLeft+e.target.offsetWidth
		},
		target:$(this)
	})
  </pre>
 
