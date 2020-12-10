import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import LoginContainer from "./components/Login/LoginContainer";
import HeadingContainer from "./components/Heading/HeadingContainer";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
//import News from "./components/News/News";
//import Music from "./components/Music/Music";
//import Settings from "./components/Settings/Settings";
//import FollowingContainer from "./components/Following/FollowingContainer";
import { initializeApp } from "./redux/app-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Preloader from "./components/common/preloader/Preloader";

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
                        render={() => <DialogsContainer />}
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

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);
