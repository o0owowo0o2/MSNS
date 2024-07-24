// 패키지 선언으로 이 클래스가 com.springboot.react.entity 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.entity;

// 필요한 JPA와 Lombok 라이브러리 클래스를 임포트합니다.
import javax.persistence.*;
import lombok.*;

// @Entity 어노테이션은 이 클래스가 JPA 엔티티임을 나타내며,
// 데이터베이스 테이블과 매핑될 클래스임을 의미합니다.
@Entity
// @Table 어노테이션은 이 엔티티가 매핑될 데이터베이스 테이블의 이름을 지정합니다.
@Table(name = "frees")
// Lombok 라이브러리의 어노테이션들을 사용하여, 
// getter, setter 메소드 및 필수 생성자들을 자동으로 생성합니다.
@Getter
@Setter
@NoArgsConstructor  // 파라미터가 없는 기본 생성자를 자동으로 생성합니다.
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자를 자동으로 생성합니다.
public class Free {
    
    // @Id 어노테이션은 이 필드가 엔티티의 주 키(primary key)임을 나타냅니다.
    @Id
    // @GeneratedValue 어노테이션은 식별자의 생성 전략을 지정합니다.
    // GenerationType.SEQUENCE는 데이터베이스 시퀀스를 사용하여 ID를 생성합니다.
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "free_seq")
    // @SequenceGenerator는 시퀀스 생성기를 정의합니다.
    // name은 생성기의 이름, sequenceName은 사용할 데이터베이스 시퀀스 이름,
    // allocationSize는 시퀀스에서 한 번에 증가하는 양을 지정합니다.
    @SequenceGenerator(name = "free_seq", sequenceName = "FREE_SEQ", allocationSize = 1)
    private Long boardNumber;  // 게시글 번호
    
    // @Column 어노테이션은 이 필드가 매핑될 데이터베이스 컬럼의 세부 사항을 지정합니다.
    // nullable = false는 이 필드가 null을 허용하지 않음을 의미합니다.
    @Column(nullable = false)
    private String boardTitle; // 게시글 제목

    @Column(nullable = false)
    private String boardContents; // 게시글 내용

    @Column(nullable = false)
    private String boardWriter; // 게시글 작성자
    
}
