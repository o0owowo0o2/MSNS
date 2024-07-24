package com.springboot.react.service;

import com.springboot.react.entity.Free;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface FreeService {

    // 게시글 상세 조회 메서드 선언
    Optional<Free> findById(Long id);
    
    // 페이징 처리를 위해 수정된 findAll 메서드
    Page<Free> findAll(Pageable pageable);
    
    // 게시글 수정 메서드 선언
    Free updateFree(Long id, Free freeDetails);
    
    // 게시글 삭제 메서드 선언
    void deleteFree(Long id);

Free saveFree(Free free); // 게시글 등록 메소드
}