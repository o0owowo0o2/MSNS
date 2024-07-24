// 패키지 선언으로 이 인터페이스가 com.springboot.react.repository 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.repository;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// PostRepository 인터페이스는 JpaRepository 인터페이스를 상속합니다.
// JpaRepository는 Spring Data JPA에서 제공하는 인터페이스로, 기본적인 CRUD 및 페이지네이션 기능을 제공합니다.
// <Post, Long>에서 Post는 엔티티 클래스 타입을, Long은 해당 엔티티의 ID 필드 타입을 의미합니다.
public interface CommunityRepository extends JpaRepository<Community, Long> {
    // 이 메서드는 JpaRepository에 이미 정의되어 있지만, 동작을 명시적으로 보여주기 위해 여기에서 다시 선언할 수 있습니다.
    // Pageable 객체를 매개변수로 받아, 페이지네이션 처리가 적용된 Post 객체의 페이지를 반환합니다.
    // Pageable 인터페이스는 요청된 페이지 정보(페이지 번호, 페이지 크기 등)를 캡슐화하며,
    // Spring Data는 이 정보를 사용하여 요청에 맞는 데이터 페이지를 조회합니다.
    Page<Community> findAll(Pageable pageable);
}
