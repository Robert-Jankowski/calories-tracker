import React from 'react'
import {connect} from "react-redux";
import MainPage from "./UI/views/MainPage";
import LoginPage from "./UI/views/LoginPage";
import StatisticsPage from "./UI/views/StatisticsPage";
import AccountPage from "./UI/views/AccountPage";

const Router = ({isUserLogged}) => {
    return isUserLogged ?
        (
           <MainPage />
        ) :
        (
            <LoginPage />
        )
}

const mapStateToProps = (state) => {
    return {
        isUserLogged: state.userState.isLogged
    }
}
export default connect(mapStateToProps)(Router)