import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import AssignmentFormPage from "./pages/AssignmentFormPage";
import Courses from "./pages/Courses";
import GpaCalculator from "./pages/GpaCalculator";
import Contact from "./pages/Contact";
import CalendarPage from "./pages/CalendarPage";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/assignments" element={<Assignments />} />
        <Route
          path="/assignments/new"
          element={<AssignmentFormPage />}
        />
        <Route
          path="/assignments/:id/edit"
          element={<AssignmentFormPage />}
        />

        <Route path="/courses" element={<Courses />} />
        <Route path="/gpa" element={<GpaCalculator />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}