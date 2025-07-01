package com.example.knowtogther.controller;

import java.io.IOException;
import java.util.List;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType; // ✅ Correct import
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.knowtogther.model.Post;
import com.example.knowtogther.service.PostService;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.util.unit.DataSize;


@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    // ✅ Create a new post
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofMegabytes(10));
        factory.setMaxRequestSize(DataSize.ofMegabytes(10));
        return factory.createMultipartConfig();
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("email") String email,
            @RequestParam("image") MultipartFile imageFile
    ) {
        try {
            String base64Image = Base64.getEncoder().encodeToString(imageFile.getBytes());

            Post post = new Post();
            post.setTitle(title);
            post.setContent(content);
            post.setUserEmail(email);
            post.setImage(base64Image);

            Post savedPost = postService.createPost(post); // Make sure this is the correct service call
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process image: " + e.getMessage());
        }
    }

    // ✅ Get all posts
    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // ✅ Get posts by user email
    @GetMapping("/user/{email}")
    public List<Post> getPostsByEmail(@PathVariable String email) {
        return postService.getPostsByEmail(email);
    }
}
