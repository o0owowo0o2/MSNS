import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contect_insert.css';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';

function CreateContect() {
    const history = useHistory();
    const goToMain = () => {
        history.push('/main');
    };

    const [contect, setContect] = useState({
        boardTitle: '',
        boardContents: '',
        boardWriter: '',
        boardEmail: '',
        boardPhone: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setContect({
            ...contect,
            [name]: val
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9008/api/contects', contect);
            alert("문의사항이 등록되었습니다");
            console.log(response.data);
            history.push('/main');
        } catch (error) {
            console.error("문의사항 작성이 실패하였습니다.", error);
            alert("문의사항 작성 실패");
        }
    };

    return (
        <div className="outer-container">
            <h1 className="text-center mb-4">멍쓰냥쓰</h1>
            <h3>문의사항 등록</h3>
            <h2>
                어떠한 내용이라도 답변드릴 준비가 되어 있습니다.
                문의를 보내주세요! 가능한 한 빨리 답변 드리도록 하겠습니다.
            </h2>
            <div className="contect-container">
                
                <form onSubmit={handleSubmit}>
                    <span>제목 :</span>
                    <input type="text" name="boardTitle" placeholder="제목" onChange={handleChange} />
                    <br />
                    <span>내용 :</span>
                    <textarea name="boardContents" size="80" placeholder="내용" onChange={handleChange} />
                    <br />
                    <span>작성자 :</span>
                    <input type="text" name="boardWriter" placeholder="작성자" onChange={handleChange} />
                    <br />
                    <span>이메일 :</span>
                    <input type="text" name="boardEmail" placeholder="이메일" onChange={handleChange} />
                    <br />
                    <span>전화번호 :</span>
                    <input type="text" name="boardPhone" placeholder="전화번호" onChange={handleChange} />
                    <br />
                    <div className="d-flex justify-content-between btns">
                        <button id="button" type="submit" className='btnReg'>등록</button>
                        <button type="reset">취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateContect;
