import React, { FC, memo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FilterType } from "../../redux/users-reducer";

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
};

type FormType = {
    term: string;
    friend: "true" | "false" | "null";
};

type PropsType = {
    onFilterChange: (filter: FilterType) => void;
};

const UsersSearchForm: FC<PropsType> = memo((props) => {
    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            term: values.term,
            friend:
                values.friend === "null"
                    ? null
                    : values.friend === "true"
                    ? true
                    : false,
        };

        props.onFilterChange(filter);
        setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={{ term: "", friend: "null" }}
                validate={usersSearchFormValidate}
                onSubmit={submit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <ErrorMessage name="term" component="div" />

                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});

export default UsersSearchForm;
