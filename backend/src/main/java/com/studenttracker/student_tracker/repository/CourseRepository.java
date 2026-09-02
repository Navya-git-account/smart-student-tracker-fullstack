package com.studenttracker.student_tracker.repository;

import com.studenttracker.student_tracker.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
