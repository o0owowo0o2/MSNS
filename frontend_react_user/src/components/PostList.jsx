// rsf
import React, { useState } from 'react';
import axios from 'axios';
import "../css/postlist.css";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PostList() {

    const[posts, setPosts] = useState([]);

    const history = useHistory();

    // 백엔드에서 게시글 목록을 조회하는 함수
    const fetchPosts = async() => {
        try{
            console.log('게시글 목록 조회 요청 시작');
            const response = await axios.get('http://192.168.10.58:3000/postlist');
            console.log('응답 데이터:', response.data);
            // 서버로부터 받은 데이터를 직접 상태에 저장
            setPosts(response.data); 
        } catch(error){
            console.error("게시글 목록 조회 에러", error);
            alert("게시글 목록 조회 실패!");
        }
    };

    const goToRegister = () => {
        history.push('/register'); // 메인 페이지로 이동합니다.
    };

     

    return (
        <div className='inner'>
            <div className='in'>
            <div className='wrapper'>
                <h2 className='eBrd'>직원용 게시판</h2>      
            </div>
            <div className='brdWrp'>
                <table className='board' >
            
                <thead>
    
                        <tr>
                        <th scope ="col">제목 </th>
                        <th scope ="col">내용 </th>
                        <th scope ="col">작성자 </th>
                        </tr>
                    
                    </thead>
                    <tbody>

                    {posts.map(post => (
                        <tr key={post.boardNumber}>
                        

                            <td className="fbTitle">{post.boardTitle}</td>
                            

                        <Link to={`/posts/${post.boardNumber}`}>
                            <td className='fbCon'>{post.boardContents}</td>
                            </Link>
                            <td className='fbWri'>작성자 : {post.boardWriter}</td>
                        </tr>
                    ))}
                   

                    </tbody>
                    
            </table>
            </div>
             <div className='btnWrap'>

             <div className='funBtn'>  <li onClick={fetchPosts} className='BSrc'>게시글 목록조회</li></div>
             <div className='funBtn'>   <li onClick={goToRegister} className='BWri'>작성하기</li> </div>


            </div>
            </div>
        </div>
    );
}



export default PostList;