import "./App.css";
import { Route } from "react-router-dom";
import Heading from "./components/Heading/Heading";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

function App() {
    return (
        <div className="app-wrapper">
            <Heading />
            <SidebarContainer />
            <div className="app-wrapper-content">
                <Route path="/profile" render={() => <Profile />} />
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
            </div>
        </div>
    );
}

export default App;
