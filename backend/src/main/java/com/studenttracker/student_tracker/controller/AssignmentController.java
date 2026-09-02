package com.studenttracker.student_tracker.controller;

import com.studenttracker.student_tracker.model.Assignment;
import com.studenttracker.student_tracker.repository.AssignmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;

    public AssignmentController(
            AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @PostMapping
    public Assignment createAssignment(
            @RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(
            @PathVariable Long id,
            @RequestBody Assignment updatedAssignment) {

        return assignmentRepository.findById(id)
                .map(assignment -> {
                    assignment.setTitle(updatedAssignment.getTitle());
                    assignment.setDescription(
                            updatedAssignment.getDescription());
                    assignment.setDueDate(updatedAssignment.getDueDate());
                    assignment.setStatus(updatedAssignment.getStatus());

                    return ResponseEntity.ok(
                            assignmentRepository.save(assignment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(
            @PathVariable Long id) {

        if (!assignmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        assignmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
