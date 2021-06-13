import React from 'react';
import ReactECharts from 'echarts-for-react';

export const DynamicChart: React.FC = function (props) {
    const option = {
        title: {
            text: '专注度检测',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [
            {
                type: 'category',
                data: props.data.x
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '专注度',
                max: 1.5,
                min: -1.5,
            }
        ],
        series: [
            {
                name: '韩宇栋',
                type: 'line',
                data: props.data.y
            }
        ]
    }

    return <ReactECharts
        option={option}
        style={{height: 400}}
    />;
}

export default DynamicChart;