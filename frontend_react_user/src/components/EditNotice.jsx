import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function EditNotice() {
    const[notice, setNotice] = useState({
        noticeTitle:'',
        noticeContents:'',
        noticeWriter:''
    });
    const{noticeNumber} = useParams();
    const history = useHistory();
    
    useEffect(() => {
        const fetchNotice = async() => {
            try {
                const response = await axios.get(`http://localhost:9008/api/notices/${noticeNumber}`);
                setNotice(response.data);
            } catch (error) {
                console.log(error);
                alert('에러가 발생했습니다!');
            }
        }
        fetchNotice();
    },[noticeNumber]);

    const handleChange = (e) => {
        const{name,value} = e.target;
        setNotice(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async() => {
        try {
            const{noticeWriter, ...updateData} = notice;
            await axios.put(`http://localhost:9008/api/notices/${noticeNumber}`,updateData);
            alert('게시글이 수정되었습니다!'); 
            history.push("/noticeList");
        } catch (error) {
            console.error("게시글 수정 실패", error);
        } 
    }
    const handleCancel = () => {
        history.goBack(); // 브라우저의 이전 페이지로 이동합니다.
    };
    const goToMain = () => {
        history.push("/"); 
    };

    return (
        <div className='divcss'>
            <h2>공지글 수정</h2>
            <form>
            <label>제목</label>
                <input type="text" name='noticeTitle' value={notice.noticeTitle || ''} onChange={handleChange}/> <br />
            <label>내용</label>  
                <textarea name="noticeContents" value={notice.noticeContents || ''} onChange={handleChange} /> <br />
                <label>작성자 : {notice.noticeWriter}</label>
                <br />
                <button type='button' onClick={handleUpdate}>수정</button>
                <button type='button' onClick={handleCancel}>취소</button>   
                <br />
                <button type='button' onClick={goToMain}>메인페이지</button>   

            </form>
        </div>
    );
}
export default EditNotice;