import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom'; // useHistory 임포트
import { useCart } from './CartContext'; // CartContext 임포트
import '../css/ProductDetail.css'; // CSS 파일 임포트

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState(''); // 알림 메시지 상태 추가
  const { id } = useParams();
  const { addToCart } = useCart(); // addToCart 함수 사용
  const history = useHistory(); // useHistory 훅 사용

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

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification('장바구니에 추가되었습니다!'); // 알림 메시지 설정
    setTimeout(() => {
      setNotification(''); // 3초 후 알림 메시지 지우기
      history.push('/cart'); // 장바구니 페이지로 이동
    }, 3000);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className='inner'>
      <div className="product-detail">
        <div className='innn'>
          <div className='image_list'>
            {product.imagePath && (
              <div className='item-item'>
                <img src={product.imagePath} alt={product.productName} />
              </div>
            )}
            <div className='upIcon'>
              <li className='listW'>
                <Link to="/product"><img src="/images/align_justify.svg" alt="list" /></Link>
              </li>
            </div>
          </div>
          <div className='goodsWrap'>
            <h1 className='titGoods'>{product.productName}</h1>
            <div className='item_name'>
              <div className="product-info">
                <p>{product.productDescription}</p>
              </div>
            </div>
            <div className='priceZone'>
              <span className='priZ'>
                가격 : 2,2000원
              </span>
              <span className='priS'>
                2,0000원
              </span>
            </div>
            <hr />
            <div className='add-info'>
              <div className='payBtnW'>
                <div className="payBtn">
                  <li onClick={() => handleAddToCart(product)}>장바구니에 추가</li>
                </div>
                <div className="payBtn">
                  <Link to="/payment" className="payment">결제하기</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
