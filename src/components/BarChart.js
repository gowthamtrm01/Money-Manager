import React from 'react';
import Plot from 'react-plotly.js'

function BarChart(props) {
    const config = {
        showLink: false,
        displayModeBar: true,
        displaylogo: false
    }
    return (
        <Plot
            data={[
                {
                    x: props.xAxis,
                    y: props.yAxis,
                    type: 'bar'
                }
            ]}
            layout={
                {
                    width: 1100,
                    height: 600,
                    title: props.title,
                    xaxis: {
                        title: 'Timeline'
                    },
                    yaxis: {
                        title: 'Cost'
                    }
                }
            }
            config={config}
        />
    )
}

export default BarChart;