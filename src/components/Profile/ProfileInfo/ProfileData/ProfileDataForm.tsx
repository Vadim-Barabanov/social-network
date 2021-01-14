import React, { FC } from "react";
import { Field, reduxForm } from "redux-form";
import { FormCreator } from "../../../FormControls/FormControls";
import styles from "../ProfileInfo.module.css";

const Input = FormCreator("input");
const Textarea = FormCreator("textarea");

const ProfileDataForm: FC<any> = ({ handleSubmit, profile, error }) => {
    return (
        <form className={styles.userDescription} onSubmit={handleSubmit}>
            {error && <div>{error}</div>}
            <p>
                <b>Full name:</b>
                <Field
                    component={Input}
                    placeholder={"New name"}
                    name={"fullName"}
                />
            </p>
            <p>
                <b>About me:</b>
                <Field
                    component={Input}
                    placeholder={"New text"}
                    name={"aboutMe"}
                />
            </p>
            <p>
                <b>Looking for a job: </b>
                <Field
                    component={Input}
                    type="checkbox"
                    name={"lookingForAJob"}
                />
            </p>
            <p>
                <b>My skills: </b>
                <Field
                    component={Textarea}
                    name={"lookingForAJobDescription"}
                    placeholder={"New description"}
                />
            </p>
            <p>
                <b>Contacts:</b>
                {Object.keys(profile.contacts!).map((key) => {
                    return (
                        <div key={key}>
                            {/* <b>{key}: </b> */}
                            <Field
                                component={Input}
                                placeholder={`https://${key}.com`}
                                name={`contacts.${key}`}
                            />
                        </div>
                    );
                })}
            </p>
            <button>Save</button>
        </form>
    );
};

const ProfileDataReduxForm = reduxForm({
    form: "profileData",
})(ProfileDataForm);

export default ProfileDataReduxForm;
