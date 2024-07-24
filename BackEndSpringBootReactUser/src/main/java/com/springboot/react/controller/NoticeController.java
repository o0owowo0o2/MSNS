package com.springboot.react.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.react.entity.Notice;
import com.springboot.react.entity.Post;
import com.springboot.react.service.NoticeService;


@RestController
@RequestMapping("/api/notices")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@PostMapping
	public Notice createNotice(@RequestBody Notice notice) {
		return noticeService.saveNotice(notice);
	}
	// 특정 아이디로 게시글 조회
	@GetMapping("/{id}")
	public ResponseEntity<Notice> getNoticeById(@PathVariable Long id){
		Optional<Notice> notice = noticeService.findNoticeById(id);
		return ResponseEntity.ok(notice.get()); 
	}
	// 페이징 처리와 선택적 검색 기능을 제공하는 게시글 목록 조회 메서드
	@GetMapping("/list")
	public ResponseEntity<Page<Notice>> getAllNotices(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "3") int size,
			@RequestParam(required = false )String search){
		Pageable pageable = PageRequest.of(page, size);
		Page<Notice> notices;
		if (search != null && !search.trim().isEmpty()) {
            // 검색어가 제공된 경우 해당 검색어를 포함하는 게시글 검색
            notices = noticeService.findAllBySearch(search, pageable);
        } else {
            // 검색어가 없는 경우 모든 게시글 조회
        	notices = noticeService.findAll(pageable);
        }
        return ResponseEntity.ok(notices);
	}
	
	// 게시글을 수정하는 메서드입니다.
    // @PutMapping 어노테이션은 HTTP PUT 요청을 처리하며, 경로 변수 "{id}"를 사용해 특정 게시글의 ID를 지정합니다.
    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotie(@PathVariable Long id, @RequestBody Notice noticeDetails) {
        // postService의 updatePost 메서드를 호출하여 게시글을 수정합니다.
        Notice updatedNotice = noticeService.updateNotice(id, noticeDetails);
        // 수정된 게시글 객체를 HTTP 상태 코드 200(OK)과 함께 반환합니다.
        return ResponseEntity.ok(updatedNotice);
    }
	
 // 게시글 삭제 API
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        return noticeService.findNoticeById(id).map(notice -> {
        	 noticeService.deleteNotice(id); // 게시글 데이터베이스에서 삭제
             return ResponseEntity.ok().body("게시글이 삭제되었습니다.");
        }).orElseGet(() -> ResponseEntity.notFound().build()); // 게시글이 존재하지 않을 경우 404 응답 반환
    }
        
}
