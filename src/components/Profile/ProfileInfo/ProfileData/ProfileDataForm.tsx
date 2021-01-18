import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "../ProfileInfo.module.css";
import Preloader from "../../../common/preloader/Preloader";

export const ProfileDataForm: FC<any> = ({
    profile,
    updateProfile,
    setEditMode,
}) => {
    const submit = (values: any, { setSubmitting }: any) => {
        updateProfile(values).then(() => {
            setEditMode(false);
            setSubmitting(false);
        });
    };

    const initialValues = {
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        contacts: { ...profile.contacts },
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submit}>
            {({ isSubmitting }) => (
                <Form className={s.userDataForm}>
                    <div>
                        <h4>Full name:</h4>
                        <Field
                            type="text"
                            name="fullName"
                            className={s.inputText}
                        />
                        <ErrorMessage name="fullName" component="div" />

                        <h4 className={s.inputHeader}>About me:</h4>
                        <Field
                            type="text"
                            component="textarea"
                            name="aboutMe"
                            className={s.inputTextarea}
                            style={{ height: "100px" }}
                        />
                        <ErrorMessage name="aboutMe" component="div" />

                        <h4 className={s.inputHeader}>Looking for a job?</h4>

                        <Field type="checkbox" name="lookingForAJob" />
                        <ErrorMessage name="lookingForAJob" component="div" />

                        <h4 className={s.inputHeader}>My skills:</h4>
                        <Field
                            type="text"
                            component="textarea"
                            name="lookingForAJobDescription"
                            className={s.inputTextarea}
                            style={{ height: "150px" }}
                        />
                        <ErrorMessage
                            name="lookingForAJobDescription"
                            component="div"
                        />
                    </div>

                    <div className={s.contactsBox}>
                        <h4>Contacts:</h4>

                        {Object.keys(profile.contacts!).map((key) => {
                            return (
                                <div key={key}>
                                    {/* <b>{key}: </b> */}
                                    <Field
                                        type="text"
                                        className={s.inputText}
                                        placeholder={`https://${key}.com`}
                                        name={`contacts.${key}`}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {isSubmitting ? <Preloader /> : null}
                    <button
                        className={s.submitBtn + " " + s.formBtn}
                        type="submit"
                        disabled={isSubmitting}>
                        <i className="fas fa-check"></i>
                    </button>
                    <button
                        className={s.exitBtn + " " + s.formBtn}
                        onClick={() => setEditMode(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </Form>
            )}
        </Formik>
    );
};
