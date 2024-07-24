// src/main/java/com/springboot/react/repository/ProductRepository.java
package com.springboot.react.repository;

import com.springboot.react.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
