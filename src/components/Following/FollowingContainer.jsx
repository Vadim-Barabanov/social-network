import React from "react";
import { connect } from "react-redux";
import Following from "./Following";

class FollowingContainer extends React.Component {
    componentDidMount() {}

    render() {
        return <Following />;
    }
}

// const mapStateToProps = (state) => {
//     return {};
// };

export default connect(null, {})(FollowingContainer);
