package com.springboot.react.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.react.entity.Post;

public interface PostService {

	Post savePost(Post post);
	
	Optional<Post> findById(Long id);
	
	Optional<Post> findPostById(Long id);
	
    Page<Post> findAll(Pageable pageable);

    Page<Post> findAllBySearch(String search, Pageable pageable);
    
    void deletePost(Long id);
}
