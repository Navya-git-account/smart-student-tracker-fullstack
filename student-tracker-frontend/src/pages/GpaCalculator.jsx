import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  RotateCcw,
  X
} from "lucide-react";

import { courseApi } from "../services/api";
import {
  calculateGpa,
  gradePoints
} from "../utils/gpa";


export default function GpaCalculator() {

  /* =========================
     STATE
     ========================= */

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =========================
     LOAD COURSES FROM BACKEND
     ========================= */

  useEffect(() => {

    courseApi
      .getAll()

      .then((data) => {
        setCourses(data);
        setError("");
      })

      .catch((err) => {

        console.error(
          "Could not load courses:",
          err
        );

        setError(
          "Could not load courses. Make sure the backend is running."
        );

      })

      .finally(() => {
        setLoading(false);
      });

  }, []);


  /* =========================
     CALCULATE GPA
     ========================= */

  const summary = useMemo(() => {

    return calculateGpa(courses);

  }, [courses]);


  /* =========================
     UPDATE COURSE LOCALLY
     Used by GPA calculator inputs
     ========================= */

  function updateCourse(id, field, value) {

    setCourses((currentCourses) =>

      currentCourses.map((course) => {

        if (course.id !== id) {
          return course;
        }


        return {
          ...course,

          [field]:
            field === "credits"
              ? Number(value)
              : value
        };

      })

    );

  }


  /* =========================
     ADD TEMPORARY COURSE
     Used only for GPA calculation
     ========================= */

  function addCourse() {

    const newCourse = {

      id: `local-${Date.now()}`,

      courseCode: "",

      courseName: "New Course",

      credits: 3,

      grade: "A"

    };


    setCourses((currentCourses) => [

      ...currentCourses,

      newCourse

    ]);

  }


  /* =========================
     REMOVE COURSE LOCALLY
     ========================= */

  function removeCourse(id) {

    setCourses((currentCourses) =>

      currentCourses.filter(
        (course) => course.id !== id
      )

    );

  }


  /* =========================
     RESET CALCULATOR
     ========================= */

  function resetCalculator() {

    setCourses([]);

  }


  /* =========================
     LOADING
     ========================= */

  if (loading) {

    return (

      <section className="page-section">

        <p className="loading-state">
          Loading GPA calculator...
        </p>

      </section>

    );

  }


  return (

    <section className="page-section">

      <div className="gpa-layout">


        {/* =========================
            GPA COURSE TABLE
            ========================= */}

        <section className="panel gpa-main">


          {/* Page Heading */}

          <div className="page-heading compact">

            <div>

              <h1>
                GPA Calculator
              </h1>

              <p>
                Your Courses
              </p>

            </div>

          </div>


          {/* Backend Error */}

          {error && (

            <p className="inline-message">

              {error}

            </p>

          )}


          {/* Course Table */}

          <div className="data-table">


            {/* Table Header */}

            <div className="data-row table-header gpa-row">

              <span>
                Course
              </span>

              <span>
                Credit Hours
              </span>

              <span>
                Grade
              </span>

              <span>
                Points
              </span>

              <span />

            </div>


            {/* Course Rows */}

            {courses.map((course) => {


              const credits =
                Number(course.credits) || 0;


              const gradePoint =
                gradePoints[course.grade] ?? 0;


              const points =
                credits * gradePoint;


              return (

                <div
                  className="data-row gpa-row"
                  key={course.id}
                >


                  {/* Course Name */}

                  <input
                    type="text"
                    value={course.courseName || ""}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        "courseName",
                        event.target.value
                      )
                    }
                    aria-label="Course name"
                  />


                  {/* Credits */}

                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={course.credits ?? ""}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        "credits",
                        event.target.value
                      )
                    }
                    aria-label="Credit hours"
                  />


                  {/* Grade */}

                  <select
                    value={course.grade || "A"}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        "grade",
                        event.target.value
                      )
                    }
                    aria-label="Grade"
                  >

                    {Object.keys(
                      gradePoints
                    ).map((grade) => (

                      <option
                        key={grade}
                        value={grade}
                      >

                        {grade}

                      </option>

                    ))}

                  </select>


                  {/* Grade Points */}

                  <span>

                    {points.toFixed(1)}

                  </span>


                  {/* Remove Course */}

                  <button
                    type="button"
                    className="table-icon-btn danger"
                    onClick={() =>
                      removeCourse(course.id)
                    }
                    aria-label={
                      `Remove ${course.courseName}`
                    }
                  >

                    <X size={16} />

                  </button>

                </div>

              );

            })}


            {/* Empty State */}

            {courses.length === 0 && (

              <div className="empty-state">

                <strong>
                  No courses
                </strong>

                <p>
                  Add a course to calculate your GPA.
                </p>

              </div>

            )}

          </div>


          {/* =========================
              ACTION BUTTONS
              ========================= */}

          <div className="gpa-actions">


            <button
              type="button"
              className="button secondary"
              onClick={addCourse}
            >

              <Plus size={16} />

              Add Course

            </button>


            <button
              type="button"
              className="button secondary"
              onClick={resetCalculator}
            >

              <RotateCcw size={16} />

              Reset

            </button>


          </div>

        </section>


        {/* =========================
            GPA SUMMARY
            ========================= */}

        <aside className="gpa-sidebar">


          <section className="panel summary-panel">

            <h2>
              GPA Summary
            </h2>


            {/* Total Credits */}

            <div className="summary-number">

              <span>
                Total Credit Hours
              </span>

              <strong>

                {summary.totalCredits}

              </strong>

            </div>


            {/* Total Points */}

            <div className="summary-number">

              <span>
                Total Points
              </span>

              <strong>

                {Number(
                  summary.totalPoints || 0
                ).toFixed(1)}

              </strong>

            </div>


            {/* Current GPA */}

            <div className="summary-number">

              <span>
                Current GPA
              </span>

              <strong>

                {Number(
                  summary.gpa || 0
                ).toFixed(2)}

              </strong>

            </div>

          </section>


          {/* =========================
              GRADE SCALE
              ========================= */}

          <section className="panel grade-scale">

            <h2>
              Grade Scale
            </h2>


            <div className="grade-grid">

              {Object.entries(
                gradePoints
              ).map(
                ([grade, points]) => (

                  <span key={grade}>

                    {grade}
                    {" = "}
                    {points.toFixed(1)}

                  </span>

                )
              )}

            </div>

          </section>

        </aside>

      </div>

    </section>

  );

}