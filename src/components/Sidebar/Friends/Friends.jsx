import { NavLink } from "react-router-dom";
import FriendsStyle from "./FriendsStyle.module.css";

const Friends = (props) => {
    let friends = props.friendsList.map((item) => {
        return (
            <NavLink className={FriendsStyle.friendNavLink} to={item.link}>
                <img
                    className={FriendsStyle.friendNavLink__img}
                    src={item.name}
                />
                <div className={FriendsStyle.friendNavLink__name}>
                    {item.name}
                </div>
            </NavLink>
        );
    });

    return <div className={FriendsStyle.friendItem}>{friends}</div>;
};

export default Friends;
