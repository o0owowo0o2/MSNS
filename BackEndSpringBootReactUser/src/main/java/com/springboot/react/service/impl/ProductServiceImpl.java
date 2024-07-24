// src/main/java/com/springboot/react/service/ProductServiceImpl.java
package com.springboot.react.service.impl;

import com.springboot.react.entity.Product;
import com.springboot.react.repository.ProductRepository;
import com.springboot.react.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductByProductNumber(Long productNumber) {
        return productRepository.findById(productNumber).orElse(null);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long productNumber) {
        productRepository.deleteById(productNumber);
    }
}
