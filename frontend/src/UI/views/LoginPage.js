import React from 'react'
import {connect} from "react-redux";
import operations from "../../state/ducks/user/operations"
import LoginForm from "../LoginPage/LoginForm";

const LoginPage = ({login, register}) => {

    return(
        <section>
            <LoginForm login={login}/>
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
        register: (username, password) => {
            dispatch(operations.register(username, password))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)