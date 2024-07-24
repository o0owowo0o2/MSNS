import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';


function ModifyRegister({match}) {

    const[member, setMember] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberPhone:''
    });
    
    const[image, setImage] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const fetchMemberData = async() => {
           try {              
               const response = await axios.put(`http://localhost:9008/api/members/${match.params.id}`);
               setMember({
                   memberPassword: response.data.memberPassword,
                   memberName: response.data.memberName,
                   memberPhone: response.data.memberPhone
                }); 
                } catch (error) {
                   console.error('정보를 불러오는데 실패했습니다.');
                }
        } 
        fetchMemberData(); 
    },[match.params.id]);

    const handleChange = (e)=> {
        const{name, value} = e.target();
            setMember({
                ...member,
                [name]: value    
            });
    };

    const handleImageChange =(e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('member', JSON.stringify(member));

        try {
            await axios.put(`http://localhost:9008/api/members/${match.params.id}`, formData, {
                headers:{
                    'Content-Type':'mutipart/form-data'
                }
            });
            alert('성공적으로 수정되었습니다!');
            history.push('/');
        } catch (error) {
            console.error('수정 실패', error);
            alert('내정보 수정에 실패했습니다!')
        }
    }

    const goToDelete = () => {
        history.push("/deleteRegister")
    }

    return (
        <div className='divcss'>
            <h2>내 정보 수정 페이지</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" name='memberId' placeholder='아이디' onChange={handleChange}/> <br />
                <input type="text" name='memberPassword' placeholder='비밀번호' onChange={handleChange}/> <br />
                <input type="text" name='memberName' placeholder='이름' onChange={handleChange}/> <br />
                <input type="text" name='memberPhone' placeholder='전화번호' onChange={handleChange}/> <br />
                <input type="file" onChange={handleImageChange} />
                <br />
                <button type='submit'>수정</button>
                <button type='reset'>취소</button>
                <button onClick={goToDelete}>회원탈퇴</button>

            </form>
        </div>
    );
}

export default ModifyRegister;