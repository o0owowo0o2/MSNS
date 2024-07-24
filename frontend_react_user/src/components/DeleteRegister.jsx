import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/deleteRegister.css';

function DeleteRegister() {
    const[memberId, setMemberId] = useState('');

    const handleChange = (e) => {
        setMemberId(e.target.value);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:9008/api/members/${memberId}`);
            alert('삭제되었습니다.');
            console.log();
        } catch (error) {
            console.error('삭제 실패', error);
            alert('회원탈퇴 중 오류가 발생했습니다.');
        }
    }

    const history = useHistory();

        return (
        <div className='divcss'>
            <h2>회원 탈퇴</h2>
            <form onSubmit={handleSubmit}>
                  {/* 사용자에게 게시글 번호 입력을 요청하는 레이블과 입력 필드 생성 */}
                  <label htmlFor='memberId'>회원 번호</label>
                <input 
                    type="text" id='memberId' value={memberId} 
                    onChange={handleChange} size={30}
                    placeholder='삭제할 회원 번호를 입력하세요!'
                /> <br /> 
                {/* 삭제를 수행할 버튼 생성 */}
                <button className='deleteButton' type='submit'>삭제</button>
                <button onClick={() => {history.goBack();}}>취소</button>
            </form>
            
        </div>
    );
}

export default DeleteRegister;