import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { FriendType } from "../../types/types";

type MapStatePropsType = {
    friendsList: Array<FriendType>;
};

let mapStateToProps = (state: AppStateType) => {
    return {
        friendsList: state.sidebar.friendsList,
    };
};

const SidebarContainer = connect<
    MapStatePropsType,
    unknown,
    unknown,
    AppStateType
>(mapStateToProps)(Sidebar);
export default SidebarContainer;
