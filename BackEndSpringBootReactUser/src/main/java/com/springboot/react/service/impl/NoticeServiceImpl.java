// 패키지 선언
package com.springboot.react.service.impl;

// 필요한 클래스 및 인터페이스 import
import com.springboot.react.entity.Notice; // 게시글 엔티티 클래스
import com.springboot.react.entity.Post;
import com.springboot.react.repository.NoticeRepository; // 게시글 데이터 접근 리포지토리
import com.springboot.react.service.NoticeService; // 게시글 서비스 인터페이스
import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입 어노테이션
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service; // 서비스 계층을 나타내는 어노테이션
import org.springframework.transaction.annotation.Transactional; // 트랜잭션 관리 어노테이션

import java.util.List;
import java.util.Optional; // Java의 Optional 클래스 사용

// 클래스 선언 및 어노테이션
@Service // 이 클래스를 스프링 컴포넌트로 등록하며, 서비스 계층임을 나타냄
public class NoticeServiceImpl implements NoticeService { // NoticeService 인터페이스 구현

    // NoticeRepository 타입의 객체를 필드로 선언
    private final NoticeRepository noticeRepository;

    // 생성자를 통한 NoticeRepository 의존성 주입
    @Autowired
    public NoticeServiceImpl(NoticeRepository NoticeRepository) {
        this.noticeRepository = NoticeRepository; // 주입된 리포지토리 객체를 필드에 할당
    }

    // 게시글 저장 메소드 구현
    @Override
    @Transactional // 메소드를 트랜잭션으로 처리
    public Notice saveNotice(Notice notice) {
        return noticeRepository.save(notice); // 리포지토리의 save 메소드를 호출하여 게시글 저장
    }

    // ID를 통한 게시글 조회 메소드 구현
    @Override
    public Optional<Notice> findNoticeById(Long id) {
        return noticeRepository.findById(id); // 리포지토리의 findById 메소드를 호출하여 ID로 게시글 조회
    }
  
    
	@Override
	public Optional<Notice> findById(Long id) {
		return null;
	}
	
	// 게시글 수정 메소드 구현
	@Override
	public Notice updateNotice(Long id, Notice noticeDetails) {
		// 데이터베이스에서 ID로 Notice 객체를 찾고, 없으면 예외를 발생시킵니다.
		Notice notice = noticeRepository.findById(id).orElseThrow(() -> new RuntimeException("Notice not found with id " + id));
		 // 받아온 noticeDetails에서 제목과 내용을 가져와서 현재 Notice 객체에 설정합니다.
		notice.setNoticeTitle(noticeDetails.getNoticeTitle());
		notice.setNoticeContents(noticeDetails.getNoticeContents());
		// 수정된 Notice 객체를 데이터베이스에 저장하고, 저장된 객체를 반환합니다.
		Notice updateNotice = noticeRepository.save(notice);
		return updateNotice;
	}
	
	// 게시글 삭제 메소드 구현
    @Override
    @Transactional // 메소드를 트랜잭션으로 처리
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);; // 리포지토리의 deleteById 메소드를 호출하여 ID로 게시글 삭제
    }
	
	// Pageable 객체를 매개변수로 받아 페이징 처리된 Notice 목록을 반환합니다.
	@Override
	public Page<Notice> findAll(Pageable pageable) {
		return noticeRepository.findAll(pageable);
	}
	
	 // 검색 기능을 추가한 findAllBySearch 메서드입니다.
		@Override
		public Page<Notice> findAllBySearch(String search, Pageable pageable) {
			// 검색어가 제공된 경우 해당 검색어를 포함하는 게시글을 조회합니다.
			if (search != null && !search.trim().isEmpty()) {
				return noticeRepository.findByNoticeTitleContainingOrNoticeContentsContainingOrNoticeWriterContaining(search, search, search, pageable);
			}else {
				return noticeRepository.findAll(pageable);
			}
		}
}
