
/* global kakao */

import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import '../css/location.css';

const kakaoMapScript = () => {  

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.33935, 127.1092), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(37.33935, 127.1092); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);   
    
    // window 객체 활용 map 안에 마커 중앙 표시 : resize 처리(추가 코딩)
 window.addEventListener('resize', function(){
    map.setCenter(new kakao.maps.LatLng(37.33935, 127.1092))
});

}

function Location() {
    useEffect(() => {
        kakaoMapScript();
    }, []);
    return (
        <Container>
            <div id='location'>
                <div className='location-main-title'>
                    <br />
                    <h1>찾아오시는 길</h1>
                    <br />
                    <p>경기도 성남시 분당구 구미1동 성남대로 38 2층<br />
                    수인분당선, 신분당선
                    </p>
                </div>
                <br /><hr />        
                <div id="map" style={{width:'100', height:'400px'}}></div>
                <br />
                <a className="location-a" href="https://kko.to/PZUnfAqBEW" target='blank'>Kakao Map으로 보기</a>
                <div className='location-contant'>
                    <br />
                    <h4>안내사항</h4>
                    <p>전화문의 : 0000-0000 <br />
                    운영시간 : 평일 9:00 ~ 18:00</p>
                    <br />
                    <h4>주차안내</h4>
                    <p>회사에 방문해 주신 분들께는 1층 안내데스크에서 주차 1시간 이용권을 배포하고 있습니다.
                    <br />주차수요 과포화 및 교통 혼잡이 예상될 경우 주차장 이용이 제한될 수 있습니다.</p>
                </div>
            </div>
        </Container>
    );
}

export default Location;