import { instance } from "./api";
import { GetItemsType, ResponseType } from "./api";
import { UserType } from "../types/types";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<GetItemsType<UserType>>(
                `users?page=${currentPage}&count=${pageSize}`
            )
            .then((res) => res.data) as Promise<GetItemsType<UserType>>;
    },

    follow(userId: number) {
        return instance
            .post<ResponseType>(`follow/${userId}`, {})
            .then((res) => res.data) as Promise<ResponseType>;
    },

    unfollow(userId: number) {
        return instance
            .delete(`follow/${userId}`)
            .then((res) => res.data) as Promise<ResponseType>;
    },
};
