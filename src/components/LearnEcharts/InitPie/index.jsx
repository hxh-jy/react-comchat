import React,{useRef,useEffect} from 'react'
import * as echarts from 'echarts'

/**
 * 饼图主要是通过扇形的弧度表现不同类目的数据在总和中的占比
 * 它的数据格式比柱状图更简单，只有一维的数值，不需要给类目。
 * 因为不在直角坐标系上，所以也不需要 xAxis，yAxis。
 *  */ 
export default function InitPic() {
    let pieRef = useRef()
    let options = {
        title: {
            text: '基础饼状图',
            x: 'center',
            y: 'bottom',
        },
        radius: '55%',
        tooltip: {
            trigger: 'item'
        },
        legend: {},
        series: [
            {
                type: 'pie',
                data: [
                    {value:235, name:'视频广告'},
                    {value:274, name:'联盟广告'},
                    {value:310, name:'邮件营销'},
                    {value:335, name:'直接访问'},
                    {value:800, name:'搜索引擎'}
                ],
                // 饼图的半径  第一项是内半径 第二项是外半径
                radius: ['40%','70%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                label: {
                    show: false,
                    position: 'center'
                },
                // 高亮状态的扇区和标签样式。
                emphasis: {
                    disabled: false,  // 是否关闭高亮状态
                    scaleSize: 10,
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                }
            },
        ]
    }
    useEffect(() => {
        let pieCharts = echarts.init(pieRef.current)

        pieCharts.setOption(options)

        return () => {
            pieCharts.dispose()
        }
    },[])
    return (
        <>
            <div style={{width: '500px',height: '500px'}} ref={pieRef}></div>
        </>
    )
}
