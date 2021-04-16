import React from 'react';
import {required} from "./../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth_reducer";
import {Redirect} from "react-router-dom";
import s from './Login.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {createField, Input} from "../common/inputsForms";

const LoginFormik = ({handleSubmit, error}) => {
    return (
        <div>
            <h1> Login </h1>

            <Formik
                initialValues={{login: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.login) {
                        errors.login = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.login = 'Invalid login';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>
                        {createField("Email", "email", [required], Input )}
                        {createField("Password", "password", [required], Input, {type: "password"} )}
                        {createField(null, "remember", [], Input, {type: "checkbox"}, "remember me" )}
                        <div>
                            <Field placeholder={"Email"} name={"email"}
                                   validate={[required]}
                                   component="input" /*{Input}*/ />
                            <ErrorMessage name="Email" component="div"/>
                        </div>
                        <div>
                            <Field placeholder={"Password"} name={"Password"} type={"Password"}
                                   validate={[required]}
                                   component="input" /*{Input}*/ />
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <div>
                            <Field component="input" /*{Input}*/ name={"remember"} type={"checkbox"}/> remember me
                            <ErrorMessage name="remember" component="div"/>
                        </div>
                        {error && <div className={s.formSummaryError}>
                            {error}
                        </div>
                        }
                        <div>
                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

/*const LoginReduxForm = reactFormix({form: 'login'}) (LoginFormik)*/

/*const Login = (props) => {
    const onSubmit = (formixData) => {
        props.login(formixData.email, formixData.password, formixData.remember);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);*/

export default LoginFormik;
