// 패키지 선언
package com.springboot.react.entity;

// JPA 및 관련 어노테이션 import
import javax.persistence.*;

// Lombok 라이브러리를 이용한 코드 단순화 어노테이션
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 클래스 선언 및 JPA 엔티티 설정
@Entity // 이 클래스를 JPA 엔티티로 지정
@Table(name = "notices") // 데이터베이스 테이블 이름을 'Notices'로 지정
@Getter // 모든 필드에 대한 getter 메소드 자동 생성
@Setter // 모든 필드에 대한 setter 메소드 자동 생성
@NoArgsConstructor // 인자 없는 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 인자로 받는 생성자 자동 생성
public class Notice {
    
    // 공지글의 고유 번호 (ID)
    @Id // 이 필드를 테이블의 기본 키로 설정
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notice_seq") // ID 값을 자동으로 생성하며, 시퀀스를 사용
    @SequenceGenerator(name = "notice_seq", sequenceName = "NOTICE_SEQ", allocationSize = 1) // 시퀀스 생성기 정의
    private Long noticeNumber; // 공지글 번호
    
    // 공지글 제목
    @Column(nullable = false) // 이 필드는 데이터베이스에 null을 허용하지 않음
    private String noticeTitle; // 공지글 제목

    // 공지글 내용
    @Column(nullable = false) // 이 필드는 데이터베이스에 null을 허용하지 않음
    private String noticeContents; // 공지글 내용

    // 공지글 작성자
    @Column(nullable = false) // 이 필드는 데이터베이스에 null을 허용하지 않음
    private String noticeWriter; // 공지글 작성자 이름
    
   
    
}
