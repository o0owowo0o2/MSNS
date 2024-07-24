// 패키지 선언
package com.springboot.react.entity;

// JPA 관련 어노테이션을 사용하기 위한 임포트
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

// Lombok 라이브러리를 통해 자동으로 getter, setter, 생성자 등을 생성하기 위한 어노테이션 임포트
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity 어노테이션은 이 클래스가 JPA 엔티티임을 나타냅니다.
@Entity
// @Table 어노테이션은 엔티티와 매핑될 데이터베이스 테이블을 지정합니다.
@Table(name = "members")
// Lombok 라이브러리의 어노테이션으로, Getter와 Setter 메소드를 자동으로 생성합니다.
@Getter
@Setter
// 기본 생성자를 자동으로 생성합니다.
@NoArgsConstructor
// 모든 필드를 초기화하는 생성자를 자동으로 생성합니다.
@AllArgsConstructor
public class Member {
    
    // 회원 번호를 위한 필드 선언
    // @Id는 이 필드가 테이블의 기본 키임을 나타냅니다.
    // @GeneratedValue는 기본 키 생성 전략을 설정합니다. GenerationType.SEQUENCE는 데이터베이스 시퀀스를 사용하여 기본 키 값을 생성합니다.
    // @SequenceGenerator는 시퀀스 생성기를 설정합니다.
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    @SequenceGenerator(name = "member_seq", sequenceName = "MEMBER_SEQ", allocationSize = 1)
    private Long memberNumber;
    
    // 회원 ID를 위한 필드
    // @Column은 컬럼 매핑을 정의합니다. nullable = false는 이 필드가 데이터베이스에 null로 저장될 수 없음을 의미합니다.
    
    @Column(nullable = false)
    private String memberId;

    // 회원 비밀번호 필드
    @Column(nullable = false)
    private String memberPassword;

    // 회원 이름 필드
    @Column(nullable = false)
    private String memberName;
    
    @Column(nullable = false)
    private String memberPhone;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String addressDetail;
    
    @Column(nullable = false)
    private String gender;
    
    @Column(nullable = true)
    private String identity;
    
    @Column(nullable = true)
    private String identityDetail;
    
    // 이미지 파일 경로를 저장할 필드
    // nullable = true는 이 필드가 null값을 허용한다는 것을 의미합니다.
    @Column(nullable = true)
    private String imagePath; // 이미지 파일의 저장 경로
    
}
