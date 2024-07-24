package com.springboot.react.service.impl;

import com.springboot.react.model.Payment;
import com.springboot.react.repository.PaymentRepository;
import com.springboot.react.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class PaymentServiceImpl implements PaymentService {

    // PaymentRepository 인스턴스를 자동 주입받아 사용
    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * 결제 정보를 데이터베이스에 저장하는 메소드
     * 
     * @param payment 결제 정보를 담고 있는 Payment 객체
     */
    @Override
    public void insertPaymentSuccess(Payment payment) {
        // 결제 정보를 로그에 출력하여 저장 시도를 확인
        System.out.println("결제 정보 저장 시도: " + payment);

        // 현재 시간을 결제 시간으로 설정
        payment.setPer_time(new Timestamp(System.currentTimeMillis()));

        // Payment 객체를 데이터베이스에 저장
        paymentRepository.save(payment);

        // 저장 성공 메시지를 로그에 출력
        System.out.println("결제 정보 저장 성공");
    }
}