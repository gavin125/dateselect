define(function(){
	// 获取当月份信息
	Date.prototype.monthdetail=function(){
		var that = this;
		var detail={
			daynum:31,  //当前月份有多少天，默认31天
			firstday:0, //当月1号是星期几
			year:that.getFullYear(),//当前年
			month:that.getMonth()+1,//当前月
			day:that.getDate(),   //当前日期
			yearmonth:function(){
				return this.year+"年"+this.month+"月"
			},
			y_m_d:function(){
				return this.year+"-"+(this.month>9?this.month:["0"+this.month])+"-"+(this.day>9?this.day:["0"+this.day])
			}
		};

		switch (detail.month){//4/6/9/11月份为30天
			case 4:;case 6:;case 9:;case 11:
				detail.daynum=30;
				break;
			case 2://闰年规则（4和400的倍数，且不是100的倍数）
				if(detail.year%4==0 && detail.year%100!=0){detail.daynum=29;}else{detail.daynum=28;};
				if(detail.year%400==0){detail.daynum=29;};
				break;
		}
		var thatone=that;
		thatone.setDate(1);
		detail.firstday=thatone.getDay();
		return detail;	
		}
		
	return Date;
})



