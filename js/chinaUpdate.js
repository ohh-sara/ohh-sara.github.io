/**
 * 
 */
$(function(){
	var latestDate='';
	var index=0;
	$.ajax({
		url: "chinaServlet",
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

	var yesterdayDate=month+'.'+lastDate;
	
	//格式化日期：yyyy-MM-dd
	function formatDate(myyear,mymonth,myweekday) {
	    
	    if (mymonth < 10) {
	        mymonth = "0" + mymonth;
	    }
	    if (myweekday < 10) {
	        myweekday = "0" + myweekday;
	    }
	    return (myyear + "-" + mymonth + "-" + myweekday);
	}
	
	var yesterdayDate2=formatDate(year,month,lastDate);
	
	alert("昨天日期："+yesterdayDate+";最近的时间为："+latestDate+";最近的索引为："+index);
	if(latestDate!=yesterdayDate){
		//倒数第一天数据
		
		var apiDate='';
		var confirmedNum=0;
	    var suspectedNum=0;
	    var curesNum=0;
	    var deathsNum=0;
	    var suspectedIncr=0;
	    
	    //倒数第二天数据
	    var confirmedNum2=0;
	    var suspectedNum2=0;
	    var curesNum2=0;
	    var deathsNum2=0;
	    
	    //新增数据
	    var confirmedIncr=0;
	    var curedIncr=0;
	    var deathIncr=0;
		
		$.ajax({
			url: "http://www.tianqiapi.com/api",
			type: "get",
			async: false,
			data: {
				'version':'epidemic',
				'appid':'46373757',
				'appsecret':'qSQLB95b' 
			},
			headers:{
	  		  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36",
	  		  "cookie": "SUB=_2A25zIBZpDeRhGeFO6FMW9SfPyzuIHXVQ6rohrDV6PUJbkdANLXHkkW1NQWFV0jHTZVvVyxSWKh_OelBSLO_orKNL; SUHB=0xnCH-A3xu26JP; SCF=Arn_me20DU0XTfz_1jkP-uRWPPYJgb1OgAX2f0_R05yBKHW9-lXkx97C75qijx7_PFovPjL4AXm8Y8eT0i5wIfw.; _T_WM=60621208794; XSRF-TOKEN=fa2798; WEIBOCN_FROM=1110006030; MLOGIN=1; M_WEIBOCN_PARAMS=oid%3D4461015741317932%26lfid%3D102803%26luicode%3D20000174%26uicode%3D20000174"
	  	    },
	  	    crossDomain: true,
			dataType: 'json', 
			success:function(data){
				var history=data['data']['history'];
				//取倒数第一天的数据
				apiDate=history[0].date;
				confirmedNum=history[0].confirmedNum;
			    suspectedNum=history[0].suspectedNum;
			    curesNum=history[0].curesNum;
			    deathsNum=history[0].deathsNum;
			    suspectedIncr=history[0].suspectedIncr;
				 
			    //取倒数第二天的数据
			    confirmedNum2=history[1].confirmedNum;
			    suspectedNum2=history[1].suspectedNum;
			    curesNum2=history[1].curesNum;
			    deathsNum2=history[1].deathsNum;
			    
			    //计算新增数据
			    confirmedIncr=confirmedNum-confirmedNum2;
			    curedIncr=curesNum-curesNum2;
			    deathIncr=deathsNum-deathsNum2;
				
			},
			error:function(error){
				console.log(error)
			} 
		});
		var index2=index+1;
		
		//更新条件：数据库最近的日期不等于昨天的日期，且返回接口的数据是昨天的数据
		
		if(apiDate==yesterdayDate2){
			window.location.href='chinaUpdate?index='+index2.toString()+'&date='+yesterdayDate+'&confirmedNum='+confirmedNum.toString()+'&confirmedIncr='+confirmedIncr.toString()+'&curedNum='+curesNum.toString()+'&curedIncr='+curedIncr.toString()+'&deadNum='+deathsNum.toString()+'&deadIncr='+deathIncr.toString()+'&suspectedNum='+suspectedNum.toString()+'&suspectedIncr='+suspectedIncr.toString();
		}else{
			alert("抱歉，接口数据还未更新，请稍后！")
		}
	}else{
		alert("亲，全国疫情数据已更新过了呢！");
	}
});