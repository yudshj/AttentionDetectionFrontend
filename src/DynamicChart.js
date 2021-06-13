import React from 'react';
import ReactECharts from 'echarts-for-react';

export const DynamicChart: React.FC = function (props) {
    const option = {
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
                name: props.name,
                type: 'line',
                data: props.data.y,
                lineStyle: {
                    color: props.color,
                },
                itemStyle: {
                    color: props.color
                }
            }
        ]
    }

    return <ReactECharts
        option={option}
        style={{height: 350}}
    />;
}

export default DynamicChart;