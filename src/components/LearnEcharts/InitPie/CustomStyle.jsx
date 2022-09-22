import React,{useRef,useEffect} from 'react'
import * as echarts from 'echarts'

export default function CustomStyle() {
    let customRef = useRef()
    let options = {
        title: {
            text: '自定义样式的饼状图',
            x: 'center',
            y: 'bottom',

            // 标题字体的样式
            textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        },
        legend: {
            itemStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            // 设置文本为红色
            textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
            }
        },
        // 分段型视觉映射组件
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
        },
        series: [{
            type: 'pie',
            data: [
                {value:235, name:'视频广告'},
                {value:274, name:'联盟广告'},
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
            ],
            label: {
                show: true,
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            },
            
            // 配置 roseType 显示成南丁格尔图
            roseType: 'radius',
            radius: '55%'
        }]
    }
    useEffect(() => {
        let customCharts = echarts.init(customRef.current)

        customCharts.setOption(options)

        return () => {
            customCharts.dispose()
        }
    },[])
    return (
        <>
         <div style={{width: '500px',height: '500px',backgroundColor: '#2c343c'}} ref={customRef}></div>
        </>
    )
}
