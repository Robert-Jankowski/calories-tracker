//REACT, REDUX
import React from 'react'

// Chart.js
import { Doughnut } from "react-chartjs-2"

const DoughnutChart = ({sumAll}) => {

    const data = {
        labels: ["carbs", "proteins", "fats"],
        datasets: [
            {
                label: "Sum of macros",
                data: [sumAll.carbs, sumAll.proteins, sumAll.fats],
                backgroundColor: ['#ff0000','#0000ff','#ffff00']
            }
        ],
        legend: {
            display: false
        }
    }

    return(
        <section>
            <Doughnut data={data}/>
        </section>
    )
}
export default DoughnutChart