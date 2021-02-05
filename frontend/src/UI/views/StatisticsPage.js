// REACT, REDUX
import React from "react"
import {connect} from "react-redux";

// SELECTORS, ACTIONS, OPERATIONS
import selectors from "../../state/ducks/meals/selectors";

// COMPONENTS
import DoughnutChart from "../StatisticsPage/DoughnutChart";
import LineChart from "../StatisticsPage/LineChart";

const StatisticsPage = ({sumAll, dailyStatistics}) => {

    return(
        <main style={{
            backgroundColor: "white",
            border: "solid 2px #a6a6a6",
            marginTop: 20,
            marginBottom: 20,
            width: "765px"}}>
            <LineChart dailyStatistics={dailyStatistics}/>
            <div>
            <DoughnutChart sumAll={sumAll} />
            </div>
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