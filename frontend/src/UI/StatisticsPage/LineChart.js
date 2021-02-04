import React from 'react'
import { Line } from "react-chartjs-2"

const LineChart = ({dailyStatistics}) => {
    console.log({dailyStatistics})
    const data = {
        labels: dailyStatistics.map(day => day.id),
        datasets: [
            {data: dailyStatistics.map(day => day.carbs),
            label: 'carbs',
            borderColor: '#ff0000',
            fill: false},
            {data: dailyStatistics.map(day => day.proteins),
            label: 'protein',
            borderColor: '#0000ff',
            fill: false},
            {data: dailyStatistics.map(day => day.fats),
            label: 'fats',
            borderColor: '#ffff00',
            fill: false},
            ]
    }

    return(
        <section>
            <Line data={data} width={600} height={300}/>
        </section>
    )
}
export default LineChart