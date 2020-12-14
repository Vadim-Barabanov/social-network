import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormCreator } from "../FormControls/FormControls";
import { required, maxLenght } from "../../utilits/validators";
import { Redirect } from "react-router-dom";
import styles from "../FormControls/FormControls.module.css";
import Preloader from "../common/preloader/Preloader";

const maxLenghtForLogin = maxLenght(30);
const maxLenghtForPass = maxLenght(30);
const Input = FormCreator("input");

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    component={Input}
                    name={"login"}
                    placeholder={"Email"}
                    validate={[required, maxLenghtForLogin]}
                />
            </div>
            <div>
                <Field
                    component={Input}
                    name={"password"}
                    placeholder={"Password"}
                    type={"password"}
                    validate={[required, maxLenghtForPass]}
                />
            </div>
            <div>
                <Field
                    component={"input"}
                    name={"rememberMe"}
                    type={"checkbox"}
                />{" "}
                Remember me
            </div>
            {error ? <div className={styles.formError}>{error}</div> : null}
            <div>
                <button
                    style={{
                        fontSize: "1.2rem",
                        padding: "10px",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                >
                    Sign up
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
    const onSubmit = (data) => {
        props.login(data.login, data.password, data.rememberMe);
    };

    if (props.isAuth) return <Redirect to={"/profile"} />;

    return (
        <>
            <h1>Login page</h1>
            <LoginReduxForm onSubmit={onSubmit} />
            {props.isFetching ? <Preloader /> : null}
        </>
    );
};

export default Login;
