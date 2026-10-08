import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import WorkoutForm from "./pages/WorkoutForm";
import Goals from "./pages/Goals";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";

function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/add" element={<WorkoutForm />} />
          <Route path="/workouts/:id/edit" element={<WorkoutForm />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}