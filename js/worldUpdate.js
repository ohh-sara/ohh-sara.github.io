/**
 * 
 */
$(function(){
	var latestDate='';
	var index=0;
	$.ajax({
		url: "worldServlet",
		type: "post",
		async: false,
		success:function(data){
			
			for(var i=0;i<data.length;++i){
				latestDate=data[i].date;
				index=data[i].index;
			}
			
		},
		error:function(error){
			console.log(error)
		} 
	});
	
	
	var dt=new Date();
	var year=dt.getFullYear();
	var month=dt.getMonth()+1;
	var date=dt.getDate();
	
	function getLastMonthAndDay(){
	    var nowDate = new Date();
	    var year = nowDate.getFullYear();
	    var month = nowDate.getMonth();
	    if(month == 0){
	        month = 12;
	    }
	    var lastDay = new Date(year,month,0);
	    
	    return lastDay.getDate();
	}
	var lastDate='';
	var lastMonth='';
	if(date=='1'){
		lastDate=getLastMonthAndDay();
	}else{
		lastDate=date-1;
	}

	if(month=='1'){
		lastMonth='12';
	}else{
		lastMonth=month-1;
	}
	
	if(date=='1'){
		month=lastMonth;
	}

	//格式化日期：MM-dd
	function formatDate(mymonth,myweekday) {
	    
	    if (mymonth < 10) {
	        mymonth = "0" + mymonth;
	    }
	    if (myweekday < 10) {
	        myweekday = "0" + myweekday;
	    }
	    return (mymonth + "." + myweekday);
	}
	
	var yesterdayDate=formatDate(month,lastDate);
	
	alert("昨天日期："+yesterdayDate+";最近的时间为："+latestDate+";最近的索引为："+index);
	if(latestDate!=yesterdayDate){
		//倒数第一天数据
		
		var apiDate='';
		var certain=0;
	    var uncertain=0;
	    var die=0;
	    var recure=0;
	    var certain_inc=0;
	    var uncertain_inc=0;
	    var die_inc=0;
	    var recure_inc=0;
		
		$.ajax({
			type:"get",
	    	url:"https://interface.sina.cn/news/wap/fymap2020_data.d.json",
	    	dataType:"jsonp",
	    	async: false,
	    	headers:{
	    		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36",
	    		"cookie": "SUB=_2A25zIBZpDeRhGeFO6FMW9SfPyzuIHXVQ6rohrDV6PUJbkdANLXHkkW1NQWFV0jHTZVvVyxSWKh_OelBSLO_orKNL; SUHB=0xnCH-A3xu26JP; SCF=Arn_me20DU0XTfz_1jkP-uRWPPYJgb1OgAX2f0_R05yBKHW9-lXkx97C75qijx7_PFovPjL4AXm8Y8eT0i5wIfw.; _T_WM=60621208794; XSRF-TOKEN=fa2798; WEIBOCN_FROM=1110006030; MLOGIN=1; M_WEIBOCN_PARAMS=oid%3D4461015741317932%26lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174"
	    	},
	    	crossDomain: true,
			success:function(data){
				var history=data['data']['otherhistorylist'];
				//取倒数第一天的数据
				apiDate=history[0].date;
				certain=history[0].certain;
			    uncertain=history[0].uncertain;
			    recure=history[0].recure;
			    die=history[0].die;
			    certain_inc=history[0].certain_inc;
				uncertain_inc=history[0].uncertain_inc;
				die_inc=history[0].die_inc;
				recure_inc=history[0].recure_inc;
				
				var index2=index+1;
				
				//更新条件：数据库最近的日期不等于昨天的日期，且返回接口的数据是昨天的数据
				
				if(apiDate==yesterdayDate){
					window.location.href='worldUpdate?index='+index2.toString()+'&date='+yesterdayDate+'&confirmedNum='+certain.toString()+'&confirmedIncr='+certain_inc.toString()+'&curedNum='+recure.toString()+'&curedIncr='+recure_inc.toString()+'&deadNum='+die.toString()+'&deadIncr='+die_inc.toString()+'&suspectedNum='+uncertain.toString()+'&suspectedIncr='+uncertain_inc.toString();
				}else{
					alert("抱歉，接口数据还未更新，请稍后！")
				}
			},
			error:function(error){
				console.log(error)
			} 
		});
		
	}else{
		alert("亲，全球疫情数据已更新过了呢！");
	}
});