package com.springboot.react.service;

import com.springboot.react.model.Payment;

public interface PaymentService {
    /**
     * 결제 성공 시 호출되는 메소드
     * 결제 정보를 데이터베이스에 저장하는 역할을 함
     *
     * @param payment 결제 정보를 담고 있는 Payment 객체
     */
    void insertPaymentSuccess(Payment payment);
}