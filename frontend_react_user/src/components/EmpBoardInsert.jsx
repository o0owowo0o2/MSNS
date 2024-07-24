// rsf
import React, { useState } from 'react';
import axios from 'axios';

import "../css/EmpBoardInsert.css";

function EmpBoardInsert() {

    const [post, setPost] = useState({
        boardTitle: '',
        boardContents: '',
        boardWriter: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        // post 객체에 담긴 데이터를 설정(set) 처리 합니다.
        setPost({
            // 스프레드쉬트 연산자(...)를 활용하여
            // post 객체에 담아줍니다.
            ...post,
            // name 속성에 입력되어지는 값(value)들을
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:9008/api/posts', post);
            alert('게시글이 등록 되었습니다!');
            console.log(response.data);
        } catch(error){
            console.error("게시글 등록 실패", error);
            alert('게시글 등록에 실패했습니다!');
        }
    };

    return (
        <div className='inner'>
            <div className='in'>
            <div className='titWrapper'>
                            <h2 className='brdregit'>게시글 등록</h2>
            </div>
                <div className='page-body'>
                    <div className='bbs-table-write'>
                      
                        <fieldset>
                            <table className='tableWrap'>
                        
                                     <colgroup>
                                        <col width={50}></col>
                                       
                                        
                                        
                                        
                                    </colgroup>  

                                    <tbody>
                                        <tr>
                                            <th><div className='ModiCon'>제목 </div></th>
                                                <td>
                                                    <div>
                                                        <form onSubmit={handleSubmit} className='form'>
                                                                <input type='text' name='boardTitle' size={70}  onChange={handleChange} className='brdTit' /> 
                                                        </form>  
                                                    </div>  
                                                </td>
                                        </tr>

                                        <tr> 
                                            <th><div className='ModiCon'>내용</div></th>
                                                <td>
                                                    <div>  
                                                        <textarea name='boardContents' rows={10} cols={45} onChange={handleChange} className='brdCon' />
                                                    </div> 
                                                </td>
                                        </tr> 

                                        <tr>   
                                            <th><div className='ModiCon'>작성자</div></th>
                                                <td>
                                                    <div>
                                                    <input type='text' name='boardWriter' size={70} onChange={handleChange} className='brdWri' />
                                                    </div>
                                                </td>
                                        </tr>    
                                        <br />
                                       <dl className='bbs-link-btm '>

                                       </dl>
                                      
                                         
                                    </tbody>
                            </table>
                                       <div className='brdWr'>
                                        <button type='submit'className='brdSub'>등록</button>
                                        <button type='reset' className='brdCan' >취소</button> 
                                        </div>  
                            
                        </fieldset>     
                </div>     
                </div>
            </div>
        </div>
    );
}

export default EmpBoardInsert;