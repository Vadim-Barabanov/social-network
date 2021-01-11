import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import FriendsStyle from "./FriendsStyle.module.css";
import { FriendType } from "../../../types/types";

type PropsType = {
    friendsList: Array<FriendType>;
};

const Friends: FC<PropsType> = (props) => {
    let friends = props.friendsList.map((item) => {
        return (
            <NavLink
                key={item.id}
                className={FriendsStyle.friendNavLink}
                to={item.link}>
                <img
                    alt={item.name}
                    className={FriendsStyle.friendNavLink__img}
                    src={item.name}
                />
                {/* <div className={FriendsStyle.friendNavLink__name}> */}
                {/*     {item.name} */}
                {/* </div> */}
            </NavLink>
        );
    });

    return <div className={FriendsStyle.friendItem}>{friends}</div>;
};

export default Friends;
