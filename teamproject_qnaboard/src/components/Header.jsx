import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import "../css/header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    // 상단에 헤더가 고정되어있기 때문에 최상위 태그에 아래와 같은 style 추가 부탁드립니다!!
    // style={{paddingTop:"85px"}}
    // padding-top: 85px;

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" id='navbars' expanded={expanded}>
                <Container>
                    <Navbar.Brand as={Link} to="/main" onClick={handleClose} className='nav-title'>
                        <img src="../icons/dog_cat_logo.svg" alt="멍쓰냥쓰" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
                        <Nav className="mx-auto">
                            <Nav.Link as={Link} to="/SHOP" onClick={handleClose} className="nav-item">SHOP</Nav.Link>
                            <Nav.Link as={Link} to="/프로모션" onClick={handleClose} className="nav-item">프로모션</Nav.Link>
                            <Nav.Link as={Link} to="/공지사항" onClick={handleClose} className="nav-item">공지사항</Nav.Link>
                            <NavDropdown title="가이드" id="basic-nav-dropdown" className='nav-dropdown'>
                                <NavDropdown.Item as={Link} to="/쇼핑몰소개" onClick={handleClose}>쇼핑몰소개</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/location" onClick={handleClose}>찾아오시는길</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/qna" onClick={handleClose}>자주묻는질문</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="게시판" id="basic-nav-dropdown" className='nav-dropdown'>
                                <NavDropdown.Item as={Link} to="/커뮤니티" onClick={handleClose}>커뮤니티</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/자유게시판" onClick={handleClose}>자유게시판</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/qnaPostList" onClick={handleClose}>QnA게시판</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <div className='navbars_icon'>
                            <Link to="/장바구니" onClick={handleClose}>
                                <img src="../icons/shopping_cart_icon.svg" alt="shopping" />
                            </Link>
                            <Link to="/마이페이지" onClick={handleClose}>
                                <img src="../icons/user_icon.svg" alt="user" />
                            </Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
