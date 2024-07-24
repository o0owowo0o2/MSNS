package com.springboot.react.repository;

import com.springboot.react.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // 이 인터페이스가 스프링 데이터 JPA 레포지토리임을 나타냄
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // JpaRepository를 상속받아 Payment 엔티티와 연동되는 레포지토리를 정의
    // JpaRepository는 기본적인 CRUD 메소드(findAll, findById, save, delete 등)를 제공
    // Payment 엔티티와 Long 타입의 ID를 사용
}
