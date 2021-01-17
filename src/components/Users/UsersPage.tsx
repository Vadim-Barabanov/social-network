import React, { FC } from "react";
import { useSelector } from "react-redux";
import Preloader from "../common/preloader/Preloader";
import { Users } from "./Users";
import { getIsFetching } from "../../redux/selectors/users-selectores";

type PropsType = {};

export const UsersPage: FC<PropsType> = () => {
    const isFetching = useSelector(getIsFetching);

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    );
};
