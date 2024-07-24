// rsf
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/landing.css';

function LandingPage() {
    return (
        <div className='full-side'>
            <div className='titW'>           
            <Link to="/main"><h1 className='goToM'>☞ 멍쓰냥쓰 메인페이지로 이동</h1></Link>
               
            </div>
            <video controls autoPlay muted loop>       
 {/* public 폴더 안에 videos 폴더 안에 sea.mp4 경로 지정 바랍니다 */} 
 {/* 참고로, public 폴더는 루트 디렉토리로 매핑되므로 videos/sea.mp4로 접근할 수 있습니다. */}
                <source src="videos/dogcat.mp4" type="video/mp4" />
            </video>
        </div>
    );
}

export default LandingPage;