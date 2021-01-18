import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import defaultImg from "../../assets/images/userMale.png";
import { actions, getFriends } from "../../redux/friends-reducer";
import { AppStateType } from "../../redux/redux-store";
import s from "./FriendsStyle.module.css";

type PropsType = {};

export const Friends: FC<PropsType> = () => {
    const users = useSelector(
        (state: AppStateType) => state.friendsPage.friends
    );
    const filter = useSelector(
        (state: AppStateType) => state.friendsPage.filter
    );

    actions.setFilter({ term: "", friend: true });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends(filter));
    }, []);

    let friends = users.map((item) => {
        return (
            <NavLink className={s.friendNavLink} to={`/profile/${item.id}`}>
                <div key={item.id} className={s.friendItem}>
                    <img
                        alt={"error"}
                        className={s.friendNavLink__img}
                        src={item.photos.small ? item.photos.small : defaultImg}
                    />
                    <div>
                        <div className={s.friendName}>{item.name}</div>
                        <div className={s.friendStatus}>{item.status}</div>
                    </div>
                </div>
            </NavLink>
        );
    });

    return <div className={s.friendWrapper}>{friends}</div>;
};
