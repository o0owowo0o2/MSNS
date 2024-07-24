package com.springboot.react.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.react.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

	Page<Post> findAll(Pageable pageable);
	
	Page<Post> findByBoardTitleContainingOrBoardContentsContainingOrBoardWriterContaining(String boardTitle, String boardContents, String boardWriter, Pageable pageable);
	
}