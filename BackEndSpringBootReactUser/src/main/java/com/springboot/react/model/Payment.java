package com.springboot.react.model;

import javax.persistence.*;
import java.util.Date;

import lombok.Data;

@Data // Lombok 라이브러리를 사용하여 getter, setter, toString 등의 메소드를 자동으로 생성
@Entity // JPA 엔티티임을 나타냄
@Table(name = "pay_import") // 엔티티와 매핑할 테이블 이름을 지정
public class Payment {
    @Id // 기본 키(primary key)임을 나타냄
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq_gen") // 시퀀스를 사용하여 기본 키 값을 자동으로 생성
    @SequenceGenerator(name = "payment_seq_gen", sequenceName = "idx_seq", allocationSize = 1) // 시퀀스 제너레이터 설정, 시퀀스 이름과 할당 크기 설정
    private Long pay_id; // 결제 ID, 기본 키

    private String imp_uid; // 아임포트 결제 고유번호
    private String merchant_uid; // 가맹점 주문번호
    private int pay_amount; // 결제 금액
    private String apply_num; // 카드 승인번호
    private Date per_time; // 결제 시간
}