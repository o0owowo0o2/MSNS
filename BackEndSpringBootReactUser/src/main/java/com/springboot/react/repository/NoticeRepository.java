package com.springboot.react.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.springboot.react.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{

Page<Notice> findAll(Pageable pageable);

Page<Notice> findByNoticeTitleContainingOrNoticeContentsContainingOrNoticeWriterContaining(String NoticeTitle, String NoticeContents, String NoticeWriter, Pageable pageable);
	

}
