import React from 'react'
import {connect} from "react-redux";
import operations from "../../state/ducks/user/operations"
import LoginForm from "../LoginPage/LoginForm";

const LoginPage = ({login}) => {

    return(
        <section>
            <LoginForm />
        </section>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => {
            dispatch(operations.login(username, password))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)