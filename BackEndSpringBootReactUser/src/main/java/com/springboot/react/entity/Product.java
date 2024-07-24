package com.springboot.react.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    @SequenceGenerator(name = "product_seq", sequenceName = "product_seq", allocationSize = 1)
    private Long productNumber;

    @Column(nullable = true)
    private String productName;

    @Column(nullable = true)
    private String productDescription;

    @Column(nullable = true)
    private String seller;
    
    // 이미지 파일의 저장 경로, NULL 허용
    @Column(nullable = true)
    private String imagePath; // 추가 설명: 회원 프로필 이미지 경로, 이미지가 없을 경우 NULL 가능

    // constructors, getters, setters, etc.
}