import React, { FC } from "react";
import preloader from "../../../assets/images/svg-loaders/three-dots.svg";
import styles from "./Preloader.module.css";

type PropsType = {
    size?: string;
};

let Preloader: FC<PropsType> = ({ size }) => {
    return (
        <img
            alt="Loading..."
            className={styles.preloader}
            style={{ width: size }}
            src={preloader}
        />
    );
};

export default Preloader;
