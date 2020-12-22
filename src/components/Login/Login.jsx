import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormCreator } from "../FormControls/FormControls";
import { required, maxLenght } from "../../utilits/validators";
import { Redirect } from "react-router-dom";
import styles from "../FormControls/FormControls.module.css";
import style from "./Login.module.css";
import Preloader from "../common/preloader/Preloader";

const maxLenghtForLogin = maxLenght(30);
const maxLenghtForPass = maxLenght(30);
const Input = FormCreator("input");

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form className={style.formWrapper} onSubmit={handleSubmit}>
            <Field
                component={Input}
                name={"login"}
                placeholder={"Email"}
                validate={[required, maxLenghtForLogin]}
            />
            <Field
                component={Input}
                name={"password"}
                placeholder={"Password"}
                type={"password"}
                validate={[required, maxLenghtForPass]}
            />
            <div>
                <Field
                    component={"input"}
                    name={"rememberMe"}
                    type={"checkbox"}
                />{" "}
                Remember me
            </div>
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && (
                <Field
                    component={Input}
                    name={"captcha"}
                    validate={[required]}
                />
            )}
            {error ? <div className={styles.formError}>{error}</div> : null}
            <button className={style.submitBtn}>Sign in</button>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
    const onSubmit = (data) => {
        props.login(data.login, data.password, data.rememberMe, data.captcha);
    };

    if (props.isAuth) return <Redirect to={"/profile"} />;

    return (
        <div className={style.loginWrapper}>
            <h1 className={style.loginHeaderText}>Sign in</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
            {props.isFetching ? <Preloader /> : null}
        </div>
    );
};

export default Login;
