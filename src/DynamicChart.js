import React from 'react';
import ReactECharts from 'echarts-for-react';
import { themeName } from './mydarkmode';

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
                },
                smooth:true,
                markLine: {
                    silent: true,
                    lineStyle: {
                        color: '#b00020'
                    },
                    data: [{
                        yAxis: props.baseline
                    }],
                    label: {
                        show:false
                    },
                },
            }
        ]
    }

    return <ReactECharts
        option={option}
        style={{height: 350}}
        theme={props.theme === "dark" ? themeName : "light"}
    />;
}

export default DynamicChart;