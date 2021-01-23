import React, { FC } from "react";
import { Formik, Form } from "formik";
import s from "../ProfileInfo.module.css";
import Preloader from "../../../common/preloader/Preloader";
import { CustomTextField, CustomCheckbox } from "../../../common/Forms/Forms";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

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
                        <CustomTextField name="fullName" />

                        <CustomCheckbox
                            name="lookingForAJob"
                            label="Looking for a job?"
                        />

                        <h4 className={s.inputHeader}>About me:</h4>
                        <CustomTextField
                            variant="outlined"
                            name="aboutMe"
                            multiline
                        />

                        <h4 className={s.inputHeader}>My skills:</h4>
                        <CustomTextField
                            name="lookingForAJobDescription"
                            variant="outlined"
                            multiline
                        />
                    </div>

                    <div className={s.contactsBox}>
                        <h4>Contacts:</h4>

                        {Object.keys(profile.contacts!).map((key) => {
                            return (
                                <div key={key}>
                                    <CustomTextField
                                        style={{ marginBottom: "10px" }}
                                        name={`contacts.${key}`}
                                        placeholder={`https://${key}.com`}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {isSubmitting ? <Preloader /> : null}
                    <Button
                        size="small"
                        variant="contained"
                        type="submit"
                        endIcon={<SaveIcon />}
                        style={{ justifySelf: "center", marginTop: "15px" }}
                        disabled={isSubmitting}>
                        Save
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        style={{ justifySelf: "center", marginTop: "15px" }}
                        disabled={isSubmitting}
                        endIcon={<CloseIcon />}
                        onClick={() => setEditMode(false)}>
                        Discard
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
