import React from 'react';
import {useHistory} from 'react-router-dom';

function LoginMain() {

    const history =useHistory ();

    const memberData = JSON.parse(localStorage.getItem("loggedInMember"));

    const handleLogout = () => {

        //로그아웃시 회원정보 삭제 및 로그아웃 알림
        localStorage.removeItem("loggedInMember");

        //로그아웃 메세지 표시
        alert("로그아웃 되었습니다");

        history.push('/');
    };

    return (
        <div>
            <h2>로그인 성공 페이지</h2>

            <p>아이디: {memberData?.memberId}</p>
            {/* {로그인한 회원의 이름을 표시합니다} */}
            <p>이름 : {memberData?.memberName}</p>
            {/* 로그인한 회원의 이름을 표시합니다 */}
            <img
                src={memberData?.imagePath}
                alt="프로필 이미지"
                style={{maxWidth:"200px", maxHeight:"200px"}}
                />
                <br />

            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default LoginMain;