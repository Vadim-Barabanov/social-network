import React, { FC } from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';

type CustomTextFieldPropsType = {
    variant?: 'filled' | 'outlined';
    multiline?: boolean;
    placeholder?: string;
    type?: string;
    style?: Object;
    label?: string;
};

export const CustomTextField: FC<FieldAttributes<CustomTextFieldPropsType>> = ({
    variant,
    color,
    label,
    multiline,
    type,
    placeholder,
    style,
    ...props
}) => {
    const [field, meta] = useField<CustomTextFieldPropsType>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            {...field}
            style={style}
            label={label}
            type={type}
            variant={variant}
            multiline={multiline}
            placeholder={placeholder}
            helperText={errorText}
            error={!!errorText}
        />
    );
};

type CustomCheckboxPropsType = {
    variant?: string;
    label?: string;
    style?: Object;
};

export const CustomCheckbox: FC<FieldAttributes<CustomCheckboxPropsType>> = ({
    variant,
    style,
    label,
    ...props
}) => {
    const [field] = useField<CustomCheckboxPropsType>(props);
    return (
        <FormControlLabel
            {...field}
            style={style}
            label={label}
            control={<Checkbox />}
        />
    );
};
