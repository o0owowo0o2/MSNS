import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../css/qnaBoardCreate.css';
import { Link } from 'react-router-dom';

function CreateQnaPost() {

    const [post, setPost] = useState({
        boardTitle:'',
        boardContents:'',
        boardWriter:''        
    });

    const history = useHistory();

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('첨부파일');


    const handleChange = (e) => {
        const {name, value} = e.target;
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

    const goToPostList =  () =>{
        alert('게시글 작성을 취소하였습니다.\n(변경된 내용은 저장되지 않습니다)');
        history.push('/qnaPostList');
    };

    return (
        <Container>
            <div id='qnaPostCreate'>
            <Link to='/qnaPostList' className='goToPostList'>QnA 게시판</Link>
            <form onSubmit={handleSubmit}>
                <div className='create-title'>
                    <h2><input type="text" name='boardTitle' placeholder='제목' value={post.boardTitle} onChange={handleChange} /> <br />
                    </h2>
                </div>
                <hr />
                <div className='create-contant'>
                    <div className="filebox">
                        <input className="upload-name" value={imageName} placeholder="첨부파일" readOnly />
                        <label htmlFor="file">파일찾기</label>
                        <input type="file" onChange={handleImageChange} id="file" /> <br />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea name='boardContents' placeholder='내용' value={post.boardContents} onChange={handleChange} /> <br />
                        <br />
                    </form>
                    <input type="text" name='boardWriter' placeholder='작성자' value={post.boardWriter} onChange={handleChange} />
                </div>
                <hr />
                <div className='create-buttons'>
                    <button type='submit' onClick={handleSubmit} className='create-submit'>등록</button>
                    <button type='button' onClick={goToPostList} className='create-reset'>취소</button>
                </div>
                </form>
            </div>
        </Container>
    );
}

export default CreateQnaPost;