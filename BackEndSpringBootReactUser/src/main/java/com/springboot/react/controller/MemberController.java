// 스프링 부트 애플리케이션에서 사용할 컨트롤러 패키지를 정의합니다.
package com.springboot.react.controller;

// 필요한 클래스와 패키지를 임포트합니다.
import com.springboot.react.entity.Member;
import com.springboot.react.entity.Post;
import com.springboot.react.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

// REST 컨트롤러로 정의하며, 기본 경로를 '/api/members'로 설정합니다.
@RestController
@RequestMapping("/api/members")
public class MemberController {

    // 멤버 서비스를 자동 주입하여 사용합니다. 멤버 관련 비즈니스 로직을 처리하는 서비스 컴포넌트입니다.
    @Autowired
    private MemberService memberService;

    // 이미지 파일을 저장할 기본 경로를 설정합니다.
    private final Path rootLocation = Paths.get("C:/react_images");

    // 이미지 업로드를 위한 POST 메서드를 정의합니다. 요청 경로는 '/upload'입니다.
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("member") String memberStr) throws IOException {
        // JSON 문자열로 전달된 멤버 정보를 Member 객체로 변환합니다.
        ObjectMapper objectMapper = new ObjectMapper();
        Member member = objectMapper.readValue(memberStr, Member.class);

        // 파일 저장 로직: 멀티파트 파일로 받은 이미지 파일을 지정된 경로에 저장합니다.
        String fileName = file.getOriginalFilename();
        Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

        // 저장된 파일의 다운로드 URI를 생성합니다.
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        // 멤버 객체에 이미지 경로를 설정합니다.
        member.setImagePath(fileDownloadUri);

        // 멤버 정보를 저장하고 저장된 멤버 정보를 반환합니다.
        Member savedMember = memberService.saveMember(member);

        // ResponseEntity를 사용하여 HTTP 응답을 구성하고, 저장된 멤버의 ID를 포함한 메시지를 반환합니다.
        return ResponseEntity.ok("회원 가입 정보가 등록되었습니다. ID: " + savedMember.getMemberNumber());
//        return ResponseEntity.ok(savedMember);
    }
    
    // 로그인 요청을 처리하는 메소드
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginRequest) {
        // 로그인 시도하는 사용자의 ID로 기존 회원 조회
        Optional<Member> foundMember = memberService.findByMemberId(loginRequest.getMemberId());

        // 해당 ID의 회원이 존재하지 않을 경우
        if (!foundMember.isPresent()) {
            return ResponseEntity.badRequest().body("로그인 아이디가 잘못 되었습니다!");
        }

        // 조회된 회원 정보
        Member member = foundMember.get();
        // 비밀번호 일치 여부 확인
        if (!member.getMemberPassword().equals(loginRequest.getMemberPassword())) {
            return ResponseEntity.badRequest().body("패스워드가 잘못 되었습니다!");
        }
        // 로그인 성공 처리, 실제 운영 환경에서는 추가적인 인증 토큰 발급 등의 작업이 필요
//        return ResponseEntity.ok("로그인이 성공되었습니다.");
        return ResponseEntity.ok(member);
    }
    
    // 특정 ID로 회원 상세 조회 API
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        Optional<Member> member = memberService.findMemberById(id); // ID로 게시글 검색
        if (!member.isPresent()) { //  존재하지 않을 경우
            return ResponseEntity.notFound().build(); // 404 Not Found 응답 반환
        }
        return ResponseEntity.ok(member.get()); // 조회된 정보 반환
    }
    
    private static final String API_KEY = "devU01TX0FVVEgyMDI0MDYwNzE1MDM0MjExNDgyODk="; //내 app key
    private static final String API_URL = "https://www.juso.go.kr/addrlink/addrLinkApi.do";

    @GetMapping("/search")
    public ResponseEntity<String> searchAddress(@RequestParam String keyword) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("%s?confmKey=%s&currentPage=1&countPerPage=10&keyword=%s&resultType=json", 
                                    API_URL, API_KEY, keyword);
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }
    
    // 회원정보 삭제 API
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id){
    	return memberService.findMemberById(id).map(member -> {
    		if (member.getImagePath() != null && !member.getImagePath().isEmpty()) {
				String fileName = member.getImagePath().substring(member.getImagePath().lastIndexOf('/') + 1);
				Path path = Paths.get(rootLocation.toString(), fileName);
				try {
                    Files.deleteIfExists(path); // 파일 삭제 시도
                } catch (IOException e) {
                    e.printStackTrace(); // 예외 처리
                }
			}
    		memberService.deleteMember(id); // 데이터베이스에서 삭제
    		 return ResponseEntity.ok().body("게시글이 삭제되었습니다."); // 응답 반환
    	}).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
 // 수정 API
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMember(@PathVariable Long id, @RequestParam("image") MultipartFile file, @RequestParam("member") String memberStr) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper(); // JSON 매핑
        Member memberToUpdate = objectMapper.readValue(memberStr, Member.class); // 수정할 Member 객체

        // 기존 게시글 조회
        Member existingMember = memberService.findMemberById(id).orElseThrow(() -> new RuntimeException("Member not found with id " + id));

        String fileName = file.getOriginalFilename(); // 파일 이름 추출
        Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName), StandardCopyOption.REPLACE_EXISTING); // 파일 저장

        // 파일 다운로드 URI 설정
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        // Member 정보 업데이트
        existingMember.setMemberPassword(memberToUpdate.getMemberPassword());
        existingMember.setMemberName(memberToUpdate.getMemberName());
        existingMember.setMemberPhone(memberToUpdate.getMemberPhone());
        existingMember.setAddress(memberToUpdate.getAddress());
        existingMember.setAddressDetail(memberToUpdate.getAddressDetail());
        existingMember.setGender(memberToUpdate.getGender());
        existingMember.setIdentity(memberToUpdate.getIdentity());
        existingMember.setIdentityDetail(memberToUpdate.getIdentityDetail());
        
        existingMember.setImagePath(fileDownloadUri);

        Member updatedMember = memberService.saveMember(existingMember); // 수정된 게시글 저장 및 반환

        return ResponseEntity.ok("게시글이 수정되었습니다. ID: " + updatedMember.getMemberNumber()); // 응답 반환
    }
	
}
