package com.bondbeat.auth.controller;

import com.bondbeat.auth.model.User;
import com.bondbeat.auth.repository.UserRepository;
import com.bondbeat.auth.security.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        if (encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String jwt = jwtUtils.generateJwtToken(user.getUsername());
            return ResponseEntity.ok(new JwtResponse(jwt, user.getUsername(), user.getEmail()));
        } else {
            return ResponseEntity.badRequest().body("Error: Invalid password.");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User(null, signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail());

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}

@Data
class LoginRequest {
    private String username;
    private String password;
}

@Data
class SignupRequest {
    private String username;
    private String email;
    private String password;
}

@Data
class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private String email;

    public JwtResponse(String accessToken, String username, String email) {
        this.token = accessToken;
        this.username = username;
        this.email = email;
    }
}
