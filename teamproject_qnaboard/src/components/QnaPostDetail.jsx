import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function QnaPostDetail() {

    const [post, setPost] = useState({});
    const { boardNumber } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:9008/api/posts/${boardNumber}`);
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
            <div className='divcss'>
                <p>{post.boardNumber}</p>
                <h2>{post.boardTitle}</h2>
                <p>{post.boardContents}</p>
                <p>{post.boardWriter}</p>
                {post.imagePath && <img src={post.imagePath} alt='Post' style={{ maxHeight: "500px", maxWidth: '500px' }} />} <br />
                <button onClick={() => history.push(`/edit/${post.boardNumber}`)}>게시글 수정</button>
                <button onClick={() => handleDelete(post.boardNumber)}>게시글 삭제</button>
                <br />
                <button onClick={goToPostList}>글목록으로 이동</button>
            </div>
        </Container>
    );
}

export default QnaPostDetail;
