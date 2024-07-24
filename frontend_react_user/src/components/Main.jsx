import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/main.css'; 

function Main() {
    const settings = {
        dots: true,       
        arrows: true,     
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
    };

    return (
        <div id='main'>
            <div className='main-banner'>
                <Slider {...settings}>
                    <div className="slide">
                        <Link to="/메인배너1">
                            <picture>
                                <source media="(max-width: 700px)" srcSet="images/main-banner-700.png" />
                                <source media="(max-width: 1500px)" srcSet="images/main-banner-1200.png" />
                                <img src="images/main-banner-full.png" alt="메인배너1" />
                            </picture>
                        </Link>
                    </div>
                    <div className="slide">
                        <Link to="/메인배너2">
                            <picture>
                                <source media="(max-width: 700px)" srcSet="images/main-banner-700-2.png" />
                                <source media="(max-width: 1500px)" srcSet="images/main-banner-1200-2.png" />
                                <img src="images/main-banner-full-2.png" alt="메인배너2" />
                            </picture>
                        </Link>
                    </div>
                </Slider>
            </div>
            <Container>
                <div className='mini-banner'>
                    <h3>추천 상품</h3>
                    <br />
                    <span className='mini-banner-group'>
                        <div className='mini-banner-1'>
                            <Link to="/상품메뉴1">
                                <img src="images/mini-banner-1.png" alt="미니배너1" />
                            </Link>
                        </div>
                        <div className='mini-banner-2'>
                            <Link to="/상품메뉴2">
                                <img src="images/mini-banner-2.png" alt="미니배너2" />
                            </Link>
                        </div>
                        <div className='mini-banner-3'>
                            <Link to="/상품메뉴3">
                                <img src="images/mini-banner-3.png" alt="미니배너3" />
                            </Link>
                        </div>
                    </span>
                    <br />
                    <Link className="plus" to="/상품목록">더보기</Link>
                </div>
                <div className='mini-block'>
                    <h3>프로모션</h3>
                    <br />
                    <div className='mini-block-1'>
                        <Link to="/프로모션1">
                            <img className='mini-block-1-180' src="images/block-1-180.png" alt="프로모션1-180" />
                            <img className='mini-block-1-120' src="images/block-1-120.png" alt="프로모션1-120" />
                        </Link>
                    </div>
                    <div className='mini-block-2'>
                        <Link to="/프로모션2">
                            <img className='mini-block-2-180' src="images/block-2-180.png" alt="프로모션2-180" />
                            <img className='mini-block-2-120' src="images/block-2-120.png" alt="프로모션2-120" />
                        </Link>
                    </div>
                    <br />
                </div>
            </Container>
        </div>
    );
}

export default Main;
