import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PatientsPage from './pages/PatientsPage.jsx';
import PatientDetailPage from './pages/PatientDetailPage.jsx';
import PatientAppointmentsTab from './pages/PatientAppointmentsTab.jsx';
import PatientEditPage from './pages/PatientEditPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// Route table only. No logic here (I3: 4+ routes, one parameterized, one nested, shared layout, 404).
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<PatientsPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>}/>

        <Route element={<ProtectedRoute />}>
          <Route path="patients/new" element={<PatientEditPage />} />
        </Route>

        {/* parameterized + nested */}
        <Route path="patients/:id" element={<PatientDetailPage />}>
          <Route index element={<PatientAppointmentsTab />} />
          <Route element={<ProtectedRoute />}>
            <Route path="edit" element={<PatientEditPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
