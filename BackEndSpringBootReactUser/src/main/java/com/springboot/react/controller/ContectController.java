 // 패키지 선언으로 이 클래스가 com.springboot.react.controller 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.controller;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Contect;
import com.springboot.react.service.ContectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

// @RestController 어노테이션은 이 클래스가 RESTful 컨트롤러임을 나타내며,
// 스프링 컨테이너에 의해 관리되는 빈으로 등록됩니다.
@RestController
// @RequestMapping 어노테이션은 이 컨트롤러의 모든 메소드에 적용될 기본 URL 경로를 설정합니다.
@RequestMapping("/api/contects")
public class ContectController {

    // PostService 타입의 객체를 선언합니다.
    private final ContectService contectService;

    // @Autowired 어노테이션은 Spring의 의존성 주입 기능을 이용하여
    // PostService 객체를 자동으로 주입받습니다.
    @Autowired
    public ContectController(ContectService contectService) {
        this.contectService = contectService;
    }


 // @PostMapping은 HTTP POST 요청을 처리하는 메소드임을 나타내는 어노테이션입니다.
 // 메소드 위에 별도의 경로를 지정하지 않았기 때문에, 클래스 레벨의 @RequestMapping의 경로를 사용합니다.
 @PostMapping
 public Contect createContect(@RequestBody Contect contect) {
     // @RequestBody 어노테이션은 HTTP 요청의 본문을 Java 객체로 매핑합니다.
     // 이 메소드는 클라이언트로부터 받은 Post 객체를 postService를 통해 저장하고,
     // 저장된 Post 객체를 반환합니다.
     return contectService.saveContect(contect);
 }

}
