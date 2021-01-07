import React, { FC } from "react";
import Navigation from "./Navigation/Navigation";
import Friends from "./Friends/Friends";
// import Friends from "./Friends/Friends";
import SidebarStyles from "./Sidebar.module.css";
import { FriendType } from "../../types/types";

type PropsType = {
    friendsList: Array<FriendType>;
};

const Sidebar: FC<PropsType> = (props) => {
    return (
        <div className={SidebarStyles.wrapper}>
            <Navigation />
            <Friends friendsList={props.friendsList} />
        </div>
    );
};

export default Sidebar;
