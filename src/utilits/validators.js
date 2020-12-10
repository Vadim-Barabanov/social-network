export const required = (value) => {
    if (value) return undefined;
    return "Field is required";
};

export const maxLenght = (max) => (value) => {
    if (value.length > max) return `The max length is ${max} symbols`;
    return undefined;
};
