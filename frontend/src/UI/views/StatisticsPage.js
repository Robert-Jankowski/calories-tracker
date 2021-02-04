import React from "react"
import {connect} from "react-redux";
import selectors from "../../state/ducks/meals/selectors";
import DoughnutChart from "../StatisticsPage/DoughnutChart";
import LineChart from "../StatisticsPage/LineChart";
import Button from '@material-ui/core/Button';

const StatisticsPage = ({sumAll, dailyStatistics}) => {

    return(
        <main style={{
            backgroundColor: "white",
            border: "solid 2px #a6a6a6"}}>
            <LineChart dailyStatistics={dailyStatistics}/>
            <div>
            <DoughnutChart sumAll={sumAll} />
            <Button variant="contained" color="primary" style={{margin: 10}}>
                BACK
            </Button>
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