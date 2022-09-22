import React, {useRef,useEffect} from 'react'
// 引入Echarts 
import * as echarts from 'echarts'

export default function InitEcharts() {
    const container = useRef()
    var options = {
        // 图表标题及相关配置
        title: {
            text: '第一个echarts实例',
            x: 'center',
            y: 'bottom',
            backgroundColor: 'pink',
            padding: 5,
            textStyle: {
                fontSize: 18,
                fontWeight: 'bolder',
                color: 'orange'
            }
        },
        // 图例
        legend: {
            orient: 'horizontal',  
            x: 'center',
            y: 'top',
            backgroundColor: 'rgba(255,0,0,0.2)'
        },
        // x轴数据
        xAxis: {
            type: 'category',
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        // y轴数据
        yAxis: {
            type: 'value'
        },
        // **系列列表**
        series: {
            name: '销量',  // 系列名称
            type: 'bar',  // 系列图表类型
            data: [5, 20, 36, 10, 10, 20],  // 系列中的数据内容
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    }
    useEffect(() => {
        // 初始化echarts实例
        var myChart = echarts.init(container.current)

        // 指定图表的配置项和数据
        myChart.setOption(options)

        // 组件卸载的时候销毁echarts实例
        return () => {
             // myChart.dispose() 销毁实例。实例销毁后无法再被使用
            myChart.dispose()
        }
    },[])
    return (
        <>
            <div style={{width:"600px",height:"600px"}} ref={container}></div>
        </>
    )
}
