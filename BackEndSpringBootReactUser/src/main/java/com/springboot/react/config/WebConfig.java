package com.springboot.react.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 백엔드 애플리케이션의 CORS(Cross-Origin Resource Sharing) 설정을 관리하는 설정 클래스입니다.
// CORS는 다른 도메인에서 호스팅되는 웹 페이지가 현재 도메인의 자원에 접근할 수 있게 허용하는 보안 기능입니다.

// @Configuration 어노테이션은 스프링에게 이 클래스가 애플리케이션의 설정 정보를 담고 있음을 알립니다.
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    // WebMvcConfigurer 인터페이스의 addCorsMappings 메소드를 오버라이드하여 CORS 정책을 구성합니다.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 경로("/**")에 대한 CORS 설정을 추가합니다.
        registry.addMapping("/**")
                // .allowedOrigins 메서드를 통해 허용할 원본 URL을 지정합니다.
                // 예를 들어, React 개발 서버인 http://192.168.10.200:3000 및 http://localhost:3000에서 오는 요청을 허용합니다.
        		// YARC REST API 테스트 할때는 아래 매개변수값에 "*", "http://localhost:8080"을 추가 설정 합니다.
                .allowedOrigins("*","http://localhost:8080", "http://192.168.10.23:3000", "http://localhost:3000")
                // .allowedMethods 메서드를 통해 허용할 HTTP 메서드를 지정합니다.
                // "GET", "POST", "PUT", "DELETE", "OPTIONS" 요청을 허용합니다.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // .allowedHeaders 메서드를 통해 클라이언트가 서버에 보낼 수 있는 HTTP 헤더를 지정합니다.
                // "*"는 모든 헤더를 허용합니다.
                .allowedHeaders("*")
                // .allowCredentials 메서드는 인증 정보(예: 쿠키, HTTP 인증)와 함께 요청을 전송할 수 있게 합니다.
                .allowCredentials(false);
    }

    // 정적 리소스 핸들러를 추가하는 메서드입니다.
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	 // "/react_images/**" 경로로 요청되는 리소스에 대한 처리 설정
        registry.addResourceHandler("/react_images/**")
                // 실제 파일 시스템의 경로와 매핑
                // 이 경로에 저장된 리소스 파일들을 웹에서 접근 가능하도록 설정
                .addResourceLocations("file:///C:/react_images/");
        // "/downloadFile/**" 패턴의 요청이 오면, C 드라이브의 react_images 폴더를 리소스 위치로 사용합니다.
        registry.addResourceHandler("/downloadFile/**")
                // 리소스 위치를 지정합니다. 여기서는 로컬 파일 시스템의 경로를 지정합니다.
                .addResourceLocations("file:///C:/react_images/");
    }

}
