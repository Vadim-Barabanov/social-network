import React, { useState, useEffect, FC } from "react";
import s from "./ProfileData.module.css";

type PropsType = {
    status: string;
    updateStatus: (status: string) => Promise<void>;
    isOwner: boolean;
};

const ProfileStatus: FC<PropsType> = (props) => {
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

    const onStatusChange = (elem: any) => {
        setLocalStatus(elem.currentTarget.value);
    };

    return (
        <>
            {editMode ? (
                <div className={s.status}>
                    <input
                        autoFocus={true}
                        onBlur={toggleEditMode}
                        value={localStatus}
                        onChange={onStatusChange}
                    />
                </div>
            ) : (
                <div className={s.status}>
                    <span className={s.statusText} onClick={toggleEditMode}>
                        {props.status || "No status"}
                    </span>
                </div>
            )}
        </>
    );
};

export default ProfileStatus;
