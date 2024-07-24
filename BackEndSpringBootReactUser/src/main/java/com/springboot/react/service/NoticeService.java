// 패키지 선언
package com.springboot.react.service;

import com.springboot.react.entity.Notice;// 게시글 엔티티 클래스
// 필요한 클래스 import
import com.springboot.react.entity.Post;

import java.util.List;
import java.util.Optional; // Java의 Optional 클래스 사용

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// NoticeService 인터페이스 정의
public interface NoticeService {
    // 게시글 저장 메소드
    // 파라미터: Notice 객체
    // 반환: 저장된 Notice 객체
    // 설명: 이 메소드는 주어진 Notice 객체를 데이터베이스에 저장하고 저장된 객체를 반환합니다.
    Notice saveNotice(Notice notice);	

    // ID를 기준으로 게시글 검색 메소드
    // 파라미터: 게시글 ID (Long 타입)
    // 반환: Optional<Notice> 타입
    // 설명: 이 메소드는 주어진 ID로 게시글을 조회합니다. Optional을 반환하여 게시글의 존재 여부에 따라 다르게 처리할 수 있습니다.
    Optional<Notice> findNoticeById(Long id);
    
    // 공지사항 게시글 상세 메서드 선언
    Optional<Notice> findById(Long id);
    
    // 검색어에 따라 필터링된 게시글 목록을 조회하는 메서드
    Page<Notice> findAllBySearch(String search, Pageable pageable);
    
    
    Page<Notice> findAll(Pageable pageable);

    // 공지사항 게시글 수정 메소드
    Notice updateNotice(Long id, Notice noticeDetails);
    
    // 공지사항 게시글 삭제 메소드
    // 파라미터: 게시글 ID (Long 타입)
    // 반환: 없음 (void)
    // 설명: 이 메소드는 주어진 ID의 게시글을 데이터베이스에서 삭제합니다. 삭제 메소드는 반환값이 없습니다.
    void deleteNotice(Long id); // 게시글 삭제 메서드 인터페이스 추가

    
	
	
}
