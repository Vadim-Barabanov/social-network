import {
    Box,
    Container,
    createMuiTheme,
    CssBaseline,
    ThemeProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import { Heading } from './components/Heading/Heading';
import { Login } from './components/Login/Login';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersPage from './components/Users/UsersPage';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';
import { dark, light } from './themes/default';
// Lazy loading components
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
    },
    header: {
        display: 'grid',
        gridTemplateColumns: '1fr 900px 1fr',
        gridTemplateRows: '100px 1fr',
        gridTemplateAreas: `
                    'heading heading heading'
                    '. cont .'`,
    },
}));

type PropsType = {
    theme: boolean;
    toggleTheme: () => void;
};

const App: FC<PropsType> = ({ theme, toggleTheme }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    const initialized = useSelector(
        (state: AppStateType) => state.app.initialized
    );
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    return (
        <>
            {initialized ? (
                <>
                    <Box className={classes.header}>
                        {isAuth ? (
                            <Heading theme={theme} toggleTheme={toggleTheme} />
                        ) : null}
                    </Box>
                    <Container maxWidth="md" className={classes.root}>
                        <Box style={{ gridArea: 'cont' }}>
                            <RouteSwitcherWR />
                        </Box>
                    </Container>
                </>
            ) : (
                <Preloader />
            )}
        </>
    );
};

const RouteSwitcher = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile" />} />
            <Route path="/login" render={() => <Login />} />
            <Route
                path="/profile/:userId?"
                //@ts-ignore
                render={() => <ProfileContainer />}
            />
            <Route path="/users" render={() => <UsersPage />} />
            <Route
                path="/chat"
                render={() => (
                    <React.Suspense fallback={<Preloader />}>
                        <ChatPage />
                    </React.Suspense>
                )}
            />
            <Route
                path="/dialogs"
                render={() => {
                    return (
                        <React.Suspense fallback={<Preloader />}>
                            <Dialogs />
                        </React.Suspense>
                    );
                }}
            />
            {/* <Route path="*" render={() => <div>404 NOT FOUND</div>} /> */}
        </Switch>
    );
};

const RouteSwitcherWR = withRouter(RouteSwitcher);

const AppMain = () => {
    //  localStorage for saving theme between page reloading
    const toggler = localStorage.getItem('Theme');
    const [theme, setTheme] = useState(toggler === 'dark' ? false : true);

    const appliedTheme = createMuiTheme(theme ? light : dark);

    const toggleTheme = () => {
        localStorage.setItem('Theme', theme ? 'dark' : 'light');
        setTheme(!theme);
    };

    return (
        <ThemeProvider theme={appliedTheme}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                {/*<HashRouter></HashRouter> for GitHub pages (without basename)*/}
                <Provider store={store}>
                    <CssBaseline />
                    <App toggleTheme={toggleTheme} theme={theme} />
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default AppMain;
