import React, { FC } from "react";
import s from "./Heading.module.css";
import { logout } from "../../redux/auth-reducer";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ForumIcon from "@material-ui/icons/Forum";
import { useHistory } from "react-router-dom";

type PropsType = {};

export const Heading: FC<PropsType> = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
    };

    const btnStyle = {
        marginRight: "15px",
    };

    return (
        <header className={s.heading}>
            <div className={s.headingBox}>
                <div className={s.navigation}>
                    <Button
                        onClick={() => {
                            history.push({ pathname: "/profile" });
                        }}
                        style={btnStyle}
                        endIcon={<PersonIcon />}>
                        Profile
                    </Button>
                    <Button
                        endIcon={<ChatIcon />}
                        style={btnStyle}
                        onClick={() => {
                            history.push({ pathname: "/dialogs" });
                        }}>
                        Messages
                    </Button>
                    <Button
                        endIcon={<ForumIcon />}
                        style={btnStyle}
                        onClick={() => {
                            history.push({ pathname: "/chat" });
                        }}>
                        Chat
                    </Button>
                    <Button
                        endIcon={<SearchIcon />}
                        style={btnStyle}
                        onClick={() => {
                            history.push({ pathname: "/users" });
                        }}>
                        Search
                    </Button>
                </div>
                <div className={s.account}>
                    <Button
                        color="secondary"
                        onClick={handleLogout}
                        endIcon={<ExitToAppIcon />}>
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
};
