// src/components/Product.js
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, onDeleteProduct }) => {
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <h2>{product.productName}</h2>
      </Link>
      <img src={product.productImage} alt={product.productName} style={{ width: '100px' }} />
      <p>{product.productDescription}</p>
      <p>Seller: {product.seller}</p>
      <Link to={`/edit/${product.id}`}>Edit</Link>
      <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
    </div>
  );
};

export default Product;
