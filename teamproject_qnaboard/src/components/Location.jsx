
/* global kakao */

import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';

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
            <div className='divcss'>
                <p>찾아오시는 길</p>
                <hr />
                <div id="map" style={{width:'100', height:'400px'}}></div>
                <p>
                    <Link to="/main">Main</Link>
                </p>
            </div>
        </Container>
    );
}

export default Location;