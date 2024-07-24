import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function CommunityEdit() {
    // 작성자 정보를 포함하여 상태 초기화
    const [community, setCommunity] = useState({ boardTitle: '', boardContents: '', boardWriter: '' }); // 초기 상태 설정
    const { boardNumber } = useParams(); // URL로부터 boardNumber 추출
    const history = useHistory(); // 페이지 이동을 위한 history 객체

    useEffect(() => {
        // 게시글 정보를 가져오는 함수
        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`http://localhost:9008/api/communitys/${boardNumber}`);
                setCommunity(response.data); // 상태 업데이트
            } catch (error) {
                console.log(error); // 에러 로깅
            }
        };
        fetchCommunity(); // 함수 실행
    }, [boardNumber]); // 의존성 배열 설정

    // input 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommunity(prev => ({ ...prev, [name]: value }));
    };

   
    // 게시글 수정 처리 핸들러
    const handleUpdate = async () => {
        try {
            // 작성자 정보는 제외하고 수정 요청을 보냅니다.
            const { boardWriter, ...updateData } = community;
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/communitys/${boardNumber}`, updateData);
            alert('게시글이 수정되었습니다.');
            history.push('/커뮤니티'); // 수정 후 커뮤니티 메인 페이지로 이동
        } catch (error) {
            console.error("게시글 수정 실패", error);
        }
    };

    // 수정 취소 핸들러
    const handleCancel = () => {
        history.goBack(); // 이전 페이지로 이동
    };

        // 글목록으로 이동하는 함수
        const goToCommunityList = () => {
            history.push('/커뮤니티'); // '/' 경로로 이동합니다.
        };

    return (
        <div>
            <h2>게시글 수정</h2>
            <form>
                <div>
                    <label>제목</label>
                    <input type="text" name="boardTitle" value={community.boardTitle || ''} onChange={handleChange} />
                </div><br /><br />
                <div>
                    <label>내용</label>
                    <textarea name="boardContents" value={community.boardContents || ''} onChange={handleChange} />
                </div><br /><br />
                {/* 작성자 정보는 표시만 하고 수정할 수 없습니다 */}
                <div>
                    <label>작성자 : {community.boardWriter}</label> <br /><br />
                </div>
                <button type="button" onClick={handleUpdate}>수정 처리</button>
                <button type="button" onClick={handleCancel}>수정 취소</button><br /><br />
                <div>            
                     {/* 글목록으로 이동 버튼 추가 */}
                    <button onClick={goToCommunityList}>글목록으로 이동</button> 
                </div>
            </form>
        </div>
    );
}

export default CommunityEdit;