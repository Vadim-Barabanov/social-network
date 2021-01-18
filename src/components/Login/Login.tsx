import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import Preloader from "../common/preloader/Preloader";
import s from "./Login.module.css";

type PropsType = {};

type FormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

const validation = (values: FormValues) => {
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

export const Login: FC<PropsType> = () => {
    const captchaUrl = useSelector(
        (state: AppStateType) => state.auth.captchaUrl
    );
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const isFetching = useSelector(
        (state: AppStateType) => state.auth.isFetching
    );

    const dispatch = useDispatch();

    const submit = (values: any, { setSubmitting }: any) => {
        const { email, password, rememberMe, captcha } = values;
        dispatch(login(email, password, rememberMe, captcha));
        setSubmitting(false);
    };

    if (isAuth) {
        return <Redirect to={"/profile"} />;
    } else if (isFetching) {
        return <Preloader />;
    }

    return (
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

                    {captchaUrl ? (
                        <>
                            <img src={captchaUrl} alt="captcha loading..." />
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
    );
};
