import React from 'react';
import '../css/pagination.css';

const Pagination = ({ currentPage, totalPages, paginate }) => {
    // 페이지 번호 배열 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='paging_button'>
            <button onClick={() => paginate(1)} disabled={currentPage <= 1}>
                <img src="../icons/chevrons_left_icon.svg" alt="<<" />
            </button>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage <= 1}>
                <img src="../icons/left_icon.svg" alt="<" />
            </button>
            <span>
                {pageNumbers.map(number => (
                    <button 
                        key={number} 
                        onClick={() => paginate(number)} 
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
            </span>
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
