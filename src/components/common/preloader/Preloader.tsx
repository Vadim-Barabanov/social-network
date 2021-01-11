import React, { FC } from "react";
import preloader from "../../../assets/images/svg-loaders/three-dots.svg";
import styles from "./Preloader.module.css";

let Preloader: FC = () => {
    return (
        <img alt="Loading..." className={styles.preloader} src={preloader} />
    );
};

export default Preloader;
