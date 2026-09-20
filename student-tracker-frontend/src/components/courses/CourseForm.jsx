import { useEffect, useState } from "react";

import FormMessage from "../common/FormMessage";

export default function CourseForm({
  course,
  onSave,
  onCancel,
  isSaving
}) {
  // Stores the current values entered in the course form
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    instructor: "",
    credits: 3,
    grade: "A"
  });

  // Stores validation errors for individual form fields
  const [errors, setErrors] = useState({});

  // Populate the form when editing an existing course
  useEffect(() => {
    setForm({
      courseCode: course?.courseCode || "",
      courseName: course?.courseName || "",
      instructor: course?.instructor || "",
      credits: course?.credits || 3,
      grade: course?.grade || "A"
    });
  }, [course]);

  // Updates the changed field and clears its previous validation error
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: ""
    }));
  }

  // Validates the form before saving the course
  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};

    if (!form.courseCode.trim()) {
      nextErrors.courseCode = "Course code is required.";
    }

    if (!form.courseName.trim()) {
      nextErrors.courseName = "Course name is required.";
    }

    if (!Number(form.credits) || Number(form.credits) < 1) {
      nextErrors.credits = "Credits must be at least 1.";
    }

    setErrors(nextErrors);

    // Save only when all validation checks pass
    if (!Object.keys(nextErrors).length) {
      onSave({
        ...form,
        credits: Number(form.credits)
      });
    }
  }

  return (
    <form
      className="course-form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <label>
          <span>Course Code</span>

          <input
            name="courseCode"
            value={form.courseCode}
            onChange={handleChange}
          />

          <FormMessage>
            {errors.courseCode}
          </FormMessage>
        </label>

        <label>
          <span>Course Name</span>

          <input
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
          />

          <FormMessage>
            {errors.courseName}
          </FormMessage>
        </label>

        <label>
          <span>Instructor</span>

          <input
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Credit Hours</span>

          <input
            type="number"
            min="1"
            max="8"
            name="credits"
            value={form.credits}
            onChange={handleChange}
          />

          <FormMessage>
            {errors.credits}
          </FormMessage>
        </label>

        <label>
          <span>Grade</span>

          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
          >
            {[
              "A",
              "A-",
              "B+",
              "B",
              "B-",
              "C+",
              "C",
              "C-",
              "D+",
              "D",
              "F"
            ].map((grade) => (
              <option key={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="button secondary"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="button primary"
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : course
              ? "Update Course"
              : "Add Course"}
        </button>
      </div>
    </form>
  );
}