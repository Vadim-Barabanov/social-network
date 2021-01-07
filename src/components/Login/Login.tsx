import React, { FC } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { FormCreator } from "../FormControls/FormControls";
import { required, maxLenght } from "../../utilits/validators";
import { Redirect } from "react-router-dom";
import styles from "../FormControls/FormControls.module.css";
import style from "./Login.module.css";
import Preloader from "../common/preloader/Preloader";

const maxLenghtForLogin = maxLenght(30);
const maxLenghtForPass = maxLenght(30);
const Input = FormCreator("input");

type LoginFormOwnProps = {
    captchaUrl: string | null;
};

const LoginForm: FC<
    InjectedFormProps<LoginFormDataType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
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
            {captchaUrl && <img alt={"Captcha"} src={captchaUrl} />}
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

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnProps>({
    form: "login",
})(LoginForm);

type LoginFormDataType = {
    login: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

type PropsType = {
    login: (
        email: string,
        password: string,
        rememberMe: boolean,
        captcha: string
    ) => void;
    isAuth: boolean;
    isFetching: boolean;
    captchaUrl: string | null;
};

const Login: FC<PropsType> = (props) => {
    const onSubmit = (data: LoginFormDataType) => {
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
