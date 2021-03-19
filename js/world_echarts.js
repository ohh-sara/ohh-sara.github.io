/**
 * 
 */
$(function(){
	
	var dateArray=[]
	var confirmedCountArray=[]
	var confirmedIncrArray=[]
	var suspectedCountArray=[]
	var suspectedIncrArray=[]
	var curedCountArray=[]
	var curedIncrArray=[]
	var deadCountArray=[]
	var deadIncrArray=[]

	$.ajax({
		url: "worldServlet",
		type: "post",
		async: false,
		success:function(data){
			
			for(var i=0;i<data.length;++i){
				dateArray.push(data[i].date);  
				confirmedCountArray.push(data[i].confirmedCount);
				confirmedIncrArray.push(data[i].confirmedIncr);
				suspectedCountArray.push(data[i].suspectedCount);
				suspectedIncrArray.push(data[i].suspectedIncr);
				curedCountArray.push(data[i].curedCount);
				curedIncrArray.push(data[i].curedIncr);
				deadCountArray.push(data[i].deadCount);
				deadIncrArray.push(data[i].deadIncr);
				
			}
			
		},
		error:function(error){
			console.log(error)
		}
	})
	
	echarts_3();
	
	function echarts_3() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartDiv3'));

    option = {
    		
    	    tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#dddc6b'
                }
            }
        },
        legend: {
            top:'0%',
            data:['全球累计确诊','全球新增确诊','全球累计治愈','全球新增治愈','','全球累计死亡','全球新增死亡','全球现有疑似','全球新增疑似'],
                    textStyle: {
               color: 'white',
    			fontSize:'12',
            }
        },
        grid: {
            left: '10',
    		top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel:{color:'white'},   // y轴字体颜色
            axisLine:{
                lineStyle:{color:'white'}    // y轴坐标轴颜色
            },
            axisTick:{
                lineStyle:{color:'white'}    // y轴刻度的颜色
            },

            data: dateArray

        }, {

            axisPointer: {show: false},
            axisLine: {  show: false},
            position: 'bottom',
            offset: 20,

           

        }],

        yAxis: [{
            type: 'value',
            axisTick: {show: false},
            axisLabel:{color:'white'},   // y轴字体颜色
            axisLine:{
                lineStyle:{color:'white'}    // y轴坐标轴颜色
            },
            axisTick:{
                lineStyle:{color:'white'}    // y轴刻度的颜色
            },
            splitLine: {
                lineStyle: {
                     color: 'rgba(255,255,255,.1)'
                }
            }
        }],
        series: [
    		{
            name: '全球累计确诊',
            type: 'line',
             smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: confirmedCountArray

        }, 
        {
            name: '全球新增确诊',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: confirmedIncrArray

        }, 
        {
            name: '全球累计治愈',
            type: 'line',
             smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: curedCountArray

        }, 
        {
            name: '全球新增治愈',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: curedIncrArray

        }, 
        {
            name: '全球累计死亡',
            type: 'line',
             smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: deadCountArray

        }, 
        {
            name: '全球新增死亡',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: deadIncrArray

        }, 
        {
            name: '全球现有疑似',
            type: 'line',
             smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: suspectedCountArray

        }, 
        {
            name: '全球新增疑似',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            data: suspectedIncrArray

        }
    		 ]

    };
  
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
	
});