import { Button, Select } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/selectors/users-selectores';
import { FilterType } from '../../redux/users-reducer';
import { CustomTextField } from '../common/Forms/Forms';

const usersSearchFormValidate = () => {
    const errors = {};
    return errors;
};

type FriendFormType = 'true' | 'false' | 'null';
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
                values.friend === 'null'
                    ? null
                    : values.friend === 'true'
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
                    <Form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <div>
                            <CustomTextField
                                placeholder="User name..."
                                name="term"
                            />

                            <Field name="friend" as={Select}>
                                <option value="null">All</option>
                                <option value="true">Only followed</option>
                                <option value="false">Only unfollowed</option>
                            </Field>
                        </div>

                        <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            style={{ margin: '20px 0 12px 0' }}>
                            Find
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});

export default UsersSearchForm;
