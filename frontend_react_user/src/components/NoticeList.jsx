import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import { Container } from 'react-bootstrap';
import '../css/noticeList.css';


function NoticeList() {
    
    const history = useHistory();

    // 게시물 목록, 현재 페이지, 총 페이지 수, 로드 상태, 검색어를 위한 상태 변수들을 설정합니다.
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const noticePerPage = 3;
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchNotices = useCallback(async()=> {
        setIsLoaded(false);
        try {
            const response = await axios.get(`http://192.168.10.12:9008/api/notices/list`,{
                params:{
                    page: currentPage -1,
                    size: noticePerPage,
                    search: searchTerm
                },
            });
            console.log(response.data);
            setNotices(response.data.content);
            setTotalPages(response.data.totalPages);
            setIsLoaded(true);
            
        } catch (error) {
            console.error("게시글 목록 조회 에러", error);
            setIsLoaded(true); // 에러가 발생해도 로드 상태를 true로 변경합니다.
        }
    },[currentPage,noticePerPage,searchTerm]);

    useEffect(() => {
        fetchNotices();
    }, [fetchNotices]);

    // 페이지 번호를 변경하는 함수
    const paginate =(pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <Container>
        <div className='divcss'>
            <h2>공지사항</h2>     
            {isLoaded && (
                <>
                    <ul className='list'>
                        {notices.map(notice => (
                            <li key={notice.noticeNumber}>
                                {/* 게시글 제목을 클릭하면 상세 페이지로 이동 */}
                                <Link to={`/notices/${notice.noticeNumber}`}>
                                <span className='title'>{notice.noticeTitle}</span>
                                </Link>
                                <span className='contents'>{notice.noticeContents}</span>
                                <span className='writer'>작성자: {notice.noticeWriter}</span>
                                <div className='line'></div>
                            </li>
                            ))}
                    </ul>
                            {/* 로드 완료 시 내용을 표시 */}
                            <input type="text" placeholder='검색어를 입력하세요.' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
                            <button onClick={()=> setCurrentPage(1)}>검색</button> <br />
                        {/* 페이징 컴포넌트 */}
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </>
                 )}
        </div>
        </Container>
    );
}

export default NoticeList;