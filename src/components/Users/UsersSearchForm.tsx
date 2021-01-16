import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FilterType } from "../../redux/users-reducer";

const usersSearchFormValidate = () => {
    const errors = {};

    return errors;
};

type UsersSearchFormType = {};

type PropsType = {
    onFilterChange: (filter: FilterType) => void;
};

const UsersSearchForm: FC<PropsType> = (props) => {
    const submit = (
        values: FilterType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        props.onFilterChange(values);
        setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={{ term: "" }}
                validate={usersSearchFormValidate}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="term" name="term" />

                        <ErrorMessage name="term" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UsersSearchForm;
