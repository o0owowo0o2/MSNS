import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function DeleteNotice() {

    const[noticeId, setNoticeId] = useState('');

    const history = useHistory();

    const handleChange = (e) => {
        setNoticeId(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:9008/api/notices/${noticeId}`);
            alert('삭제되었습니다.');
            history.push("/noticeList");
        } catch (error) {
            console.error('게시글 삭제 실패', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    }

    return (
        <div className='divcss'>
             <h2>게시글 삭제</h2>
             <form onSubmit={handleSubmit}>
                <label htmlFor="noticeId">공지글 번호</label>
                <input 
                    type="text" id='noticeId' value={noticeId} 
                    onChange={handleChange} size={30}
                    placeholder='삭제할 게시글 번호를 입력하세요!'
                /> <br /> 
                {/* 삭제를 수행할 버튼 생성 */}
                <button type='submit'>탈퇴</button>
                <button type='reset'>취소</button>
             </form>
        </div>
    );
}

export default DeleteNotice;