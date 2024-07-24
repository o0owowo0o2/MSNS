// src/components/CartPage.js
import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CartPage.css';  // CSS 파일 임포트

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Container style={{ paddingTop: '85px' }}>
      <h1 className="my-4 cart-title">장바구니</h1>
      {cart.length === 0 ? (
        <p>장바구니에 상품이 없습니다.</p>
      ) : (
        <Row>
          {cart.map((product) => (
            <Col key={product.productNumber} md={4} className="mb-4">
              <Card className="cart-card">
                {product.imagePath && (
                  <Card.Img variant="top" src={product.imagePath} alt={product.productName} />
                )}
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>{product.productDescription}</Card.Text>
                  <Card.Text><strong>Seller:</strong> {product.seller}</Card.Text>
                  <Button variant="danger" onClick={() => removeFromCart(product.productNumber)}>제거</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <div className="cart-buttons my-4">
        <Link to="daum_kakao_addr_02" className="btn btn-primary me-2">주소입력</Link>
        <Link to="/payment" className="btn btn-success me-2">결제하기</Link>
        <Link to="/SHOP" className="btn btn-secondary">리스트로 돌아가기</Link>
      </div>
    </Container>
  );
};

export default CartPage;
