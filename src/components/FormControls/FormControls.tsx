import React, { FC } from "react";
import styles from "./FormControls.module.css";

export const FormCreator = (Tag: any) => {
    const fnc: FC<any> = ({ input, meta: { touched, error }, ...props }) => {
        const hasError = touched && error;
        return (
            <div
                className={
                    styles.formControl + " " + (hasError ? styles.error : "")
                }>
                <div>
                    <Tag {...input} {...props} />
                </div>
                <div>{hasError && <span>{error}</span>}</div>
            </div>
        );
    };

    return fnc;
};
