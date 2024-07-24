// 패키지 선언: 이 클래스가 속한 패키지를 지정합니다.
package com.springboot.react.repository;

// 필요한 클래스를 임포트합니다. Member 엔티티와 Spring Data의 JpaRepository 인터페이스.
import com.springboot.react.entity.Member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

// MemberRepository 인터페이스 정의, JpaRepository를 상속받아 JPA 기능을 활용합니다.
// JpaRepository에는 타입 파라미터로 엔티티 타입인 Member와 그 엔티티의 ID 필드 타입인 Long을 지정합니다.
public interface MemberRepository extends JpaRepository<Member, Long> {

	Optional<Member> findByMemberId(String memberId);
    // 이 인터페이스는 Member 엔티티에 대해 CRUD(Create, Read, Update, Delete) 작업을 할 수 있는
    // 기본적인 메서드들을 자동으로 제공받습니다. 
    // JpaRepository 인터페이스가 제공하는 메서드들 (예: save(), findOne(), findAll(), delete() 등)을
    // 추가적으로 구현하지 않아도 스프링 데이터 JPA가 런타임에 구현체를 자동으로 생성해줍니다.

    // 필요한 경우, 여기에 추가적인 쿼리 메서드를 선언할 수 있습니다. 예를 들어, 아래와 같은 메서드를 추가할 수 있습니다.
    // List<Member> findByMemberName(String name);
    // 이러한 메서드는 메서드 이름을 분석하여 해당하는 SQL 쿼리를 자동으로 생성하고 실행합니다.
	
	Optional<Member> findByMemberNumber(Long memberNumber);
}
