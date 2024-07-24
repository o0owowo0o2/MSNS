// 패키지 선언으로 이 클래스가 com.springboot.react.controller 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.controller;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Community;
import com.springboot.react.service.CommunityService;
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
//community
// @RequestMapping 어노테이션은 이 컨트롤러의 모든 메소드에 적용될 기본 URL 경로를 설정합니다.
@RequestMapping("/api/communitys")
public class CommunityController {

    // PostService 타입의 객체를 선언합니다.
    private final CommunityService communityService;

    // @Autowired 어노테이션은 Spring의 의존성 주입 기능을 이용하여
    // PostService 객체를 자동으로 주입받습니다.
    @Autowired
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    // @GetMapping 어노테이션은 HTTP GET 요청을 처리합니다.
    // {id}는 경로 변수로, 실제 요청에서는 특정 아이디 값으로 대체됩니다.
    @GetMapping("/{id}")
    public ResponseEntity<Community> getPostById(@PathVariable Long id) {
        Optional<Community> community = communityService.findById(id);
        // Optional 객체의 값이 존재하면 HTTP 상태 코드 200과 함께 반환,
        // 없으면 404 에러를 반환합니다.
        return community.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 페이징 처리를 추가한 게시글 목록 조회 메서드
    // @RequestParam은 URL의 쿼리 파라미터를 메소드의 파라미터로 매핑합니다.
    // 기본값으로 page는 0, size는 3으로 설정됩니다.
    @GetMapping
    public ResponseEntity<Page<Community>> getAllCommunitys(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Community> communitys = communityService.findAll(pageable);
        // 페이징 처리된 게시글 목록을 HTTP 상태 코드 200과 함께 반환합니다.
        return ResponseEntity.ok(communitys);
    }
    
    // @PutMapping 어노테이션은 HTTP PUT 요청을 처리합니다.
    // 경로 변수 id와 요청 본문에 포함된 Post 객체를 받아 게시글을 업데이트합니다.
    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable Long id, @RequestBody Community communityDetails) {
    	Community updatedCommunity = communityService.updateCommunity(id, communityDetails);
        return ResponseEntity.ok(updatedCommunity);
    }
    
    // @DeleteMapping 어노테이션은 HTTP DELETE 요청을 처리합니다.
    // 경로 변수 id로 지정된 게시글을 삭제합니다.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCommunity(@PathVariable Long id) {
    	communityService.deleteCommunity(id);
        return ResponseEntity.ok().build();
    }
  

 // @PostMapping은 HTTP POST 요청을 처리하는 메소드임을 나타내는 어노테이션입니다.
 // 메소드 위에 별도의 경로를 지정하지 않았기 때문에, 클래스 레벨의 @RequestMapping의 경로를 사용합니다.
 @PostMapping
 public Community createCommunity(@RequestBody Community community) {
     // @RequestBody 어노테이션은 HTTP 요청의 본문을 Java 객체로 매핑합니다.
     // 이 메소드는 클라이언트로부터 받은 Post 객체를 postService를 통해 저장하고,
     // 저장된 Post 객체를 반환합니다.
     return communityService.saveCommunity(community);
 }

}
