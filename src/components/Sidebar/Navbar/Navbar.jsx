import React from "react";
import { NavLink } from "react-router-dom";
import NavbarStyle from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={NavbarStyle.wrapper}>
            <nav className={NavbarStyle.navbar}>
                <div className={NavbarStyle.item}>
                    <NavLink to="/profile" activeClassName={NavbarStyle.active}>
                        Profile
                    </NavLink>
                </div>
                <div className={NavbarStyle.item}>
                    <NavLink to="/dialogs" activeClassName={NavbarStyle.active}>
                        Messages
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
                <div className={NavbarStyle.item}>
                    <NavLink to="/users" activeClassName={NavbarStyle.active}>
                        Users
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};
export default Navbar;
