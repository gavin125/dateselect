define(["jquery","Date_extend"],function($,Date){
	var dateSelect=function(config){

		//默认配置参数
		this.config={
			curTime:null,//2016-09
			//position:"top"//top,bottom,left,right
		};

		// 默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
		}
		
		// DOM结构
		this.body=$("body");
		this.body.find(".dateBox").remove();//先移除其他日期选择器，保持唯一
		this.dateBox=$('<div class="dateBox"></div>');
		this.dBox_head=$('<div class="dBox_head"></div>');
		this.dBox_body=$('<div class="dBox_body"></div>');
		this.dBox_foot=$('<div class="dBox_foot"></div>');

		this.creatDom();
		this.isblur=false;
		this.boxevent=true;
	}

	dateSelect.prototype={
		constructor:dateSelect,
		creatDom:function(){//创建日期选择器DOM
			var that =this;
			that.body.append(that.dateBox)
			that.dateBox.append(that.dBox_head).append(that.dBox_body).append(that.dBox_foot);
			that.dBox_head.html('<span class="prevBtn"><i class="shape"></i></span><input class="month" type="text" value=""><span class="nextBtn"><i class="shape"></i></span>');
			that.dBox_body.html('<dl><dt>日</dt><dt>一</dt><dt>二</dt><dt>三</dt><dt>四</dt><dt>五</dt><dt>六</dt></dl>');

			// 根据配置设置
			that.tempdate=new Date();
			if(that.config.curTime==null){//默认
				that.redrawMonth(new Date());
			}else{//设置时间
				that.tempdate.setFullYear(that.config.curTime.y);
				that.tempdate.setMonth(that.config.curTime.m-1);
				that.tempdate.setDate(that.config.curTime.d);
				that.redrawMonth(that.tempdate)
			}
			switch(that.config.position){
				case "top":
				that.dateBox.css({top:that.config.offset.t-that.height,left:that.config.offset.l})
				break;
				case "bottom":
				that.dateBox.css({top:that.config.offset.b,left:that.config.offset.l})
				break;
				case "right":
				that.dateBox.css({top:that.config.offset.t,left:that.config.offset.r})
				break;
				case "left":
				that.dateBox.css({top:that.config.offset.t,left:that.config.offset.l-that.width})
				break;
			}
			$(".prevBtn").on("click",function(){that.prevMonth();})
			$(".nextBtn").on("click",function(){that.nextMonth();})

			//隐藏日期选择器的规则，当点击选择器或选择器对应的input时阻止冒泡，否则任何点击window上的点击均关闭选择框
			that.dateBox.on("click",function(){event.stopPropagation()})
			that.config.target.on("click",function(){event.stopPropagation()})
			$(window).on("click",function(e){that.closeBox();});

		},
		redrawMonth:function(d){//重绘选择器的月份信息
			var that =this;
			that.month_obj=d.monthdetail();
			// 添加当前月份标题
			that.dBox_head.find("input.month").val(that.month_obj.yearmonth())
			// 添加当前月份日历
			that.dl=that.dBox_body.find("dl");
			that.dl.find("dd").remove()
			for(var m=0; m<that.month_obj.firstday;m++){
				that.dl.append($('<dd>'))
			}
			for(var n=0; n<that.month_obj.daynum;n++){
				var dd=$('<dd>');
				dd.addClass("day").text(n+1).on("click",function(){
					$(this).addClass("select").siblings().removeClass("select");
					that.tempdate.setDate($(this).text())
					that.config.target.val(that.tempdate.monthdetail().y_m_d());
					that.boxevent=false;
					that.closeBox();
				});
				if(n+1==that.month_obj.day){dd.addClass("current")}
				that.dl.append(dd)
			}
			that.width=that.dateBox.width();
			that.height=that.dateBox.height();
		},
		prevMonth:function(){//重绘上一个月份
			var that =this;
			that.tempdate.setMonth(that.tempdate.getMonth()-1);
			that.redrawMonth(that.tempdate)
		},
		nextMonth:function(){//重绘下一个月份
			var that =this;
			that.tempdate.setMonth(that.tempdate.getMonth()+1);
			that.redrawMonth(that.tempdate)
		},
		closeBox:function(){//移除日期选择器
			var that =this;
			that.dateBox.remove();
			
		}
	}
	return dateSelect;
})