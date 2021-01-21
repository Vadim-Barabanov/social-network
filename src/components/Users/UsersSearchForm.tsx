import React, { FC, memo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/selectors/users-selectores";

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
};

type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string;
    friend: FriendFormType;
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

    const filter = useSelector(getUsersFilter);

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend) as FriendFormType,
                }}
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
