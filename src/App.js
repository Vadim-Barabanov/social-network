import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
// Importing components
import Preloader from "./components/common/preloader/Preloader";
import HeadingContainer from "./components/Heading/HeadingContainer";
import LoginContainer from "./components/Login/LoginContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import UsersContainer from "./components/Users/UsersContainer";
// Lazy loading components
const DialogsContainer = React.lazy(() =>
    import("./components/Dialogs/DialogsContainer")
);
//import News from "./components/News/News";
//import Music from "./components/Music/Music";
//import Settings from "./components/Settings/Settings";
//import FollowingContainer from "./components/Following/FollowingContainer";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) return <Preloader />;

        return (
            <div className="app-wrapper">
                <HeadingContainer />
                <SidebarContainer />
                <div className="app-wrapper-content">
                    <Route path="/login" render={() => <LoginContainer />} />
                    <Route
                        path="/profile/:userId?"
                        render={() => <ProfileContainer />}
                    />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route
                        path="/dialogs"
                        render={() => {
                            return (
                                <React.Suspense fallback={<Preloader />}>
                                    <DialogsContainer />
                                </React.Suspense>
                            );
                        }}
                    />
                    {/*<Route path="/news" render={() => <News />} />
                    <Route path="/music" render={() => <Music />} />
                    <Route path="/settings" render={() => <Settings />} />
                    <Route
                        path="/following"
                        render={() => <FollowingContainer />}
                />*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

const AppMain = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default AppMain;
