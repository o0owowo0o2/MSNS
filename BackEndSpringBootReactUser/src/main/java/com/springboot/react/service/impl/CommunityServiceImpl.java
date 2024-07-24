// 패키지 선언으로 이 클래스가 com.springboot.react.service.impl 패키지 안에 위치함을 나타냅니다.
package com.springboot.react.service.impl;

// 필요한 클래스와 인터페이스를 임포트합니다.
import com.springboot.react.entity.Community;
import com.springboot.react.repository.CommunityRepository;
import com.springboot.react.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

// @Service 어노테이션은 이 클래스가 비즈니스 서비스 계층의 컴포넌트임을 스프링에 알려주며,
// 스프링 IoC 컨테이너에 의해 관리되는 빈으로 등록됩니다.
@Service
public class CommunityServiceImpl implements CommunityService {

    // PostRepository 인터페이스 타입의 postRepository 필드 선언
    private final CommunityRepository communityRepository;

    // @Autowired 어노테이션을 사용하여 PostRepository의 인스턴스를 자동 주입 받습니다.
    @Autowired
    public CommunityServiceImpl(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    // findById 메소드는 주어진 ID로 Post 엔티티를 찾아 Optional 객체로 반환합니다.
    @Override
    public Optional<Community> findById(Long id) {
        return communityRepository.findById(id);
    }

    // 페이징 처리를 지원하는 findAll 메서드를 재정의합니다.
    // 이 메서드는 Pageable 객체를 인자로 받아 Page<Post>를 반환합니다.
    @Override
    public Page<Community> findAll(Pageable pageable) {
        return communityRepository.findAll(pageable);
    }
    
    // 주어진 id의 Post를 찾아 내용을 업데이트하고 저장하는 메서드입니다.
    @Override
    public Community updateCommunity(Long id, Community communityDetails) {
    	Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id)); // 게시글을 찾지 못하면 예외 발생

        // 게시글의 제목과 내용을 업데이트합니다. 작성자 정보는 업데이트되지 않습니다.
    	community.setBoardTitle(communityDetails.getBoardTitle());
    	community.setBoardContents(communityDetails.getBoardContents());

        // 수정된 게시글을 데이터베이스에 저장하고 반환합니다.
        return communityRepository.save(community);
    }
    
    // 주어진 ID의 게시글을 삭제하는 메서드입니다.
    @Override
    public void deleteCommunity(Long id) {
    	Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id)); // 게시글을 찾지 못하면 예외 발생
        communityRepository.delete(community); // 해당 게시글을 삭제합니다.
    }

 @Override
 @Transactional
 public Community saveCommunity(Community community) {
     // postRepository의 save 메서드를 호출하여 Post 객체를 데이터베이스에 저장합니다.
     // save 메서드는 저장된 Post 객체를 반환합니다.
     return communityRepository.save(community); // 게시글 저장
 }
}
