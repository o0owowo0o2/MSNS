import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import { Container } from 'react-bootstrap';

// 회원 가입 컴포넌트
function Register() {
  const history = useHistory();

  // 메인 페이지로 이동하는 함수
  const goToMain = () => {
    history.push('/');
  };

  // 회원 정보 상태 관리
  const [member, setMember] = useState({
    memberId: '',
    memberPassword: '',
    memberName: '',
    memberPhone:'',
    address:'',
    addressDetail:'',
    gender:'',
    identity:'',
    identityDetail:'', 
    imagePath: 'C:/react_images/user.png'
  });

  const [selectedFile, setSelectedFile] = useState(null); // 선택한 파일 상태
  const [previewUrl, setPreviewUrl] = useState(null); // 이미지 미리보기 URL 상태

  // 팝업 창에서 전달된 메시지를 처리하는 useEffect
  useEffect(() => {
    const handleMessage = (event) => {
      // 메시지에 전체 주소가 포함되어 있으면 주소 상태 업데이트
      if (event.data.fullAddress) {
        setMember((prevMember) => ({
          ...prevMember,
          address: event.data.fullAddress
        }));
      }
    };

    window.addEventListener('message', handleMessage); // 메시지 이벤트 리스너 추가
    return () => {
      window.removeEventListener('message', handleMessage); // 메시지 이벤트 리스너 제거
    };
  }, []);

  // 입력 필드 변경 시 상태 업데이트 함수
  const handleInputChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // 파일 선택 시 상태 및 미리보기 URL 업데이트 함수
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // 회원 가입 폼 제출 시 실행되는 함수
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile); // 선택한 파일 추가
    formData.append('member', JSON.stringify(member)); // 회원 정보 추가

    try {
      // 회원 가입 API 호출
      const response = await axios.post('http://localhost:9008/api/members/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      alert('회원가입이 완료되었습니다.');
      history.push('/'); // 회원 가입 성공 시 메인 페이지로 이동
    } catch (error) {
      console.log('회원 가입 실패 : ', error);
      alert('회원 가입에 실패했습니다.');
    }
  };

  // 주소 검색 팝업 창 열기 함수
  const openAddressPopup = () => {
    window.open('/address', 'address', 'width=600,height=400');
  };

  return (
    <Container>
      <div className='divcss'>
        <h2>멍쓰냥쓰</h2>
        <div className='register-form'>
          <div className='image-preview'>
            {/* 이미지 미리보기 */}
            <img src={previewUrl || "http://localhost:9008/react_images/user.png"} alt='프로필 이미지' 
            style={{maxHeight:'75px', maxWidth:'75px'}}/>
          </div>
          <form onSubmit={handleSubmit} className='form-content'>
            <div className='text-form'>
            <input className='choice' type="file" onChange={handleFileChange} /><br />
            <label>아 이 디 : <input type="text" name='memberId' placeholder='아이디' onChange={handleInputChange} /></label>
            <label >비밀번호 : <input type="password" name='memberPassword' placeholder='비밀번호' onChange={handleInputChange} /></label>
            <label >이 름 : <input type="text" name='memberName' placeholder='이름' onChange={handleInputChange} /></label>
            <label >성 별 : <input type="text" name='gender' placeholder='성별' onChange={handleInputChange} /></label>
            <label >주민번호 : <input type="text" name='identity' placeholder='앞6자리' onChange={handleInputChange} size={5} className='identity1'/>  <input type="text" name='identityDetail' placeholder='뒤7자리' onChange={handleInputChange} size={5}/></label>
            <label >전화번호 : <input type="text" name='memberPhone' placeholder='010-0000-0000' onChange={handleInputChange} /></label>
            {/* 주소 필드와 주소 검색 버튼 */}
            <div className='address-field'>
              <label>주 소 : <input type="text" name='address' placeholder='주소' value={member.address} onChange={handleInputChange} className='addrInput'/></label>
              <button type="button" onClick={openAddressPopup}>검색</button>
            </div>
            <label>상세주소 : <input type="text" name='addressDetail' placeholder='상세주소' onChange={handleInputChange} /><br /></label>
            </div>
            <div className='submit'>
            <button type='submit' className='subButton'>회원 가입</button>
            <button onClick={() => {history.goBack();}}>취소</button>
            </div>
          </form>
        </div>
        <div className='main-button'>
          <button onClick={goToMain}>메인으로 이동</button>
        </div>
      </div>
    </Container>
  );
}

export default Register;
