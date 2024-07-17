import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <Container>
            <div className='divcss'>
                <Link to="/qnaPostList">QnA 게시판</Link>
                <br />
                <Link to="/qna">자주 묻는 질문</Link>
                <br />
                <Link to="/location">찾아오시는 길</Link>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloribus inventore perferendis, non dignissimos id assumenda aspernatur numquam, aut nihil doloremque itaque odit blanditiis consectetur! Iure vitae dolorum qui architecto!</p>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloribus inventore perferendis, non dignissimos id assumenda aspernatur numquam, aut nihil doloremque itaque odit blanditiis consectetur! Iure vitae dolorum qui architecto!</p>
            </div>
        </Container>
    );
}

export default Main;