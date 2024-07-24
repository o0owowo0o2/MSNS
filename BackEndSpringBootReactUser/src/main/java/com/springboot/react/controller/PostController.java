package com.springboot.react.controller;

import com.springboot.react.entity.Post;
import com.springboot.react.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Pageable;

// import java.awt.print.Pageable;
import java.io.IOException;
//import java.nio.file.Files;
import java.nio.file.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    
	@Autowired
	private PostService postService;
//	private final PostService postService;
	
	private final Path rootLocation = Paths.get("C:/qnaboard_images");
	
//	@Autowired
//	public PostController(PostService postService) {
//		this.postService = postService;
//	}
//	
	// 게시글 등록
	@PostMapping("/upload")
	public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file,
										 @RequestParam("post") String postStr) throws IOException {
		
		ObjectMapper objectMapper = new ObjectMapper();
		Post post = objectMapper.readValue(postStr, Post.class);
		
		String fileName = file.getOriginalFilename();
		
		Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
		
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/downloadFile/")
				.path(fileName)
				.toUriString();
		
		post.setImagePath(fileDownloadUri);
		
		Post savedPost = postService.savePost(post);
		
		return ResponseEntity.ok("게시글이 등록되었습니다. ID: " + savedPost.getBoardNumber());
	}
	
	// 게시글 검색
	@GetMapping("/{id}")
	public ResponseEntity<Post> getPostById(@PathVariable Long id) {
		Optional<Post> post = postService.findById(id);
		return post.map(ResponseEntity::ok).orElseGet(() -> 
			ResponseEntity.notFound().build());
	}
	
	// 페이징
	@GetMapping
	public ResponseEntity<Page<Post>> getAllPosts(
			@RequestParam(defaultValue = "0")int page,
			@RequestParam(defaultValue = "10")int size,
			@RequestParam(required = false) String search) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Post> posts;
		if (search != null && !search.trim().isEmpty()) {
			posts = postService.findAllBySearch(search, pageable);
		}else {
			posts = postService.findAll(pageable);
		}
	return ResponseEntity.ok(posts);
	}
		
	// 게시글 수정
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestParam("image") MultipartFile file, @RequestParam("post") String postStr) throws IOException{
		ObjectMapper objectMapper = new ObjectMapper();
		Post postToUpdate = objectMapper.readValue(postStr, Post.class);
		
		Post existringPost = postService.findPostById(id).orElseThrow(() -> new RuntimeException("Post not found with id" + id));
		
		String fileName = file.getOriginalFilename();
		Files.copy(file.getInputStream(),
				this.rootLocation.resolve(fileName),
				StandardCopyOption.REPLACE_EXISTING);
		
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/downloadFile/")
				.path(fileName)
				.toUriString();
		existringPost.setBoardTitle(postToUpdate.getBoardTitle());
		existringPost.setBoardContents(postToUpdate.getBoardContents());
        existringPost.setImagePath(fileDownloadUri);
        
        Post updatedePost = postService.savePost(existringPost);
		return ResponseEntity.ok("게시글이 수정되었습니다. ID: " + updatedePost.getBoardNumber());
	}
	
//	@DeleteMapping("/{id}")
//	public ResponseEntity<?> deletePost(@PathVariable Long id) {
//		postService.deletePost(id);
//	    return ResponseEntity.ok().build();
//	}
	
	// 게시글 삭제
	 @DeleteMapping("/{id}")
	    public ResponseEntity<?> deletePost(@PathVariable Long id) {
	        return postService.findPostById(id).map(post -> {
	            if (post.getImagePath() != null && !post.getImagePath().isEmpty()) { // 이미지 파일이 있을 경우
	                String fileName = post.getImagePath().substring(post.getImagePath().lastIndexOf('/') + 1);
	                Path path = Paths.get(rootLocation.toString(), fileName);
	                try {
	                    Files.deleteIfExists(path); 
	                } catch (IOException e) {
	                    e.printStackTrace(); 
	                }
	            }
	            postService.deletePost(id); 
	            return ResponseEntity.ok().body("게시글이 삭제되었습니다.");
	        }).orElseGet(() -> ResponseEntity.notFound().build());
	    }
}
