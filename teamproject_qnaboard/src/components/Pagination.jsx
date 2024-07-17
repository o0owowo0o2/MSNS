import React from 'react';
import '../css/pagination.css';
// 현재 페이지 번호(currentPage), 전체 페이지 수(totalPages), 페이지 번호를 변경할 때 호출되는 함수(paginate)

const Pagination = ({ currentPage, totalPages, paginate }) => {

    return (
        <div className='paging_button'>
            <button onClick={() => paginate(1)} disabled={currentPage <= 1} >
                <img src="../icons/chevrons_left_icon.svg" alt="<<" />
            </button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage <= 1} >
                <img src="../icons/left_icon.svg" alt="<" />
            </button>
            <span>페이지 {currentPage}/{totalPages}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage >= totalPages}>
                <img src="../icons/right_icon.svg" alt=">" />
            </button>
            <button onClick={() => paginate(totalPages)} disabled={currentPage >= totalPages}>
                <img src="../icons/chevrons_right_icon.svg" alt=">>" />
            </button>
        </div>
    );
};

export default Pagination;