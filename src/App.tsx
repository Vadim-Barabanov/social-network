import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import "./App.css";
import {
    Route,
    withRouter,
    BrowserRouter,
    Switch,
    Redirect,
} from "react-router-dom";
import store from "./redux/redux-store";
import { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
// Importing components
import Preloader from "./components/common/preloader/Preloader";
import { Heading } from "./components/Heading/Heading";
import { Login } from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { UsersPage } from "./components/Users/UsersPage";
// Lazy loading components
const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"));

type StatePropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

class App extends React.Component<StatePropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        console.error(promiseRejectionEvent);
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener(
            "unhandledrejection",
            this.catchAllUnhandledErrors
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "unhandledrejection",
            this.catchAllUnhandledErrors
        );
    }

    render() {
        if (!this.props.initialized) return <Preloader />;

        return (
            <div className="app-wrapper">
                <Heading />
                <Sidebar />
                <div className="app-wrapper-content">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/profile" />}
                        />
                        <Route path="/login" render={() => <Login />} />
                        <Route
                            path="/profile/:userId?"
                            render={() => <ProfileContainer />}
                        />
                        <Route path="/users" render={() => <UsersPage />} />
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
                        <Route
                            path="*"
                            render={() => <div>404 NOT FOUND</div>}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

const AppMain = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            {/*<HashRouter></HashRouter> for GitHub pages (without basename)*/}
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default AppMain;
