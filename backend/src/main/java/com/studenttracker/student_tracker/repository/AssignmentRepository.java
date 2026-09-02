package com.studenttracker.student_tracker.repository;

import com.studenttracker.student_tracker.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository
        extends JpaRepository<Assignment, Long> {
}
