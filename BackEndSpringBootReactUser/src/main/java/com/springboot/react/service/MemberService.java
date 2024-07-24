// 패키지 선언: 이 클래스가 속한 패키지를 지정합니다.
package com.springboot.react.service;

import java.util.List;
import java.util.Optional;

// 필요한 클래스를 임포트합니다. Member 엔티티 클래스를 임포트하여 멤버 객체를 다룰 수 있습니다.
import com.springboot.react.entity.Member;
import com.springboot.react.entity.Notice;

// MemberService 인터페이스 정의
public interface MemberService {
    // 회원 가입을 처리하는 메소드를 정의합니다. 
    // 이 메소드는 Member 타입의 객체를 매개변수로 받아 처리한 후, Member 타입의 객체를 반환합니다.
    // 반환된 Member 객체는 저장된 상태의 멤버를 의미하며, 데이터베이스에 새로운 회원 정보가 성공적으로 저장된 후의 상태를 반영합니다.
    Member saveMember(Member member); // 회원 가입 메소드
    
    // 수정 메소드
    Member updateMember(Long id, Member memberDetails);

	Optional<Member> findByMemberNumber(Long memberNumber);
	 
	// 주어진 memberId로 회원을 찾아 Optional 객체로 반환하는 메서드
    // memberId가 데이터베이스에 존재하지 않을 경우, Optional.empty() 반환
    // 이 메서드는 회원 로그인 또는 정보 조회 시에 유용하게 사용됨
    Optional<Member> findByMemberId(String memberId); // 메소드 추가

	Optional<Member> findMemberById(Long id);

	void deleteMember(Long id);
	
	}
	
	

