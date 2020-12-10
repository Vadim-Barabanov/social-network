import preloader from "../../../assets/images/loading.gif";
import styles from "./Preloader.module.css";

let Preloader = () => {
    return <img alt="" className={styles.preloader} src={preloader} />;
};

export default Preloader;
