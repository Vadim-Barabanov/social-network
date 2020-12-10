import React from "react";
import styles from "./FormControls.module.css";

export const FormCreator = (Tag) => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div
            className={
                styles.formControl + " " + (hasError ? styles.error : "")
            }
        >
            <div>
                <Tag {...input} {...props} />
            </div>
            <div>{hasError && <span>{meta.error}</span>}</div>
        </div>
    );
};
