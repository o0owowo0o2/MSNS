import React, { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

function NoticeDetail() {
    const[notice, setNotice] = useState({});

    const{noticeNumber} = useParams();

    const history = useHistory();

    useEffect(() => {
        const fetchNotice = async() => {
            try {
                const response = await axios.get(`http://localhost:9008/api/notices/${noticeNumber}`);
                setNotice(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchNotice();
    },[noticeNumber]);

    const handleDelete = async (noticeNumber) => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:9008/api/notices/${noticeNumber}`);
                alert('게시글이 삭제되었습니다.');
                // 삭제 성공 후, 게시글 목록에서 해당 게시글을 제거합니다.
                setNotice(notice.filter(notice => notice.noticeNumber !== noticeNumber));
            } catch (error) {
                console.error("게시글 삭제 실패", error);
            }
        }
    };

    const goToNoticeList =()=>{
        history.push('/noticeList');
    };
    
    return (
        <div className='divcss'>
            <h2 style={{textAlign:'center'}}>{notice.noticeTitle} </h2>
            <hr />
            <p>{notice.noticeContents}</p>
            {notice.imagePath && <img src={notice.imagePath} alt='Notice' style={{maxWidth:'100px', maxHeight:'100px'}} />}
            <p style={{textAlign:'right'}}>작성자 : {notice.noticeWriter}</p>
            <button onClick={goToNoticeList}>글 목록으로</button>           
        </div>
    );
}

export default NoticeDetail;