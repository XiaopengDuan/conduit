import echarts from "echarts";
export function minecharts(index,date2,date3) {
    let e1 = echarts.init(document.getElementById("echarts" + index));
    let option = {
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0
        },
        xAxis: {
            boundaryGap: false,
            axisLine: {
                show: false,
            },
            axisLabel: {
                color: '#ffff'
            },
            axisTick: {
                show: false
            },
            data: date2,//date.month||['01','02','03','04','05','06','07','08','09','10','11','12']
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [{
            data: date3,//date.power||data,
            type: 'line',
            label: {
                show: false
            },
            itemStyle: {
                show: false,
                borderWidth: 0,
                opacity: 0
            },
            lineStyle: {
                color: '#00C3EF',
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#00B8E4' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#012747', // 100% 处的颜色
                    }]
                },
                opacity: 0.4
            },
        }]
    };
    e1.setOption(option);
}
export function maxecharts(index,date2,date3) {
    // console.log(date3)
    echarts.init(index).setOption({
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        xAxis: {
            boundaryGap: false,
            axisLine: {
                show: false,
            },
            axisLabel: {
                color: '#ffff'
            },
            axisTick: {
                show: false
            },
            data: date2
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        series: [{
            data: date3,
            type: 'line',
            label: {
                show: false
            },
            itemStyle: {
                show: false,
                borderWidth: 0,
                opacity: 0
            },
            lineStyle: {
                color: '#00C3EF',
            },
            areaStyle: {
                color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#00B8E4' // 0% 处的颜色
                }, {
                    offset: 1, color: '#012747', // 100% 处的颜色
                }]
                },
                opacity: 0.4
            },
        }]
    });  
}
    