package com.example.knowtogther.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.knowtogther.model.Post;
import com.example.knowtogther.repository.PostRepository;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	public Post createPost(Post post) {
		return postRepository.save(post);
	}

	public List<Post> getPostsByEmail(String email) {
		return postRepository.findByUserEmail(email);
	}

	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}

	public Post savePost(Post post) {
		// TODO Auto-generated method stub
		return postRepository.save(post);
	}
}