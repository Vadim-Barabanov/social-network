import React from "react";
import styles from "./FormControls.module.css";

export const FormCreator = (Tag) => ({
    input,
    meta: { touched, error },
    ...props
}) => {
    const hasError = touched && error;
    return (
        <div
            className={
                styles.formControl + " " + (hasError ? styles.error : "")
            }
        >
            <div>
                <Tag {...input} {...props} />
            </div>
            <div>{hasError && <span>{error}</span>}</div>
        </div>
    );
};
