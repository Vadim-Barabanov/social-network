import React from "react";
import HeadingStyle from './Heading.module.css';

const Heading = () => {
    return (
        <header className={HeadingStyle.heading}>
            <h1>Guiz: social network.</h1>
        </header>
    );
};

export default Heading;
