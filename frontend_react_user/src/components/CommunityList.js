// 필요한 React 기능과 라이브러리를 임포트합니다.
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // HTTP 요청을 위한 axios 라이브러리를 임포트합니다.
import { Link, useHistory } from 'react-router-dom'; // 리액트 라우터의 Link 컴포넌트와 useHistory 훅을 임포트합니다.
import Pagination from './Pagination'; // 페이징 처리를 위한 Pagination 컴포넌트를 임포트합니다.


function CommunityList() {
    // 게시글 목록을 저장하는 상태, 초기값은 빈 배열입니다.
    const [communitys, setCommunitys] = useState([]);
    // 현재 페이지 번호를 저장하는 상태, 초기값은 1입니다.
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 당 게시글 수를 저장하는 상태, 초기값은 3입니다.
    const [communitysPerPage] = useState(7);
    // 전체 페이지 수를 저장하는 상태, 초기값은 0입니다.
    const [totalPages, setTotalPages] = useState(0);
    // 데이터 로드 상태를 저장하는 상태, 초기값은 false입니다.
    const [isLoaded, setIsLoaded] = useState(false);

    // useHistory 훅을 사용하여 브라우저 히스토리 객체를 가져옵니다.
    const history = useHistory();

    // useEffect 훅은 컴포넌트 마운트 시 및 currentPage, postsPerPage 변경 시 실행됩니다.
    useEffect(() => {
        const fetchCommunitys = async () => {
            setIsLoaded(false); // 데이터 로딩 시작을 나타냅니다.
            try {
                // API를 호출하여 게시글 데이터를 가져옵니다.
                const response = await axios.get(`http://localhost:9008/api/communitys?page=${currentPage - 1}&size=${communitysPerPage}`);
                setCommunitys(response.data.content); // 응답 데이터 중 content를 posts 상태에 저장합니다.
                setTotalPages(response.data.totalPages); // 응답 데이터 중 총 페이지 수를 저장합니다.
                setIsLoaded(true); // 데이터 로딩 완료를 나타냅니다.
            } catch (error) {
                console.error("게시글 목록 조회 에러", error);
                setIsLoaded(true); // 데이터 로딩 에러 발생 시에도 로딩 완료로 상태 변경합니다.
            }
        };

        fetchCommunitys();
    }, [currentPage, communitysPerPage]);


    // 페이징 처리 함수, 클릭된 페이지 번호를 현재 페이지 상태로 설정합니다.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // 메인으로 이동하는 함수
    const goToCommunityRegister = () => {
      history.push('/community_register'); // 메인 페이지로 이동합니다.
    };

    // JSX 구조를 반환합니다.
    return (
        <div style={{marginTop:'85px'}}>
            <h2>커뮤니티 게시글 목록</h2>
            <button onClick={goToCommunityRegister}>게시글 등록</button>
            {/* 아래의 isLoaded && 는 데이터가 로드된 경우에만 내용을 표시합니다. */}
            {isLoaded && ( 
                <>
                    <ul>
                        {/* 게시글 목록을 순회하며 각 게시글 정보를 표시합니다. */}
                        {communitys.map(community => ( 
                            <li key={community.boardNumber}>
                                <Link to={`/communitys/${community.boardNumber}`}>
                                    <h3>{community.boardTitle}</h3>
                                </Link>
                                <p>작성자: {community.boardWriter}</p>
                                
                            </li>
                        ))}
                    </ul>
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </>
            )}
        </div>
    );
}

export default CommunityList; // PostList 컴포넌트를 export하여 다른 파일에서 사용할 수 있게 합니다.
