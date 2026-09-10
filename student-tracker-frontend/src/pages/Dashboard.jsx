import { useEffect, useMemo, useState } from "react";

import { assignmentApi, courseApi } from "../services/api";
import {
  sampleAssignments,
  sampleCourses
} from "../data/sampleData";

import StatCard from "../components/common/StatCard";

import { calculateGpa } from "../utils/gpa";
import {
  formatDate,
  getDaysUntil,
  getUrgencyLabel
} from "../utils/date";

import {
  ClipboardList,
  Clock3,
  BookOpen,
  BarChart3,
  CalendarDays,
  ListChecks
} from "lucide-react";
/* ========================================
   Creates all dates needed for the calendar
   ======================================== */
function getCalendarDays(currentMonth) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const calendarDays = [];
  // Add empty spaces before the first day
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  // Add all days in the selected month
  for (let day = 1; day <= totalDays; day++) {
    calendarDays.push(
      new Date(year, month, day)
    );
  }

  return calendarDays;
}
/* ========================================
   Returns greeting based on current time
   ======================================== */
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
}

/* ========================================
   Dashboard Component
   ======================================== */
export default function Dashboard() {

  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  /* ========================================
     Load assignments and courses from backend
     ======================================== */
  useEffect(() => {

    Promise.all([
      assignmentApi.getAll(),
      courseApi.getAll()
    ])
      .then(([a, c]) => {
        setAssignments(a);
        setCourses(c);
      })
      .catch(() => {
        setAssignments(sampleAssignments);
        setCourses(sampleCourses);
        setDemo(true);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  /* ========================================
     Find assignments due within 24 hours
     ======================================== */
  const dueSoon = useMemo(() => {

    return assignments.filter((a) => {
      // Ignore completed assignments
      if (
        (a.status || "").toUpperCase() === "COMPLETED"
      ) {
        return false;
      }

      const d = getDaysUntil(a.dueDate);

      return (
        d !== null &&
        d >= 0 &&
        d <= 1
      );
    });

  }, [assignments]);

  /* ========================================
     Get the next 4 upcoming assignments
     ======================================== */
  const upcoming = useMemo(() => {

    return [...assignments]
      .filter(
        (a) =>
          (a.status || "").toUpperCase() !== "COMPLETED"
      )
      .sort(
        (a, b) =>
          (a.dueDate || "").localeCompare(
            b.dueDate || ""
          )
      )
      .slice(0, 4);

  }, [assignments]);

  /* Calculate GPA from course data */
  const gpa = calculateGpa(courses);

  /* Loading message */
  if (loading) {
    return (
      <p className="loading-state">
        Loading dashboard...
      </p>
    );
  }
  /* ========================================
     Calendar information
     ======================================== */
  const calendarDays = getCalendarDays(currentMonth);

  const today = new Date();

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long"
  });

  const currentYear = currentMonth.getFullYear();
  /* Go to previous month */
  function goToPreviousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }
  /* Go to next month */
  function goToNextMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  }

  return (
    <section className="page-section dashboard-page">

      <div className="page-heading">
        <div>
          <h1>{getGreeting()}, Student!</h1>
          <p>Here's an overview of your current academic work.</p>
        </div>
      </div>


      {demo && (
        <p className="demo-banner">
          Backend is not reachable, so sample data is being shown.
        </p>
      )}


      <div className="stats-grid">

        {/* Assignments */}
        <article className="stat-card">
          <div className="stat-icon">
            <ClipboardList size={24} />
          </div>

          <div className="stat-content">
            <strong className="stat-value">
              {assignments.length}
            </strong>

            <span className="stat-label">
              Assignments
            </span>

            <span className="stat-helper">
              Total
            </span>
          </div>
        </article>


        {/* Due Soon */}
        <article className="stat-card">
          <div className="stat-icon">
            <Clock3 size={24} />
          </div>

          <div className="stat-content">
            <strong className="stat-value">
              {dueSoon.length}
            </strong>

            <span className="stat-label">
              Due Soon
            </span>

            <span className="stat-helper">
              Next 24 hours
            </span>
          </div>
        </article>


        {/* Courses */}
        <article className="stat-card">
          <div className="stat-icon">
            <BookOpen size={24} />
          </div>

          <div className="stat-content">
            <strong className="stat-value">
              {courses.length}
            </strong>

            <span className="stat-label">
              Courses
            </span>

            <span className="stat-helper">
              Enrolled
            </span>
          </div>
        </article>


        {/* GPA */}
        <article className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>

          <div className="stat-content">
            <strong className="stat-value">
              {Number(gpa?.gpa || 0).toFixed(2)}
            </strong>

            <span className="stat-label">
              Current GPA
            </span>

            <span className="stat-helper">
              Keep it up!
            </span>
          </div>
        </article>

      </div>


      <div className="dashboard-grid">

        <section className="panel upcoming-panel">

          <h2>
            Upcoming Assignments
          </h2>

          <div className="upcoming-list">

            {upcoming.length ? (

              upcoming.map((a) => (

                <article
                  className="upcoming-card"
                  key={a.id}
                >

                  <strong>
                    {a.title}
                  </strong>

                  <span>
                    {a.course || "Course"} · {formatDate(a.dueDate)}
                  </span>

                  <span className="mini-status">
                    {getUrgencyLabel(
                      a.dueDate,
                      a.status
                    )}
                  </span>

                </article>
              ))

            ) : (

              <p className="muted">
                No upcoming assignments.
              </p>

            )}

          </div>

        </section>


        <div className="dashboard-right">

          <section className="panel calendar-panel">

            <div className="calendar-header">

              <button
                className="calendar-arrow"
                type="button"
                onClick={goToPreviousMonth}
              >
                &lt;
              </button>

              <h2>
                {monthName} {currentYear}
              </h2>

              <button
                className="calendar-arrow"
                type="button"
                onClick={goToNextMonth}
              >
                &gt;
              </button>

            </div>


            <div className="calendar-weekdays">

              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>

            </div>


            <div className="calendar-grid">

              {calendarDays.map((day, index) => {

                if (!day) {
                  return (
                    <div
                      className="calendar-day empty-day"
                      key={index}
                    />
                  );
                }


                const isToday =
                  day.getDate() === today.getDate() &&
                  day.getMonth() === today.getMonth() &&
                  day.getFullYear() === today.getFullYear();


                return (
                  <div
                    className="calendar-day"
                    key={day.toDateString()}
                  >

                    <span
                      className={
                        isToday
                          ? "calendar-date today-date"
                          : "calendar-date"
                      }
                    >
                      {day.getDate()}
                    </span>

                  </div>
                );
              })}

            </div>

          </section>


          <section className="panel">

            <h2>
              Recent Courses
            </h2>

            <div className="simple-list">

              {courses
                .slice(0, 4)
                .map((c) => (

                  <span key={c.id}>
                    {c.courseName}
                  </span>

                ))}

            </div>

          </section>

        </div>

      </div>

    </section>
  );
}