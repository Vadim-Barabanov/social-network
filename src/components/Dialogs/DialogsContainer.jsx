import Dialogs from "./Dialogs";
import {
    addMessageCreator,
    updateNewMessageTextCreator,
} from "./../../redux/dialogs-reducer";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            let action = addMessageCreator();
            dispatch(action);
        },
        updateNewMessageText: (text) => {
            let action = updateNewMessageTextCreator(text);
            dispatch(action);
        },
    };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
