// 패키지 선언으로 이 클래스가 com.springboot.react.service.impl 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Contect;
import com.springboot.react.repository.ContectRepository;
import com.springboot.react.service.ContectService;

// @Service 어노테이션은 이 클래스가 비즈니스 서비스 계층의 컴포넌트임을 스프링에 알려주며,
// 스프링 IoC 컨테이너에 의해 관리되는 빈으로 등록됩니다.
@Service
public class ContectServiceImpl implements ContectService {

    // PostRepository 인터페이스 타입의 postRepository 필드 선언
    private final ContectRepository contectRepository;

    // @Autowired 어노테이션을 사용하여 PostRepository의 인스턴스를 자동 주입 받습니다.
    @Autowired
    public ContectServiceImpl(ContectRepository contectRepository) {
        this.contectRepository = contectRepository;
    }


 @Override
 @Transactional
 public Contect saveContect(Contect contect) {
     // postRepository의 save 메서드를 호출하여 Post 객체를 데이터베이스에 저장합니다.
     // save 메서드는 저장된 Post 객체를 반환합니다.
     return contectRepository.save(contect); // 게시글 저장
 }
}
