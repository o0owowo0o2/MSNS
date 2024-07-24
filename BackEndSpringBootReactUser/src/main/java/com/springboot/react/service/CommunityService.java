package com.springboot.react.service;

import com.springboot.react.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CommunityService {

    // 게시글 상세 조회 메서드 선언
    Optional<Community> findById(Long id);
    
    // 페이징 처리를 위해 수정된 findAll 메서드
    Page<Community> findAll(Pageable pageable);
    
    // 게시글 수정 메서드 선언
    Community updateCommunity(Long id, Community communityDetails);
    
    // 게시글 삭제 메서드 선언
    void deleteCommunity(Long id);

    Community saveCommunity(Community community); // 게시글 등록 메소드
}