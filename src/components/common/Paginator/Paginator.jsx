import React from "react";
import style from "./Paginator.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";

const Paginator = ({
    pageSize,
    totalUsersCount,
    currentPage,
    onPageChange,
}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.pages__box}>
            {pages.map((item) => (
                <span
                    key={item}
                    onClick={() => {
                        if (currentPage === item) return null;
                        onPageChange(item);
                    }}
                    className={currentPage === item ? style.selectedPage : null}
                >
                    {item}
                </span>
            ))}
        </div>
    );
};

export default Paginator;
