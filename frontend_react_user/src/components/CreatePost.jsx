import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function CreatePost() {
    const history = useHistory();

    const [post, setPost] = useState({
        boardTitle: '',
        boardContents: '',
        boardWriter: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9008/api/posts', post);
            alert('게시글이 등록 되었습니다.');
            history.push('/'); // 메인 페이지로 이동 처리함
            console.log(response.data);
        } catch (error) {
            console.error("게시글 등록 실패", error);
            alert('게시글 등록에 실패했습니다.');
        }
    };

    return (
        <div className="container" style={{marginTop:'85px'}}>
            <h2>게시글 등록</h2>
            <form onSubmit={handleSubmit}>
                <div className="inline-group">
                    <div className="form-group">
                        <label htmlFor="boardTitle">제목</label>
                        <input type="text" name="boardTitle" id="boardTitle" placeholder="제목" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="boardWriter">작성자</label>
                        <input type="text" name="boardWriter" id="boardWriter" placeholder="작성자" onChange={handleChange} />
                    </div>
                </div>
                <div className="content-group">
                    <label htmlFor="boardContents">내용</label>
                    <textarea name="boardContents" id="boardContents" placeholder="내용" onChange={handleChange}></textarea>
                </div>
                <div className="form-buttons">
                    <button className="registerBtn" type="submit"> 등록 </button>
                    <button className="cancelBtn" type="reset">취소</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
