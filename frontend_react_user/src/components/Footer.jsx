import React from 'react';
import "../css/footer.css";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <div id='footer'>
            <Container>
                <div className='footer-link'>
                    <button><Link to="/이용약관">이용약관</Link></button>
                    <span>｜</span>
                    <button><Link to="/개인정보 처리방침">개인정보 처리방침</Link></button>
                    <span>｜</span>
                    <button><Link to="/이용안내">이용안내</Link></button>
                    <span>｜</span>
                    <button><Link to="/고객지원센터">고객지원센터</Link></button>
                </div>
                <div className='footer-copyright'>
                    <span>(주)멍쓰냥쓰 대표:장나라</span>
                    <span>사업자등록번호 : 000-00-00000</span>
                    <span>통신판매업허가번호 : 0000-0000-0000</span>
                    <br />
                    <span>경기 성남시 분당구 성남대로 지하 55</span>
                    <span>전화 : 0000-0000</span>
                    <br /><br />
                    <span className='copyright'>COPYRIGHT(C) 2024 (주)멍쓰냥쓰 All right reserved.</span>
                    <br />
                </div>
            </Container>
        </div>
    );
}

export default Footer;