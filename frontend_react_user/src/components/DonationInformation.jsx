import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/donation.css';
function DonationInformation() {
    
    const history = useHistory();
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % 2); // 2 is the number of images
        }, 3000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <div className='divcss'>
            <div className='wrapper'>
               <div className='a'>
               <a href="/">Home</a>
               </div>
               <div className='slide-container'>
               <div className={`slide ${slideIndex === 0 ? 'active' : ''} fade`}>
                        <img className='dog1' src="../images/dog1.jpg" alt=" 이미지1" />
                    </div>
                    <div className={`slide ${slideIndex === 1 ? 'active' : ''} fade`}>
                        <img className='dog2' src="../images/dog2.jpg" alt=" 이미지2" />
                    </div>
               </div>
              <hr />
              <a href="/do_payment">후원기금 카드결제</a>       
                </div>
            </div>               
       
    
    );
}

export default DonationInformation;