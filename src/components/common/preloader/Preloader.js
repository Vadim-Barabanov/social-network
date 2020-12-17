import preloader from "../../../assets/images/svg-loaders/three-dots.svg";
import styles from "./Preloader.module.css";

let Preloader = () => {
    return <img alt="" className={styles.preloader} src={preloader} />;
};

export default Preloader;
