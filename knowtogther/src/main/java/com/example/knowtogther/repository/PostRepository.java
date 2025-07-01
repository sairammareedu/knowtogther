package com.example.knowtogther.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.knowtogther.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByUserEmail(String email);
}