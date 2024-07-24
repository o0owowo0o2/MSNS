// src/main/java/com/springboot/react/service/ProductService.java
package com.springboot.react.service;

import com.springboot.react.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    
    Product getProductByProductNumber(Long productNumber);
    
    Product saveProduct(Product product);
    
    void deleteProduct(Long productNumber);
}
