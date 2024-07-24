// rsf
import React, { useState } from 'react';
import axios from 'axios';
import '../css/createcommunity.css';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function CreateCommunity() {

    const [community, setCommunity] = useState({
        boardTitle: '',
        boardContents: '',
        boardWriter: ''
    });

    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        // post 객체에 담긴 데이터를 설정(set) 처리 합니다.
        setCommunity({
            // 스프레드 연산자(...)를 활용하여
            // post 객체에 담아줍니다.
            ...community,
            // name 속성에 입력되어지는 값(value)들을
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:9008/api/communitys', community);
            alert('게시글이 등록 되었습니다!');
            console.log(response.data);
            history.push('/커뮤니티');
        } catch(error){
            console.error("게시글 등록 실패", error);
            alert('게시글 등록에 실패했습니다!');
        }
    };

    return (
        <Container>

        <div className="container wrapper">
        <h2>커뮤니티 게시글 등록</h2>
        <form onSubmit={handleSubmit}>
            <input type='text' name='boardTitle' placeholder='제목' onChange={handleChange} /> <br />
            <textarea name='boardContents' placeholder='내용' onChange={handleChange} />
            <br />
            <input type='text' name='boardWriter' placeholder='작성자' onChange={handleChange} />
            <br />
            <button type='submit'>등록</button><button type='reset'>취소</button>
        </form>
    </div>
        </Container>
    );
}

export default CreateCommunity;
