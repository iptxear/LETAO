/**
 * Created by Geekzs on 2018/1/11.
 */

//==========canvas 表格饼图==========


$(function(){

  var myChart_left = echarts.init(document.querySelector(".chart_left"));

  var data = [
    {name: "1月", num: 333},
    {name: "2月", num: 200},
    {name: "3月", num: 300},
    {name: "4月", num: 200},
    {name: "5月", num: 100},
    {name: "6月", num: 500},
  ];

  var arrName = data.map(function(e){
    return e.name;
  })
  var arrNum = data.map(function(e){
    return e.num;
  })

  var option1 = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: arrName
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: arrNum
    }]
  };

// 使用刚指定的配置项和数据显示图表。
  myChart_left.setOption(option1);


  var myChart_right = echarts.init(document.querySelector(".chart_right"));

  option2 = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: "right"
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '迪卡侬', '阿迪王']
    },
    series : [
      {
        name: '销售情况',
        type: 'pie',
        radius: '55%',

        data:[
          {value:235, name:'耐克'},
          {value:274, name:'阿迪'},
          {value:310, name:'新百伦'},
          {value: 135, name: '迪卡侬'},
          {value: 1548, name: '阿迪王'}
        ]
      }
    ]
  };
  myChart_right.setOption(option2);

})
