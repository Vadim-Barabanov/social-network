import React, { useState, useEffect } from "react";
import styles from "../ProfileInfo.module.css";

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(props.status);

    useEffect(() => {
        setLocalStatus(props.status);
    }, [props.status]);

    const toggleEditMode = () => {
        if (!props.isOwner) return null;
        if (editMode) {
            setEditMode(false);
            props.updateStatus(localStatus);
        } else {
            setEditMode(true);
        }
    };

    const onStatusChange = (elem) => {
        setLocalStatus(elem.currentTarget.value);
    };

    return (
        <>
            {editMode ? (
                <div className={styles.status}>
                    <input
                        autoFocus={true}
                        onBlur={toggleEditMode}
                        value={localStatus}
                        onChange={onStatusChange}
                    />
                </div>
            ) : (
                <div className={styles.status}>
                    <span onDoubleClick={toggleEditMode}>
                        {props.status || "No status"}
                    </span>
                </div>
            )}
        </>
    );
};

export default ProfileStatus;
