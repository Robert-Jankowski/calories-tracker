// REACT, REDUX
import React, {useState} from 'react'
import {connect} from "react-redux";

// SELECTORS, ACTIONS, OPERATIONS
import operations from "../../state/ducks/user/operations"

// COMPONENTS
import LoginForm from "../LoginPage/LoginForm";
import RegisterForm from "../LoginPage/RegisterForm";

// Material-UI
import Switch from '@material-ui/core/Switch';


const LoginPage = ({login, register}) => {

    const [switchState, setSwitchState] = useState(false)

    const RegisterSwitch = () => {
        return(
            <div>
            <Switch checked={switchState} onChange={() => {
                if(switchState)
                    setSwitchState(false)
                else
                    setSwitchState(true)
            }} name="checkedA"/>
            <h1 style={{fontWeight: "bold"}}>{switchState ? "LOGIN": "REGISTER"}</h1>
            </div>
        )
    }

    const RenderBySwitch = () => {
        return switchState ? (
            <RegisterForm register={register}/>
        ) : (
            <LoginForm login={login}/>
        )
    }

    return(
        <main>
            <section style={{padding: 50, paddingTop: 100, paddingBottom: 100}}>
                <RenderBySwitch />
                <RegisterSwitch />
            </section>
        </main>
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