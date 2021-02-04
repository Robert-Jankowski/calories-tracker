import React from "react"
import {connect} from "react-redux";
import selectors from "../../state/ducks/meals/selectors";

import FilterForm from "../StatisticsPage/FilterForm";
import Doughnut from "../StatisticsPage/Doughnut";
import LineChart from "../StatisticsPage/LineChart";

const StatisticsPage = ({sumAll, dailyStatistics}) => {
    return(
        <main>
            <LineChart dailyStatistics={dailyStatistics}/>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        sumAll: selectors.sumAll(state),
        dailyStatistics: selectors.dailyStatistics(state)
    }
}

export default connect(mapStateToProps)(StatisticsPage)