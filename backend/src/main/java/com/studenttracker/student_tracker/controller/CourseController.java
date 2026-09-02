package com.studenttracker.student_tracker.controller;

import com.studenttracker.student_tracker.model.Course;
import com.studenttracker.student_tracker.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody Course updatedCourse) {

        return courseRepository.findById(id)
                .map(course -> {
                    course.setCourseCode(updatedCourse.getCourseCode());
                    course.setCourseName(updatedCourse.getCourseName());
                    course.setCredits(updatedCourse.getCredits());
                    course.setGrade(updatedCourse.getGrade());

                    Course savedCourse = courseRepository.save(course);
                    return ResponseEntity.ok(savedCourse);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {

        if (!courseRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        courseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
