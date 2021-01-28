import React from 'react'
import {Formik} from "formik"
const LoginForm = ({login}) => {

        return(
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={(values) => {
                    login(values.username, values.password)
                }}>
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={props.values.username}
                            onChange={props.handleChange}
                        />
                        <input
                            type="text"
                            name="password"
                            value={props.values.password}
                            onChange={props.handleChange}
                        />
                        <button type="submit">Login</button>
                    </form>
                )}
            </Formik>
        )

}
export default LoginForm