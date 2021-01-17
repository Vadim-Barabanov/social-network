import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import Preloader from "../common/preloader/Preloader";
import s from "./Login.module.css";

type PropsType = {
    isAuth: boolean;
    isFetching: boolean;
    captchaUrl: string | null;
    login: (
        email: string,
        password: string,
        rememberMe: boolean,
        captchaUrl: string | null
    ) => void;
};

type FormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

const validation = (values: any) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    }

    return errors;
};

const Login: FC<PropsType> = (props) => {
    const submit = (values: any, { setSubmitting }: any) => {
        console.log(values);
        const { email, password, rememberMe, captcha } = values;
        props.login(email, password, rememberMe, captcha);
        setSubmitting(false);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />;
    } else if (props.isFetching) {
        return <Preloader />;
    }

    return (
        <div>
            <Formik
                initialValues={{ email: "", password: "", rememberMe: false }}
                validate={validation}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form className={s.loginForm}>
                        <Field
                            type="text"
                            name="email"
                            placeholder="Email"
                            className={s.inputText}
                        />
                        <ErrorMessage name="email" component="div" />
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={s.inputText}
                        />
                        <ErrorMessage name="password" component="div" />
                        <h4>Remeber me: </h4>
                        <Field
                            type="checkbox"
                            name="rememberMe"
                            className={s.inputCheckbox}
                        />
                        <ErrorMessage name="rememberMe" component="div" />

                        {props.captchaUrl ? (
                            <>
                                <img
                                    src={props.captchaUrl}
                                    alt="captcha loading..."
                                />
                                <Field
                                    type="text"
                                    name="captcha"
                                    className={s.inputText}
                                    placeholder={"captcha symbols"}
                                />
                            </>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={s.submitBtn}>
                            Sign in
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
