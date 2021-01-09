import React, { useState } from "react";
import style from "./Paginator.module.css";
// import userFemalePhoto from "../../assets/images/userFemale.png";

type PropsType = {
    pageSize: number;
    totalItemsCount: number;
    currentPage: number;
    onPageChange: Function;
    portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
    pageSize,
    totalItemsCount,
    currentPage,
    onPageChange,
    portionSize = 5,
}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    // let [portionNumber, setPortionNumber] = useState(1);
    let [portionNumber, setPortionNumber] = useState(
        Math.ceil(currentPage / portionSize)
    );
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const prevPage = () => {
        // if (currentPage <= leftPortionPageNumber) {
        //     setPortionNumber(portionNumber - 1);
        // }
        // onPageChange(currentPage - 1);

        setPortionNumber(portionNumber - 1);
        onPageChange(leftPortionPageNumber - 1);
    };

    const nextPage = () => {
        // if (currentPage >= rightPortionPageNumber) {
        //     setPortionNumber(portionNumber + 1);
        // }
        // onPageChange(currentPage + 1);

        setPortionNumber(portionNumber + 1);
        onPageChange(rightPortionPageNumber + 1);
    };

    return (
        <div className={style.pagesBox}>
            {portionNumber > 1 && (
                <button
                    className={style.pagesBtns}
                    onClick={() => {
                        prevPage();
                    }}>
                    <i className="fas fa-chevron-left"></i>
                </button>
            )}

            <div className={style.pagesNumberBox}>
                {pages
                    .filter(
                        (item) =>
                            item >= leftPortionPageNumber &&
                            item <= rightPortionPageNumber
                    )
                    .map((item) => (
                        <span
                            key={item}
                            onClick={() => {
                                if (currentPage === item) return null;
                                onPageChange(item);
                            }}
                            className={`${style.pageNumber} ${
                                currentPage === item ? style.selectedPage : null
                            }`}>
                            {item}
                        </span>
                    ))}
            </div>

            {portionCount > portionNumber && (
                <button
                    className={style.pagesBtns}
                    onClick={() => {
                        nextPage();
                    }}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            )}
        </div>
    );
};

export default Paginator;
