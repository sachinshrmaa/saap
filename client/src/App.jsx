import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import AttendanceLog from "./pages/student/AttendanceLog.jsx";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import LogAttendance from "./pages/teacher/LogAttendance.jsx";
import TeacherDashboardLayout from "./pages/teacher/TeacherDashboardLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/student/attendance-log",
    element: <AttendanceLog />,
  },
  {
    path: "/teacher",
    element: <TeacherDashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "log-attendance",
        element: <LogAttendance />,
      },
    ],
  },
  {
    path: "/teacher/dashboard",
    element: <TeacherDashboard />,
  },
  {
    path: "/teacher/log-attendance",
    element: <LogAttendance />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
