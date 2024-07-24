import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 5;

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:9008/api/products');
    setProducts(response.data);
    setFilteredProducts(response.data); // 초기에는 모든 제품이 필터링된 제품에 포함됨
  };

  const handleDeleteProduct = async (productNumber) => {
    await axios.delete(`http://localhost:9008/api/products/${productNumber}`);
    const updatedProducts = products.filter((p) => p.productNumber !== productNumber);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts); // 삭제 후 필터링된 제품 목록도 업데이트
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const filtered = products.filter(product => 
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalSlots = Math.ceil(currentProducts.length / 5) * 5;
  const emptySlots = totalSlots - currentProducts.length;

  return (
    <div className="products-list-container">
      <h1>상품 목록</h1>
        <span className='add'><Link to="/add">상품 추가</Link></span>
      <div className='searchs-container'>
        <input className='input'
          type="text" 
          placeholder="검색어를 입력하세요" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button className='searchsButton' onClick={handleSearch}>검색</button>
      </div>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div key={product.productNumber} className="products-item">
            <Link to={`/products/${product.productNumber}`} className="products-name-link">
              <h3>[상품이름]</h3> 
              <h4>{product.productName}</h4>
            </Link>
            <p>{product.productDescription}</p>
            <p>판매자: {product.seller}</p>
            <img src={product.imagePath} alt={product.productName} className="products-image" />

            <Link to={`/edit/${product.productNumber}`}>수정</Link>
            <div className='delete' onClick={() => handleDeleteProduct(product.productNumber)}>삭제</div>
          </div>
        ))}
        {Array.from({ length: emptySlots }, (_, index) => (
          <div key={`empty-${index}`} className="products-item empty"></div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => handleClick(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
