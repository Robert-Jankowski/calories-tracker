// REACT, REDUX
import React from 'react'

// Formik
import {Formik} from "formik"

// Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const LoginForm = ({login}) => {

        return(
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={(values) => {
                    login(values.username, values.password)
                }}>
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            name="username"
                            value={props.values.username}
                            onChange={props.handleChange}
                            size="small"/>
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={props.values.password}
                            onChange={props.handleChange}
                            size="small"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="medium"
                        >Login</Button>
                    </form>
                )}
            </Formik>
        )

}
export default LoginForm