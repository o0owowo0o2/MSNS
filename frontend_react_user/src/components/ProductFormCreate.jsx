import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

function ProductForm() {
  const history = useHistory();

  const [product, setProduct] = useState({
    productNumber: '',
    productName: '',
    productDescription: '',
    seller: '',
  });

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

    // 이미디 파일 입력을 처리하는 함수입니다.
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      // setImage(file); // 첫번째 이미지 파일을 대상으로 설정 처리함
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("product", JSON.stringify(product));

    try {
      const response = await axios.post('http://localhost:9008/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('상품등록 되었습니다.');
      history.push('/SHOP'); // 메인 페이지로 이동 처리함
      console.log(response.data);
    } catch (error) {
      console.error('상품등록 실패', error);
      console.log('Response data:', error.response?.data); // 서버 응답 데이터 확인
      alert('상품등록에 실패했습니다.');
    }
  };

  return (
    <Container>
      <div style={{marginTop:'85px'}}> 
      <h2>상품 등록</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="productNumber">
          <Form.Label column sm={2}>상품번호</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="productNumber"
              placeholder="상품번호"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="productName">
          <Form.Label column sm={2}>상품이름</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="productName"
              placeholder="상품이름"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="productDescription">
          <Form.Label column sm={2}>상품설명</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="productDescription"
              placeholder="상품설명"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="seller">
          <Form.Label column sm={2}>판매자</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="seller"
              placeholder="판매자"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="imagePath">
          <Form.Label column sm={2}>상품 이미지</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              name="imagePath"
              onChange={handleImageChange}
            />
          </Col>
        </Form.Group>

        {imagePreview && (
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Image src={imagePreview} thumbnail />
            </Col>
          </Form.Group>
        )}

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit" className="mr-2">등록</Button>
            <Button variant="secondary" type="reset">취소</Button>
          </Col>
        </Form.Group>
      </Form>
      </div>
    </Container>
  );
}

export default ProductForm;
