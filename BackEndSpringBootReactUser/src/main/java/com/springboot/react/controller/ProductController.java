package com.springboot.react.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.react.entity.Product;
import com.springboot.react.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productNumber}")
    public ResponseEntity<Product> getProductByProductNumber(@PathVariable Long productNumber) {
        Product product = productService.getProductByProductNumber(productNumber);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{productNumber}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productNumber,
                                                 @RequestParam("image") MultipartFile file,
                                                 @RequestParam("product") String productStr) throws IOException {
        Product existingProduct = productService.getProductByProductNumber(productNumber);
        if (existingProduct != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            Product productDetails = objectMapper.readValue(productStr, Product.class);

            existingProduct.setProductNumber(productDetails.getProductNumber());
            existingProduct.setProductName(productDetails.getProductName());
            existingProduct.setProductDescription(productDetails.getProductDescription());
            existingProduct.setSeller(productDetails.getSeller());

            // 이미지 파일 처리
            if (file != null && !file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/downloadFile/")
                        .path(fileName)
                        .toUriString();
                existingProduct.setImagePath(fileDownloadUri);
            }

            Product updatedProduct = productService.saveProduct(existingProduct);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 이미지 파일이 저장될 기본 위치를 지정합니다.
    private final Path rootLocation = Paths.get("C:/react_images");

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file,
                                         @RequestParam("product") String productStr) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(productStr, Product.class);

        // 파일 저장 로직: 업로드된 파일을 서버에 지정된 위치에 저장합니다.
        String fileName = file.getOriginalFilename();
        Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        // 이미지 파일 접근 경로를 생성합니다.
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        product.setImagePath(fileDownloadUri);

        // Post 객체를 데이터베이스에 저장하고, 저장된 객체를 반환받습니다.
        Product savedProduct = productService.saveProduct(product);

        // 응답으로 게시글의 ID와 함께 성공 메시지를 반환합니다.
        return ResponseEntity.ok("게시글이 등록되었습니다. ID: " + savedProduct.getProductNumber());
    }

    @DeleteMapping("/{productNumber}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productNumber) {
        productService.deleteProduct(productNumber);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
