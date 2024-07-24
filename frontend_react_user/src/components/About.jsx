import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "../css/aos.css";
import '../css/about.css';
function About() {
        useEffect (()=>{
            AOS.init({duration:2000});
        }); 


    return (
        <div className='container-about'>
            <div className="wrapper-about">

                <div className='about-info'>
                
                    <h1 data-aos="fade-up" className='tit3'>멍쓰 냥쓰</h1>

                    <div className='aboutDesc'>
                        안녕하세요 
                        멍쓰 냥쓰는 반려견과 반려묘의 행복한 생활을 응원합니다!  <br/>

                        또한 소중한 반려동물을 위해 차별화된 제품과 서비스를 제안하는 프리미엄 펫 브랜드로
                        실용적이고 편안하며 사랑스러운 제품들을 선보입니다.<br/>

                        디자인이 돋보이는 의류와, 프리미엄 소재를 사용한 홈 아이템<br/>
                        천연재료를 활용한 애견간식과 저자극 케어제품을 제안합니다.<br/>

                        작고 소중한 친구들에게 더 나은 일상을 선물하세요!
                    </div>
                <div className="picture"> <img src="images/dogCat.jpg" alt="dogCat" /></div>

                <div className='aboutT'>
            부드러운 컬러와 섬세한 디테일, 편안한 패턴이 돋보이는 멍쓰냥쓰의 2024 컬렉션을 만나보세요.
                </div>

                {/* <p> */}
                    {/* <Link to = "/main"> Home 컴포넌트로 go</Link> */}

                {/* </p> */}

                </div> 
                {/* aboutinfo */}
            </div>
        </div>
        // wrapper 

        

    );
}

export default About;