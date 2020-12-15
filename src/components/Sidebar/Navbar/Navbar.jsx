import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={style.wrapper}>
            <nav className={style.navbar}>
                <div className={style.item}>
                    <NavLink to="/profile" activeClassName={style.active}>
                        <i class="fas fa-user-circle"></i>
                        <span className={style.link__text}>Profile</span>
                    </NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/dialogs" activeClassName={style.active}>
                        <i class="fas fa-envelope"></i>
                        <span className={style.link__text}>Messages</span>
                    </NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to="/users" activeClassName={style.active}>
                        <i class="fas fa-users"></i>
                        <span className={style.link__text}>Users</span>
                    </NavLink>
                </div>
                {/* <div className={NavbarStyle.item}>
                    <NavLink
                        to="/following"
                        activeClassName={NavbarStyle.active}
                    >
                        Following
                    </NavLink>
                </div>
                                <div className={NavbarStyle.item}>
                    <NavLink to="/news" activeClassName={NavbarStyle.active}>
                        News
                    </NavLink>
                </div>
                <div className={NavbarStyle.item}>
                    <NavLink to="/music" activeClassName={NavbarStyle.active}>
                        Music
                    </NavLink>
                </div>
                <div className={NavbarStyle.item}>
                    <NavLink
                        to="/settings"
                        activeClassName={NavbarStyle.active}
                    >
                        Settigns
                    </NavLink>
                </div> */}
            </nav>
        </div>
    );
};
export default Navbar;
