// React 및 필요한 훅과 라이브러리를 임포트합니다.
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // HTTP 클라이언트 라이브러리 axios를 임포트합니다.
import { useParams, useHistory } from 'react-router-dom'; // react-router-dom에서 라우팅에 필요한 훅을 임포트합니다.

function CommunityDetail() {
    // post 상태를 관리하기 위한 useState 훅. 초기 상태는 빈 객체로 설정됩니다.
    const [community, setCommunity] = useState({});
    // useParams 훅을 사용하여 현재 경로의 파라미터 중 boardNumber 값을 가져옵니다.
    const { boardNumber } = useParams();
    // useHistory 훅을 사용하여 브라우저의 히스토리 객체를 가져옵니다.
    const history = useHistory();

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 한 번, 그리고 boardNumber가 변경될 때 마다 실행됩니다.
    useEffect(() => {
        const fetchCommunity = async () => { // 비동기 함수 fetchPost를 정의합니다.
            try {
                // axios.get을 사용하여 게시글의 상세 정보를 요청합니다.
                const response = await axios.get(`http://localhost:9008/api/communitys/${boardNumber}`);
                // 응답 데이터를 post 상태로 설정합니다.
                setCommunity(response.data);
            } catch (error) { // 요청 중 오류가 발생하면 콘솔에 로그를 출력합니다.
                console.log(error);
            }
        };
        fetchCommunity(); // fetchPost 함수를 호출합니다.
    }, [boardNumber]); // useEffect의 의존성 배열에 boardNumber를 추가하여, boardNumber가 변경될 때마다 함수를 다시 실행합니다.


     // 게시글 삭제 처리 함수
     const handleDelete = async (boardNumber) => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) { // 사용자에게 삭제 확인을 요청합니다.
            try {
                await axios.delete(`http://localhost:9008/api/communitys/${boardNumber}`);
                alert('게시글이 삭제되었습니다.');
                history.push('/커뮤니티');
                // 삭제된 게시글을 상태에서 제거합니다.
                setCommunity(community.filter(community => community.boardNumber !== boardNumber));
            } catch (error) {
                console.error("게시글 삭제 실패", error);
            }
        }
    };

    // 글목록으로 이동하는 함수
    const goToCommunityList = () => {
        history.push('/커뮤니티'); // history 객체의 push 메소드를 사용하여 루트 경로('/')로 이동합니다.
    };

    // JSX를 반환합니다. 게시글의 제목, 내용, 작성자 정보를 표시하고, 글목록으로 이동하는 버튼을 제공합니다.
    return (
        <div style={{marginTop:'85px'}}>
            {/* 게시글 제목 */}
            <h2>{community.boardTitle}</h2>
            {/* 게시글 내용 */}
            <p>{community.boardContents}</p>
            {/* 게시글 작성자 */}
            <p>작성자: {community.boardWriter}</p>
            <button onClick={() => history.push(`/edit/${community.boardNumber}`)}>게시글 수정</button>
             <button onClick={() => handleDelete(community.boardNumber)}>게시글 삭제</button>
            
            {/* 글목록으로 이동하는 버튼 */}
            <button onClick={goToCommunityList}>글목록으로 이동</button>
        </div>
    );
}

export default CommunityDetail; // PostDetail 컴포넌트를 export하여 다른 컴포넌트에서 임포트하고 사용할 수 있도록 합니다.
