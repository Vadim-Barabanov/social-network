import React, { FC } from "react";
import Navigation from "./Navigation/Navigation";
import s from "./Sidebar.module.css";

type PropsType = {};

export const Sidebar: FC<PropsType> = () => {
    return (
        <div className={s.wrapper}>
            <Navigation />
        </div>
    );
};
