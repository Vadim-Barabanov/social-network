import axios from "axios";
import { ResultCodes } from "../types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "f9e15d90-7a73-411f-99c9-ccec43cdec06",
    },
});

export type APIResponseType<T = {}, C = ResultCodes> = {
    data: T;
    messages: Array<string>;
    resultCode: C;
};

export type GetItemsType<T> = {
    items: Array<T>;
    totalCount: number;
    error: string | null;
};
