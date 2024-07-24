import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../css/add.css';  // CSS 파일을 import합니다.

// 주소 검색 컴포넌트를 정의합니다.
function AddressSearch() {
  const [postcode, setPostcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [guideText, setGuideText] = useState('');

  const handleAddressSearch = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        let extraRoadAddr = '';

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        extraRoadAddr = extraRoadAddr ? ` (${extraRoadAddr})` : '';

        setPostcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setJibunAddress(data.jibunAddress);
        setExtraAddress(extraRoadAddr);

        if (data.autoRoadAddress) {
          const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          setGuideText(`(예상 도로명 주소: ${expRoadAddr})`);
        } else if (data.autoJibunAddress) {
          const expJibunAddr = data.autoJibunAddress;
          setGuideText(`(예상 지번 주소: ${expJibunAddr})`);
        } else {
          setGuideText('');
        }
      }
    }).open();
  }, []);

  return (
    <div className="address-search-container">
      <h2>주소지 입력</h2>
      <input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="우편번호" readOnly />
      <button onClick={handleAddressSearch}>우편번호 찾기</button><br />
      <input type="text" value={roadAddress} size={45} onChange={e => setRoadAddress(e.target.value)} placeholder="도로명주소" readOnly /><br />
      <input type="text" value={jibunAddress} size={45} onChange={e => setJibunAddress(e.target.value)} placeholder="지번주소" readOnly /><br />
      <input type="text" value={detailAddress} size={45} onChange={e => setDetailAddress(e.target.value)} placeholder="상세주소" /><br />
      <input type="text" value={extraAddress} size={45} onChange={e => setExtraAddress(e.target.value)} placeholder="참고항목" readOnly />
      <span style={{ color: '#999', display: guideText ? 'inline' : 'none' }}>{guideText}</span>
    </div>
  );
}

function AddrDaumKakao02() {
  const history = useHistory();

  const goToMain = () => {
    history.push('/');
  };

  return (
    <Router>
      <Route path="/daum_kakao_addr_02" component={AddressSearch} />
      <div className="main-button-container">
        <button onClick={goToMain}>메인으로 가기</button>
      </div>
    </Router>
  );
}

export default AddrDaumKakao02;
