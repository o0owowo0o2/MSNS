import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/myPage.css';

function LoginMain() {
    const history = useHistory();
    // [중요 : 3단계] 회원정보 표시 = 아래 1단계 소스 추가 코딩
    // 로컬 스토리지에서 'loggedInMember' 데이터를 가져와 파싱(구문분석)하여 
    // 객체(Object)로 저장 처리 합니다.
    const memberData = JSON.parse(localStorage.getItem("loggedInMember"));
    
    // 로그아웃 처리를 구현
    const handleLogout = ()=> {
        // [중요 : 5단계] 로그아웃 시 회원정보 삭제 및 로그아웃 알림
        // 아래 2줄 소스 추가 코딩
        // localStorage에서 loggedInMember 데이터를 삭제 처리합니다!
        localStorage.removeItem("loggedInMember");
        // 로그아웃 알림 메시지 표시 및 메인페이지로 이동.
        alert("로그아웃 되었습니다.")
        history.push('/');
    };
    const goToModifyRegister = () => {
        history.push("/modifyRegister");
    }
    const goToMain = () => {
        history.push('/');
      };
    
    return (
        <div className='divcss'>
            <div className='totalInfo'>
            <h2>내 정보</h2>
            <div className='basicInfo'>
            <h4 className='profile'>기본 정보</h4>
            <img 
                src={memberData?.imagePath} alt="프로필 이미지"
                style={{maxWidth:"90px", maxHeight:"200px"}}></img>
            {/* [중요 : 4단계] 회원정보 표시 = 아래 8줄 소스 추가 코딩 */}
            {/* 로그인한 회원의 번호를 표시합니다. */}
            <span className='myNum'>회원번호 : </span>
            <span className='value'>{memberData?.memberNumber}</span>
            <div className='line'></div>
            {/* 로그인한 회원의 아이디를 표시합니다. */}
            <span className='myId'>아이디 : </span>
            <span className='value'>{memberData?.memberId}</span>
            <div className='line'></div>
            {/* 로그인한 회원의 이름을 표시합니다. */}
            <span className='name'>이 름 : </span>
            <span className='value'>{memberData?.memberName}</span>
            <div className='line'></div>
            {/* 로그인한 회원의 성별을 표시합니다. */}
            <span className='gender'>성 별 : </span>
            <span className='value'>{memberData?.gender}</span>
            <div className='line'></div>
             {/* 로그인한 회원의 주민번호를 표시합니다. */}
             <span className='idNum'>주민번호 :</span> 
            <span className='value'>{memberData?.identity} - </span> <span className='value'>{memberData?.identityDetail}</span>
            <div className='line'></div>
            </div>
            <div className='contectInfo'>
            {/* 로그인한 회원의 전화번호를 표시합니다. */}
            <h4 className='connect'> 연락처 정보</h4>
            <span className='tel'>전화번호 :</span> 
            <span className='value'>{memberData?.memberPhone}</span>
            <div className='line'></div>
             {/* 로그인한 회원의 프로필 주소를 표시합니다. */}
            <span className='addr'>주소 : {memberData?.address}, </span>
            <span className='value'>{memberData?.addressDetail}</span>
            </div> {/* </ contectInfo */}
            </div> {/* </ totalInfo*/}
            <div className='button'>
            <button className='modiButton' onClick={goToModifyRegister}>수정</button>
            <button className='mainButton' onClick={goToMain}>메인화면</button>
            <button onClick={handleLogout}>로그아웃</button>

            </div>
        </div>
    );
}

export default LoginMain;