import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

function ProductFormEdit() {
  const { id } = useParams();
  const history = useHistory();

  const [product, setProduct] = useState({
    productNumber: '',
    productName: '',
    productDescription: '',
    seller: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // 기존 상품 데이터를 불러오는 함수입니다.
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9008/api/products/${id}`);
        const productData = response.data;
        setProduct(productData);
        if (productData.imagePath) {
          setImagePreview(`http://localhost:9008/${productData.imagePath}`);
        }
      } catch (error) {
        console.error('상품 데이터를 불러오는데 실패했습니다.', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('product', JSON.stringify(product));

    try {
      const response = await axios.put(`http://localhost:9008/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('상품이 수정되었습니다.');
      history.push('/SHOP');
      console.log(response.data);
    } catch (error) {
      console.error('상품 수정 실패', error);
      console.log('Response data:', error.response?.data);
      alert('상품 수정에 실패했습니다.');
    }
  };

  return (
    <Container>
      <h2>상품 수정</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="productNumber">
          <Form.Label column sm={2}>상품번호</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="productNumber"
              placeholder="상품번호"
              value={product.productNumber}
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
              value={product.productName}
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
              value={product.productDescription}
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
              value={product.seller}
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
            <Button variant="primary" type="submit" className="mr-2">수정</Button>
            <Button variant="secondary" type="reset">취소</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default ProductFormEdit;
