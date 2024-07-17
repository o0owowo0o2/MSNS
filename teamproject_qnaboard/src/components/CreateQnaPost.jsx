import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function CreateQnaPost() {

    const [post, setPost] = useState({
        boardTitle:'',
        boardContents:'',
        boardWriter:''        
    });

    const history = useHistory();

    const [image, setImage] = useState(null);


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
            const response = await axios.post('http://localhost:9008/api/posts/upload', formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            alert('게시글 등록이 완료되었습니다.');
            console.log(response.data);
            history.push('/qnaPostList');
        }catch(error){
            console.error('게시물 등록 실패', error);
            alert('게시글 등록에 실패하였습니다.');
        }
    };

    return (
        <Container>
            <div className='divcss'>
                <h2>게시글 등록</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='boardTitle' placeholder='제목' value={post.boardTitle} onChange={handleChange} /> <br />
                    <textarea name='boardContents' placeholder='내용' value={post.boardContents} onChange={handleChange} /> <br />
                    <input type="text" name='boardWriter' placeholder='작성자' value={post.boardWriter} onChange={handleChange} /> <br />
                    <input type="file" onChange={handleImageChange} /> <br />
                    <button type='submit'>등록</button>
                    <button type='reset'>취소</button>
                </form>
            </div>
        </Container>
    );
}

export default CreateQnaPost;