import { Outlet } from 'react-router-dom';

// TODO(I3): read the logged-in user from the auth slice.
// If missing: <Navigate to="/login" replace state={{ from: location }} />
// LoginPage then navigates back to state.from after a successful login.
export default function ProtectedRoute() {
  return <Outlet />;
}
