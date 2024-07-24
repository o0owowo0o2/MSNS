package com.springboot.react.service.impl;

import java.util.Optional;

//import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.react.entity.Post;
import com.springboot.react.repository.PostRepository;
import com.springboot.react.service.PostService;

@Service
public class PostServiceImpl implements PostService {

	private final PostRepository postRepository;
	
	@Autowired
	public PostServiceImpl(PostRepository postRepository) {
		this.postRepository = postRepository;
	}
	
	@Override
	public Optional<Post> findById(Long id) {
		return postRepository.findById(id);
	}

	// 페이징
	@Override
	public Page<Post> findAll(Pageable pageable) {
		return postRepository.findAll(pageable);
	}
	
	// 검색 기능
	@Override
	public Page<Post> findAllBySearch(String search, Pageable pageable) {
		if(search != null && !search.trim().isEmpty()) {
			return postRepository.findByBoardTitleContainingOrBoardContentsContainingOrBoardWriterContaining(search, search, search, pageable);
		} else {
			return postRepository.findAll(pageable);
		}
	}
	
	// 게시글 저장
	@Override
	@Transactional
	public Post savePost(Post post) {
		return postRepository.save(post);
	}

	// ID로 게시글 조회
	@Override
	public Optional<Post> findPostById(Long id) {
		return postRepository.findById(id);
	}

	// 게시물 삭제
	@Override
    @Transactional 
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
	
//	@Override
//	public void deletePost(Long id) {
//		Post post = postRepository.findById(id)
//				.orElseThrow(() -> new RuntimeException("Post not found with id" + id));
//		postRepository.delete(post);
//	}
}
