import React,{useRef,useEffect} from 'react'
import * as echarts from 'echarts'

export default function InitLine() {
    let lineRef = useRef()

    let options = {
        title: {
            text: '线形图'
        },
        // 图例
        legend: {
            data: ['line1', 'line2']
          },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
                formatter:'{value}元'
            }
        },
        // 配置提示信息
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        series: [
            {
                type: 'line',
                name: 'line1',
                data: [10,30,50,60,80,70,90],
                smooth: true, //曲线
                areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
                    color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                },
                markPoint: {
                    data:[
                        {type: 'max',name:'Max',itemStyle: {color: 'red',borderColor: 'orange',shadowBlur: 10,shadowColor: 'green'}},
                        {type: 'min',name: 'min'}
                    ]
                },
                markLine: {
                    data: [{
                        type: 'average',name: 'Avg'
                    }]
                }
            },
            {
                name: 'line2',
                type: 'line',
                data: [20, 32, 11, 34, 90, 30, 20],
                stack: 'Total',
                areaStyle: {}
              },
        ]
    }
    useEffect(() => {
        var lineChart = echarts.init(lineRef.current)

        // 指定图表的配置项和数据
        lineChart.setOption(options)

        return () => {
            lineChart.dispose()
        }
    },[])
    return (
        <>
            <div ref={lineRef} style={{width: '300px',height: '300px'}}></div>
        </>
    )
}
