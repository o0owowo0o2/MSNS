package com.springboot.react.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "posts")
// @Table(name = "qnaboard")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_seq")
	@SequenceGenerator(name = "post_seq", sequenceName = "POST_SEQ", allocationSize = 1)
	private Long boardNumber;
	
	@Column(nullable = false)
	private String boardTitle;
	
	@Column(nullable = false)
	private String boardContents;
	
	@Column(nullable = false)
	private String boardWriter;
	
	@Column(nullable = true)
	private String imagePath;
	
}
