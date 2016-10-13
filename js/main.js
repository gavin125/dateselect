require.config({
	paths:{
		"jquery":["jquery-1.7.2.min"]
	}
})

require(["jquery","dateSelect"],function($,dateSelect){
	
	$("input").focus(function(e){
		var dbox=new dateSelect({
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
		
		
	})
	
	
})


