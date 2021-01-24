import React from 'react'
import LineChart from "../StatisticsPage/LineChart";
import Doughnut from "../StatisticsPage/Doughnut";
import Statistics from "../StatisticsPage/Statistics";

const StatisticsPage = () => {
    return(
        <main>
            <LineChart />
            <Doughnut />
            <Statistics />
        </main>
    )
}
export default StatisticsPage