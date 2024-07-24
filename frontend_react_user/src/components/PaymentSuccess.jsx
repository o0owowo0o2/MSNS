import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import '../css/paymentsuccess.css';

function PaymentSuccess() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9008/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className='inner'>
            <div className='descS'>
                <h1 className='PayTit'>결제완료</h1>
                <p className='payDesc'>결제 처리가 제대로 되었습니다.</p>
                <div className='logLogo'>
                <img src="icons/Icon_dog_cat.svg" alt="logo" className='dogCatLo' />
              
            </div>
              
                <div className='anotherC'>
                <Link to='/product'>
                <div className='othP'>
                 다른 상품 구경하기
                 </div>
                 </Link>
                
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
