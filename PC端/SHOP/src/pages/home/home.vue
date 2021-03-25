<template>
  <div>
    <!-- 1.容器 -->
    <div id="container" style="width: 800px;height:400px;margin:20px auto;"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
export default {
 mounted(){
    var Highcharts = require('highcharts');

    // 在 Highcharts 加载之后加载功能模块
    require('highcharts/modules/exporting')(Highcharts);
     // 图表配置
        var options = {
            chart: {
                type: 'bar'                          //指定图表的类型，默认是折线图（line）
            },
            title: {
                text: '我的第一个图表'                 // 标题
            },
            xAxis: {
                categories: ['苹果', '香蕉', '橙子']   // x 轴分类
            },
            yAxis: {
                title: {
                    text: '吃水果个数'                // y 轴标题
                }
            },
            series: [{                              // 数据列
                name: '小明',                        // 数据列名
                data: [1, 0, 4]                     // 数据
            }, {
                name: '小红',
                data: [5, 7, 3]
            }]
        };
        // 图表初始化函数
        var chart = Highcharts.chart('container', options);
  }
}

</script>

<style>

</style>