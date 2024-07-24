import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../css/qnaBoardDetail.css';
import { Link } from 'react-router-dom';

function QnaPostDetail() {

    const [post, setPost] = useState({});
    const { boardNumber } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://hocalhost/api/posts/${boardNumber}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post details:", error);
            }
        };
        fetchPost();
    }, [boardNumber]);

    const goToPostList = () => {
        history.push('/qnaPostList');
    };

    const handleDelete = async (boardNumber) => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:9008/api/posts/${boardNumber}`);
                alert('게시글이 삭제되었습니다');
                history.push('/qnaPostList');
            } catch (error) {
                console.error("게시글 삭제 실패", error);
            }
        }
    };

    return (
        <Container>
            <div id='qnaPostDetail'>
                <p className='qnaPostDetail-p'>
                    <Link to='/qnaPostList'>QnA 게시판</Link>
                    <img src="../icons/right_icon.svg" alt=">" />
                    {post.boardNumber}번 ｜ 작성자 : {post.boardWriter}</p>
                <div className='qnaPostDetail-title'>
                    <h2>{post.boardTitle}</h2>
                    <div className='qna-buttons-1'>
                        <button onClick={() => history.push(`/edit/${post.boardNumber}`)} className='qna-buttons-edit'>수정</button>
                        <button onClick={() => handleDelete(post.boardNumber)} className='qna-buttons-delete'>삭제</button>
                    </div>
                </div>
                    <hr />
                <div className='qnaPostDetail-content'>
                    {post.imagePath && <img src={post.imagePath} alt='Post'/>} <br /><br />
                    <p className='qna-content'>{post.boardContents} </p>
                    <br /><hr />
                </div>
                <div className='qna-buttons-2'>
                    <button onClick={goToPostList}>글목록으로 이동</button>
                </div>
            </div>
        </Container>
    );
}

export default QnaPostDetail;
