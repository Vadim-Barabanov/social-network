type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) => {
    if (value) return undefined;
    return "Field is required";
};

export const maxLenght = (max: number): ValidatorType => (value) => {
    if (value.length > max) return `The max length is ${max} symbols`;
    return undefined;
};
