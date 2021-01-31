import React from 'react'
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const RegisterForm = ({register}) => {

    return(
        <Formik
            initialValues={{username: "", password: ""}}
            onSubmit={(values) => {
                register(values.username, values.password)
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
                        style={{color:"white"}}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="medium"
                    >Register</Button>
                </form>
            )}
        </Formik>
    )
}

export default RegisterForm