// 패키지 선언으로 이 클래스가 com.springboot.react.service.impl 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.service.impl;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Free;
import com.springboot.react.repository.FreeRepository;
import com.springboot.react.service.FreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

// @Service 어노테이션은 이 클래스가 비즈니스 서비스 계층의 컴포넌트임을 스프링에 알려주며,
// 스프링 IoC 컨테이너에 의해 관리되는 빈으로 등록됩니다.
@Service
public class FreeServiceImpl implements FreeService {

    // PostRepository 인터페이스 타입의 postRepository 필드 선언
    private final FreeRepository freeRepository;

    // @Autowired 어노테이션을 사용하여 PostRepository의 인스턴스를 자동 주입 받습니다.
    @Autowired
    public FreeServiceImpl(FreeRepository freeRepository) {
        this.freeRepository = freeRepository;
    }

    // findById 메소드는 주어진 ID로 Post 엔티티를 찾아 Optional 객체로 반환합니다.
    @Override
    public Optional<Free> findById(Long id) {
        return freeRepository.findById(id);
    }

    // 페이징 처리를 지원하는 findAll 메서드를 재정의합니다.
    // 이 메서드는 Pageable 객체를 인자로 받아 Page<Post>를 반환합니다.
    @Override
    public Page<Free> findAll(Pageable pageable) {
        return freeRepository.findAll(pageable);
    }
    
    // 주어진 id의 Post를 찾아 내용을 업데이트하고 저장하는 메서드입니다.
    @Override
    public Free updateFree(Long id, Free freeDetails) {
    	Free post = freeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Free not found with id " + id)); // 게시글을 찾지 못하면 예외 발생

        // 게시글의 제목과 내용을 업데이트합니다. 작성자 정보는 업데이트되지 않습니다.
        post.setBoardTitle(freeDetails.getBoardTitle());
        post.setBoardContents(freeDetails.getBoardContents());

        // 수정된 게시글을 데이터베이스에 저장하고 반환합니다.
        return freeRepository.save(post);
    }
    
    // 주어진 ID의 게시글을 삭제하는 메서드입니다.
    @Override
    public void deleteFree(Long id) {
    	Free post = freeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Free not found with id " + id)); // 게시글을 찾지 못하면 예외 발생
        freeRepository.delete(post); // 해당 게시글을 삭제합니다.
    }

   @Override
   @Transactional
   public Free saveFree(Free free) {
	     // postRepository의 save 메서드를 호출하여 Post 객체를 데이터베이스에 저장합니다.
	     // save 메서드는 저장된 Post 객체를 반환합니다.
	     return freeRepository.save(free); // 게시글 저장
	 }

}
