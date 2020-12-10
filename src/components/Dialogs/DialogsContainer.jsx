import Dialogs from "./Dialogs";
import { addMessage } from "./../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    };
};

export default compose(
    connect(mapStateToProps, {
        addMessage,
    }),
    withAuthRedirect
)(Dialogs);
