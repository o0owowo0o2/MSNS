import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/membermain.css';

function MemberMain() {


    const history = useHistory();


    const handleMemberPage = () => {
        history.push('/register');
    };

    const [loginInfo, setLoginInfo] = useState ({memberId:'', memberPassword:''});

    const handleChange = (e)=>{
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
    };

    const handleLogin = async() => {
        try {
            const response = await axios.post('http://localhost:9008/api/members/login', loginInfo, {
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            //중요 2단계
            if(response.status === 200){
                //서버로부터 받은 데이터를 memberdata 변수에 대입해 줍니다
                const memberData = response.data;
                //로컬 스토리지에 로그인정보(memberdata)를 저장처리 합니다
                localStorage.setItem("loggedInMember", JSON.stringify(memberData));
                //크롬 웹브라우저의 콘솔 탭에서 memberData 정보 확인
                console.log(memberData);
                alert("로그인에 성공하셨습니다");
                history.push("/loginMain");
            } else {
                alert(response.data); //서버로 부터 받은 데이터 응답표시
            }

            // 중요 1단계 회원정보 표시 아래 3줄 소스 주석 처리
            // console.log(response.data);
            // alert(response.data);
            // history.push('/loginMain'); //로그인 성공시 로그인 메인 페이지로 이동


        }   catch(error) {
            console.error('로그인 에러', error)
            if(error.response){
                //서버응답이 있는경우 ,그 메세지를 alert로 표시합니다
                alert(error.response.data);
        }   else {
            //서버응답이 없는경우, 일반 에러 메세지 표시
            alert('로그인 처리중 문제가 발생하였습니다.');
        }
      }   
    };

    const handleCancle = () =>{
        setLoginInfo({memberId:'',memberPassword:''}); //로그인 정보 초기화
    }

    return (
        <div className='inner'>
        <div className='in'>
        <div>
           
              
            <div className='logLogo'>
                <img src="icons/Icon_dog_cat.svg" alt="logo" className='dogCatLo' />
                <div className='titMeong'>
                <p className='meongss'>멍쓰냥쓰</p>
                </div>
            </div>
          
                <div className='input_form'>
                    <div className='IdSpot'>
                         <input type='text' name='memberId' value={loginInfo.memberId} onChange={handleChange} size={27} placeholder='아이디' style={{marginBottom:'10px'} }/>
                    </div>
                   
                    <input type='password' name='memberPassword' value={loginInfo.memberPassword}size={27} onChange={handleChange} placeholder='비밀번호'
                    style={{marginBottom:'20px'}}/>
                </div>
            < br />
            <div className='LogBtnW'>
            <button onClick={handleLogin} className='LogBt' >로그인</button>
            <button onClick={handleCancle} className='LogBt'>취소</button>
            </div>
            
           </div>
        </div>
        </div>
    );
}

export default MemberMain;