// 패키지 선언
package com.springboot.react.service.impl;

// 필요한 클래스를 임포트합니다.
import com.springboot.react.entity.Member; // Member 엔티티 클래스
import com.springboot.react.repository.MemberRepository; // Member 데이터를 관리하는 JPA 레포지토리
import com.springboot.react.service.MemberService; // Member 서비스 인터페이스

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; // 스프링의 의존성 주입을 위한 어노테이션
import org.springframework.stereotype.Service; // 스프링의 서비스 계층을 나타내는 어노테이션
import org.springframework.transaction.annotation.Transactional; // 트랜잭션 관리를 위한 어노테이션

// 이 클래스가 서비스 계층의 구현체임을 나타내며 스프링 빈으로 등록
@Service
public class MemberServiceImpl implements MemberService {

    // 멤버 리포지토리에 대한 의존성 주입
    private final MemberRepository memberRepository;

    // 생성자를 통해 멤버 리포지토리 의존성을 주입받습니다.
    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // saveMember 메서드 오버라이드, 트랜잭션 관리를 위해 @Transactional 어노테이션을 사용
    @Override
    @Transactional
    public Member saveMember(Member member) {
        // 멤버 리포지토리의 save 메서드를 호출하여 멤버 객체를 저장하고 저장된 멤버 객체를 반환
        return memberRepository.save(member); // 회원 가입 등록
    }

	@Override
	public Optional<Member> findByMemberId(String memberId) {
		return memberRepository.findByMemberId(memberId);
	}

	@Override
	public Optional<Member> findByMemberNumber(Long memberNumber) {
		return memberRepository.findById(memberNumber);
	}

	public Optional<Member> findMemberById(Long id) {
		return memberRepository.findById(id);
	}

	@Override
	public void deleteMember(Long id) {
		memberRepository.findById(id);
	}

	@Override
	public Member updateMember(Long id, Member memberDetails) {
		Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found with id " + id));
		member.setMemberPassword(memberDetails.getMemberPassword());
		member.setMemberName(memberDetails.getMemberName());
		member.setMemberPhone(memberDetails.getMemberPhone());
		member.setAddress(memberDetails.getAddress());
		member.setAddressDetail(memberDetails.getAddressDetail());
		member.setGender(memberDetails.getGender());
		member.setIdentity(memberDetails.getIdentity());
		member.setIdentityDetail(memberDetails.getIdentityDetail());
		Member updateMember = memberRepository.save(member);
		return updateMember;
	}

	
}
