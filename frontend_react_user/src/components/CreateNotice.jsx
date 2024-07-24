import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Container } from 'react-bootstrap';

function CreateNotice() {

    const[notice, setNotice] = useState({
        noticeTitle:'',
        noticeContents:'',
        noticeWriter:'',
    });

    const history = useHistory();
        

    const handleChange = (e) => {
        const{name, value} = e.target;
        setNotice({
            ...notice,
            [name]:value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9008/api/notices', notice);
            alert('게시글이 등록 되었습니다.');
            console.log(response.data);
            history.push("/noticeList");
        }catch (error) {
            console.log("게시글 등록 실패", error);
            alert('게시글 등록에 실패했습니다!');
        }
    }

    const handleCancel = () => {
        history.goBack(); // 브라우저의 이전 페이지로 이동합니다.
    };

    return (
        <Container>
        <div className='divcss'>
            <h2>공지사항 등록</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name='noticeTitle' placeholder='제목' onChange={handleChange}/><br />
                <textarea name="noticeContents" placeholder='내용' onChange={handleChange}></textarea> <br />
                <input type="text" name='noticeWriter' placeholder='작성자' onChange={handleChange}/><br /> <br />
                <button type='submit'>등록</button>
                <button type='reset' onClick={handleCancel}>취소</button>
            </form>
        </div>
        </Container>
    );
}

export default CreateNotice;