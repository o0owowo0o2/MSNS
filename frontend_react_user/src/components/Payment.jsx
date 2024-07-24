import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Payment() {
  useEffect(() => {
    const IMP = window.IMP;  // window 객체에서 IMP를 가져옵니다.
    IMP.init("imp71765085");  // IMP 객체를 초기화하고 가맹점 식별코드를 설정합니다.

    // 페이지가 로드되면 handlePayment 함수를 호출합니다.
    handlePayment();
  }, []);

  const history = useHistory();


  
  const handlePayment = () => {
    const IMP = window.IMP;  // window 객체에서 IMP를 가져옵니다.
    IMP.request_pay({
      pg: "html5_inicis",  // 결제 PG사 설정
      pay_method: "card",  // 결제 수단 설정
      merchant_uid: `merchant_${new Date().getTime()}`,  // 주문번호 설정
      name: "Snack",  // 상품 이름
      amount: 10,  // 결제 금액
      buyer_email: "star@nate.com",  // 구매자 이메일
      buyer_name: "장나라",  // 구매자 이름
      buyer_tel: "010-1234-5678",  // 구매자 전화번호
      buyer_addr: "서울특별시 강남구 역삼동",  // 구매자 주소
      buyer_postcode: "11111",  // 구매자 우편번호
      m_redirect_url: "/paymentSuccess"  // 모바일 결제 후 리디렉션 될 URL
    }, function(rsp) {
      if (rsp.success) {
        // 결제 성공 시 로직
        const paymentInfo = {
          imp_uid: rsp.imp_uid,  // 결제 고유번호
          merchant_uid: rsp.merchant_uid,  // 주문번호
          pay_amount: rsp.paid_amount,  // 결제 금액
          apply_num: rsp.apply_num,  // 카드 승인번호
          per_time: new Date()  // 현재 시간
        };

        // Axios를 사용하여 서버에 결제 정보를 JSON 형태로 전송
        axios.post('http://localhost:9008/api/payment/process', paymentInfo, {
          headers: {
            'Content-Type': 'application/json'  // 콘텐츠 타입을 JSON으로 설정
          }
        }).then(response => {
          console.log('결제 정보가 서버로 성공적으로 전송되었습니다.', response.data);
          // 성공 후 완료 팝업을 띄우고 페이지 이동
          alert('결제가 완료되었습니다.');
         history.push('/paymentSuccess'); // 결제 성공 후 성공페이지
        }).catch(error => {
          console.error('결제 정보 전송 에러', error);  // 에러 시 콘솔에 오류를 출력
        });
      } else {
        // 결제 실패 시 로직
        alert(`결제 실패: ${rsp.error_msg}`);  // 결제 실패 메시지를 출력
      }
    });
  };

  return (
    <div>
      <p>결제 진행 중...</p>
    </div>
  );
}

export default Payment;  // Payment 컴포넌트를 기본 내보내기 설정
