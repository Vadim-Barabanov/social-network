import React from "react";
import styles from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status,
    };

    componentDidUpdate(prevProps /*, prevState*/) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (elem) => {
        this.setState({
            status: elem.currentTarget.value,
        });
    };

    render() {
        return (
            <>
                {this.state.editMode ? (
                    <div className={styles.status}>
                        <input
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            onChange={this.onStatusChange}
                            value={this.state.status}
                        />
                    </div>
                ) : (
                    <div className={styles.status}>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || "No status"}
                        </span>
                    </div>
                )}
            </>
        );
    }
}

export default ProfileStatus;
