import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { Container } from 'react-bootstrap';
import '../css/qnaboard.css';  // CSS 파일을 import 합니다.

function QnaPostList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const fetchPosts = useCallback(async (page = 1, search = '') => {
        setIsLoaded(false);
        try {
            const response = await axios.get('http://192.168.10.23:9008/api/posts', {
                params: {
                    page: page - 1,
                    size: postsPerPage,
                    search: search,
                },
            });
            const sortedPosts = response.data.content.sort((a, b) => b.boardNumber - a.boardNumber);
            setPosts(sortedPosts);
            setTotalPages(response.data.totalPages);
            setIsLoaded(true);
        } catch (error) {
            console.error("게시글 목록 조회 에러", error);
            setIsLoaded(true);
        }
    }, [postsPerPage]);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [fetchPosts, currentPage]);

    const handleSearch = () => {
        setIsSearching(true);
        setCurrentPage(1);
        fetchPosts(1, searchTerm);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchPosts(pageNumber, isSearching ? searchTerm : '');
    };

    return (
        <Container>
            <div id='qna-container'>
                <h2>QnA 게시판</h2>
                <p>고객님들의 질문 및 문의사항을 알려주시면, 빠르게 확인 후 답변해 드립니다.<br />
                    많은 분들이 문의하신 질문은 <Link to="/qna">자주 묻는 질문</Link> 페이지에 안내되어 있습니다.
                </p>
                <br /><br />
                <div className='search-bar'>
                    <input 
                        type="text" 
                        placeholder=' 검색어 입력' 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <div className='buttons'>
                        <button onClick={handleSearch}>검색</button>
                    </div>
                </div>
                {isLoaded && (
                    <>
                        <ul className='post-list'>
                            <span className='span-header'>
                                <span>글번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                            </span>
                            {posts.map(post => (
                                <li key={post.boardNumber} className='post-item'>
                                    <Link to={`/posts/${post.boardNumber}`} className='post-link'>
                                        <span>{post.boardNumber} </span>
                                        <span>{post.boardTitle} </span>
                                        <span>{post.boardWriter}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    <div className='buttons-a'>
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                        {/* <Link to="/createQnaPost">글쓰기</Link> */}
                    </div>
                    </>
                )}
            </div>
        </Container>
    );
}

export default QnaPostList;
