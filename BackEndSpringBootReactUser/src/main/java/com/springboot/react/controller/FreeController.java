// 패키지 선언으로 이 클래스가 com.springboot.react.controller 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.controller;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Free;
import com.springboot.react.service.FreeService;
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
@RequestMapping("/api/frees")
public class FreeController {

    // PostService 타입의 객체를 선언합니다.
    private final FreeService freeService;

    // @Autowired 어노테이션은 Spring의 의존성 주입 기능을 이용하여
    // PostService 객체를 자동으로 주입받습니다.
    @Autowired
    public FreeController(FreeService freeService) {
        this.freeService = freeService;
    }

    // @GetMapping 어노테이션은 HTTP GET 요청을 처리합니다.
    // {id}는 경로 변수로, 실제 요청에서는 특정 아이디 값으로 대체됩니다.
    @GetMapping("/{id}")
    public ResponseEntity<Free> getFreeById(@PathVariable Long id) {
        Optional<Free> free = freeService.findById(id);
        // Optional 객체의 값이 존재하면 HTTP 상태 코드 200과 함께 반환,
        // 없으면 404 에러를 반환합니다.
        return free.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 페이징 처리를 추가한 게시글 목록 조회 메서드
    // @RequestParam은 URL의 쿼리 파라미터를 메소드의 파라미터로 매핑합니다.
    // 기본값으로 page는 0, size는 3으로 설정됩니다.
    @GetMapping
    public ResponseEntity<Page<Free>> getAllFrees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Free> frees = freeService.findAll(pageable);
        // 페이징 처리된 게시글 목록을 HTTP 상태 코드 200과 함께 반환합니다.
        return ResponseEntity.ok(frees);
    }
    
    // @PutMapping 어노테이션은 HTTP PUT 요청을 처리합니다.
    // 경로 변수 id와 요청 본문에 포함된 Post 객체를 받아 게시글을 업데이트합니다.
    @PutMapping("/{id}")
    public ResponseEntity<Free> updatePost(@PathVariable Long id, @RequestBody Free freeDetails) {
    	Free updatedFree = freeService.updateFree(id, freeDetails);
        return ResponseEntity.ok(updatedFree);
    }
    
    // @DeleteMapping 어노테이션은 HTTP DELETE 요청을 처리합니다.
    // 경로 변수 id로 지정된 게시글을 삭제합니다.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFree(@PathVariable Long id) {
        freeService.deleteFree(id);
        return ResponseEntity.ok().build();
    }

	@PostMapping
 public Free createFree(@RequestBody Free free) {
     // @RequestBody 어노테이션은 HTTP 요청의 본문을 Java 객체로 매핑합니다.
     // 이 메소드는 클라이언트로부터 받은 Post 객체를 postService를 통해 저장하고,
     // 저장된 Post 객체를 반환합니다.
     return freeService.saveFree(free);
 }
}
