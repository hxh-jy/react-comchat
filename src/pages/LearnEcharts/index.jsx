import React from 'react'
// import InitEcharts from '../../components/LearnEcharts/InitBar'
// import InitLine from '../../components/LearnEcharts/initLine'
// import InitPie from '../../components/LearnEcharts/InitPie'
// import CustomStyle from '../../components/LearnEcharts/InitPie/CustomStyle'

import InitScatter from '../../components/LearnEcharts/InitScatter'
export default function learnEcharts() {
    return (
        <>
            {/* 折线图的基本使用 */}
            {/* <InitLine /> */}

            {/* 柱状图的基本使用 */}
            {/* <InitEcharts /> */}

            {/* 饼状图的基本使用 */}
            {/* <InitPie /> */}

            {/* 自定义样式的饼图 */}
            {/* <CustomStyle/> */}

            {/* 散点图的基本使用 */}
            <InitScatter />
        </>
    )
}
