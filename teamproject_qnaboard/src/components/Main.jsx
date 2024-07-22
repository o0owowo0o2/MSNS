import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/main.css';

function Main() {
    return (
        <div id='main'>
                <div className='main-banner'>
                    <img className='main-banner-full' src="images/main-banner-full.png" alt="메인배너full" />
                    <img className='main-banner-1200' src="images/main-banner-1200.png" alt="메인배너1200" />
                    <img className='main-banner-700' src="images/main-banner-700.png" alt="메인배너700" />
                </div>
                <Container>
                <div className='mini-banner'>
                    <h3>추천 상품</h3>
                    <br />
                    <span className='mini-banner-group'>
                        <div className='mini-banner-1'>
                            {/* <Link to="/상품메뉴1">
                                <img src="images/mini-banner-1.jpg" alt="" />
                            </Link> */}
                        </div>
                        <div className='mini-banner-2'>
                            {/* <Link to="/상품메뉴3">
                                <img src="images/mini-banner-2.jpg" alt="" />
                            </Link> */}
                        </div>
                        <div className='mini-banner-3'>
                            {/* <Link to="/상품메뉴3">
                                <img src="images/mini-banner-3.jpg" alt="" />
                            </Link> */}
                        </div>
                    </span>
                    <br />
                    <Link to="/상품목록">더보기</Link>
                </div>
                <div className='mini-block'>
                    <h3>프로모션</h3>
                    <br />
                    <div className='mini-block-1'></div>
                    <div className='mini-block-2'></div>
                    <br />
                </div>
                </Container>
            </div>
    );
}

export default Main;