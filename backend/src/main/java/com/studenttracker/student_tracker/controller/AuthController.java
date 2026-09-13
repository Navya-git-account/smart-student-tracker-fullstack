package com.studenttracker.student_tracker.controller;

import com.studenttracker.student_tracker.dto.LoginRequest;
import com.studenttracker.student_tracker.dto.RegisterRequest;
import com.studenttracker.student_tracker.model.Student;
import com.studenttracker.student_tracker.repository.StudentRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder;


    public AuthController(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.studentRepository =
                studentRepository;

        this.passwordEncoder =
                passwordEncoder;
    }


    /* =========================
       REGISTER STUDENT
       ========================= */

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {

        Map<String, String> response =
                new HashMap<>();


        /* Email validation */

        if (
                request.getEmail() == null ||
                        !request.getEmail().contains("@")
        ) {

            response.put(
                    "message",
                    "Please enter a valid email address."
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }


        /* Password validation */

        if (
                request.getPassword() == null ||
                        request.getPassword().length() < 8
        ) {

            response.put(
                    "message",
                    "Password must be at least 8 characters."
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }


        /* Duplicate email */

        if (
                studentRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            response.put(
                    "message",
                    "An account with this email already exists."
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }


        /* Create student */

        Student student =
                new Student();

        student.setFirstName(
                request.getFirstName()
        );

        student.setLastName(
                request.getLastName()
        );

        student.setEmail(
                request.getEmail()
        );


        /* Encrypt password */

        student.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        studentRepository.save(student);


        response.put(
                "message",
                "Registration successful."
        );


        return ResponseEntity.ok(response);
    }


    /* =========================
       LOGIN STUDENT
       ========================= */

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpSession session
    ) {

        Optional<Student> studentOptional =
                studentRepository.findByEmail(
                        request.getEmail()
                );


        if (studentOptional.isEmpty()) {

            return ResponseEntity
                    .status(401)
                    .body(
                            Map.of(
                                    "message",
                                    "Invalid email or password."
                            )
                    );
        }


        Student student =
                studentOptional.get();


        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        student.getPassword()
                );


        if (!passwordMatches) {

            return ResponseEntity
                    .status(401)
                    .body(
                            Map.of(
                                    "message",
                                    "Invalid email or password."
                            )
                    );
        }


        /* Store student in session */

        session.setAttribute(
                "studentId",
                student.getId()
        );


        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Login successful."
        );

        response.put(
                "id",
                student.getId()
        );

        response.put(
                "firstName",
                student.getFirstName()
        );

        response.put(
                "email",
                student.getEmail()
        );


        return ResponseEntity.ok(response);
    }


    /* =========================
       CURRENT STUDENT
       ========================= */

    @GetMapping("/me")
    public ResponseEntity<?> currentStudent(
            HttpSession session
    ) {

        Long studentId =
                (Long) session.getAttribute(
                        "studentId"
                );


        if (studentId == null) {

            return ResponseEntity
                    .status(401)
                    .body(
                            Map.of(
                                    "message",
                                    "Not logged in."
                            )
                    );
        }


        Optional<Student> studentOptional =
                studentRepository.findById(
                        studentId
                );


        if (studentOptional.isEmpty()) {

            return ResponseEntity
                    .status(401)
                    .body(
                            Map.of(
                                    "message",
                                    "Student not found."
                            )
                    );
        }


        Student student =
                studentOptional.get();


        return ResponseEntity.ok(
                Map.of(
                        "id",
                        student.getId(),
                        "firstName",
                        student.getFirstName(),
                        "email",
                        student.getEmail()
                )
        );
    }


    /* =========================
       LOGOUT
       ========================= */

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpSession session
    ) {

        session.invalidate();


        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Logout successful."
                )
        );
    }
}