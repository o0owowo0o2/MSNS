import React, { useCallback } from 'react';
import { Container } from 'react-bootstrap';

// 주소 검색 컴포넌트
function AddressSearch() {
  // 주소 검색 버튼 클릭 시 실행될 함수
  const handleAddressSearch = useCallback(() => {
    // Daum 주소 검색 API를 호출
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = ''; // 주소 저장 변수
        let extraAddr = ''; // 참고 항목 저장 변수

        // 사용자가 선택한 주소 타입에 따라 주소 정보를 설정
        if (data.userSelectedType === 'R') { // 도로명 주소인 경우
          addr = data.roadAddress;
        } else { // 지번 주소인 경우
          addr = data.jibunAddress;
        }

        // 도로명 주소 선택 시, 참고항목을 추가
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          extraAddr = extraAddr ? ` (${extraAddr})` : '';
        }

        // 주소와 참고 항목을 합친 전체 주소
        const fullAddress = `${addr} ${extraAddr}`;

        // 부모 창으로 전체 주소를 전달하고 팝업 창을 닫음
        window.opener.postMessage({ fullAddress }, '*');
        window.close();
      }
    }).open();
  }, []);

  return (
    <Container>
    <div className='divcss'>
      <input type="text" placeholder="우편번호" readOnly />
      <button onClick={handleAddressSearch}>우편번호 찾기</button><br />
      <input type="text" placeholder="주소" size={45} readOnly /><br />
      <input type="text" size={45} placeholder="상세주소" /><br />
    </div>
    </Container>
  );
}

// 주소 검색 페이지를 렌더링하는 컴포넌트
function Address() {
  return (
    <div>
      <AddressSearch />
    </div>
  );
}

export default Address;
