import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function QnaPostEdit() {

    const [post, setPost] = useState({
        boardTitle: '',
        boardContents: '',
        boardWriter: ''
    });
    
    const { boardNumber } = useParams();

    const [image, setImage] = useState(null);
    
    const history = useHistory();

    useEffect(() => {
        const fetchPostData = async() => {
            try{
                const response = await axios.get(`http://localhost:9008/api/posts/${boardNumber}`);
                setPost({
                    boardTitle: response.data.boardTitle,
                    boardContents: response.data.boardContents,
                    boardWriter: response.data.boardWriter
                });
            }catch(error){
                console.error("게시글 정보를 불러오는데 실패했습니다!", error);
            }
        };
        fetchPostData();
    },[boardNumber]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost({
            ...post,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('post', JSON.stringify(post));

        try{
            await axios.put(`http://localhost:9008/api/posts/update/${boardNumber}`,
                formData, {
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                });
                alert('게시글 수정이 완료되었습니다.');
                history.push('/qnaPostList');
        }catch(error){
            console.error('게시글 수정 실패', error);
            alert('게시글 수정에 실패하였습니다.')
        }
    };

    return (
        <Container>
            <div className='divcss'>
                <h2>게시글 수정</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='boardTitle' placeholder='제목' value={post.boardTitle} onChange={handleChange} /> <br />
                    <textarea name='boardContents' placeholder='내용' value={post.boardContents} onChange={handleChange} /> <br />
                    <input type="text" name='boardWriter' placeholder='작성자' value={post.boardWriter} disabled /> <br />
                    <input type="file" onChange={handleImageChange} /> <br />
                    <button type='submit'>등록</button>
                    <button type='reset'>취소</button>
                </form>
            </div>
        </Container>
    );
}

export default QnaPostEdit;