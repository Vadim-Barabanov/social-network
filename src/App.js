import "./App.css";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
    return (
        <div className="app-wrapper">
            <Heading />
            <Navbar />
            <Profile />
        </div>
    );
}

export default App;
