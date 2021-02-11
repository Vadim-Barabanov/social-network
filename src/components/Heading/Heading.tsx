import React, { FC } from 'react';
import { logout } from '../../redux/auth-reducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Material
import Switch from '@material-ui/core/Switch';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
// Icons
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ForumIcon from '@material-ui/icons/Forum';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        zIndex: 1100,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'center',
        gridArea: 'heading',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1280px',
        height: '70px',
    },
    links: {
        width: '500px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

type PropsType = {
    toggleTheme: () => void;
    theme: boolean;
};

export const Heading: FC<PropsType> = ({ toggleTheme, theme }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
    };

    const btnStyle = {
        marginRight: '15px',
    };

    return (
        <div className={classes.root}>
            <Box className={classes.navbar}>
                <Box className={classes.links}>
                    <Button
                        onClick={() => {
                            history.push({ pathname: '/profile' });
                        }}
                        style={btnStyle}
                        endIcon={<PersonIcon />}>
                        Profile
                    </Button>
                    <Button
                        endIcon={<ChatIcon />}
                        style={btnStyle}
                        onClick={() => {
                            history.push({ pathname: '/dialogs' });
                        }}>
                        Messages
                    </Button>
                    <Button
                        endIcon={<ForumIcon />}
                        style={btnStyle}
                        onClick={() => {
                            history.push({ pathname: '/chat' });
                        }}>
                        Chat
                    </Button>
                    <Button
                        endIcon={<SearchIcon />}
                        style={btnStyle}
                        onClick={() => {
                            history.push({ pathname: '/users' });
                        }}>
                        Search
                    </Button>
                </Box>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <WbSunnyIcon />
                    <Switch checked={!theme} onChange={toggleTheme} />
                    <Brightness3Icon />
                    <Button
                        color="secondary"
                        style={{ marginLeft: '2rem' }}
                        onClick={handleLogout}
                        endIcon={<ExitToAppIcon />}>
                        Logout
                    </Button>
                </div>
            </Box>
        </div>
    );
};
