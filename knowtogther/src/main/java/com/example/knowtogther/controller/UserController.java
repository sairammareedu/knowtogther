package com.example.knowtogther.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.knowtogther.model.User;
import com.example.knowtogther.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    // ✅ Upload Profile Picture
    @PostMapping("/{id}/photo")
    public ResponseEntity<?> uploadPhoto(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            User user = userRepository.findById(id).orElse(null);
            if (user == null) return ResponseEntity.notFound().build();

            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path targetPath = Paths.get(UPLOAD_DIR + id + "-" + fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/uploads/" + id + "-" + fileName;
            user.setProfileImage(imageUrl);
            userRepository.save(user);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }

    // ✅ Fetch user profile
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/upload-profile")
    public String uploadProfile(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String image = payload.get("image");
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setProfileImage(image);
            userRepository.save(user);
            return "Uploaded";
        } else {
            return "User not found";
        }
    }

}
