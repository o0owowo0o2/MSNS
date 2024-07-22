import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../css/qnaBoardEdit.css';
import { Link } from 'react-router-dom';

function QnaPostEdit() {
    const [post, setPost] = useState({
        boardTitle: '',
        boardContents: '',
        boardWriter: ''
    });

    const { boardNumber } = useParams();
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('첨부파일');
    const history = useHistory();

    const goToPostDetail = () => {
        alert('게시글 수정을 취소하였습니다.\n(변경된 내용은 저장되지 않습니다)');
        history.push(`/posts/${boardNumber}`);
    };

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://192.168.10.23:9008/api/posts/${boardNumber}`);
                setPost({
                    boardNumber: response.data.boardNumber,
                    boardTitle: response.data.boardTitle,
                    boardContents: response.data.boardContents,
                    boardWriter: response.data.boardWriter
                });
            } catch (error) {
                console.error("게시글 정보를 불러오는데 실패했습니다!", error);
            }
        };
        fetchPostData();
    }, [boardNumber]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImageName(file ? file.name : '첨부파일');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('post', JSON.stringify(post));

        try {
            await axios.put(`http://192.168.10.23:9008/api/posts/update/${boardNumber}`,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            alert('게시글 수정이 완료되었습니다.');
            history.push(`/posts/${boardNumber}`);
        } catch (error) {
            console.error('게시글 수정 실패', error);
            alert('게시글 수정에 실패하였습니다.')
        }
    };

    return (
        <Container>
            <div id='qnaPostEdit'>
                <p className='edit-p'>
                    <Link to='/qnaPostList'>QnA 게시판</Link>
                    <img src="../icons/right_icon.svg" alt=">" />
                    {post.boardNumber}번 ｜ 작성자 : {post.boardWriter}</p>
                <div className='edit-title'>
                    <h2><input type="text" name='boardTitle' placeholder='제목' value={post.boardTitle} onChange={handleChange} /> <br />
                    </h2>
                </div>
                <hr />
                <div className='edit-contant'>
                    <div className="filebox">
                        <input className="upload-name" value={imageName} placeholder="첨부파일" readOnly />
                        <label htmlFor="file">파일찾기</label>
                        <input type="file" onChange={handleImageChange} id="file" /> <br />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea name='boardContents' placeholder='내용' value={post.boardContents} onChange={handleChange} /> <br />
                        <br />
                    </form>
                </div>
                <hr />
                <div className='edit-buttons'>
                    <button type='submit' onClick={handleSubmit} className='edit-submit'>수정</button>
                    <button type='button' onClick={goToPostDetail} className='edit-reset'>취소</button>
                </div>
            </div>
        </Container>
    );
}

export default QnaPostEdit;
