package com.springboot.react.controller;

import com.springboot.react.model.Payment;
import com.springboot.react.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    // PaymentService 인스턴스를 자동 주입받아 사용
    @Autowired
    private PaymentService paymentService;

    /**
     * 결제 정보를 처리하는 엔드포인트
     *
     * @param payment 결제 정보를 담고 있는 Payment 객체
     * @return 결제 처리 결과를 포함한 ResponseEntity 객체
     */
    @PostMapping("/process")
    public ResponseEntity<?> paymentDone(@RequestBody Payment payment) {
        try {
            // 결제 정보를 로그에 출력하여 수신 확인
            System.out.println("Received payment info: " + payment);

            // 결제 정보를 데이터베이스에 저장
            paymentService.insertPaymentSuccess(payment);

            // 결제 처리 성공 메시지를 포함한 ResponseEntity 객체 반환
            return ResponseEntity.ok().body("{\"message\": \"Payment processed successfully\"}");
        } catch (Exception e) {
            // 결제 처리 중 발생한 오류를 로그에 출력
            System.err.println("결제 처리 오류: " + e.getMessage());

            // 결제 처리 실패 메시지를 포함한 ResponseEntity 객체 반환
            return ResponseEntity.badRequest().body("{\"message\": \"Failed to process payment\"}");
        }
    }
}
