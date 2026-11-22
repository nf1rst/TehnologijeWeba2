import { NavLink, Outlet, Link } from 'react-router-dom';

// Shared shell: skip link, navbar, page outlet.
export default function AppLayout() {
  // TODO(I4): const user = useSelector(selectUser); dispatch(logout()) on button click.
  const user = null;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <Link to="/" className="brand">Vet Clinic</Link>
        <nav aria-label="Main" className="topbar__nav">
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/patients/new">New patient</NavLink>
        </nav>
        <div className="topbar__user">
          {user ? (
            <>
              <span>{user.name}</span>
              <button type="button" className="btn btn--ghost">Log out</button>
            </>
          ) : (
            <Link to="/login" className="btn btn--ghost">Log in</Link>
          )}
        </div>
      </header>
      <main id="main" className="page">
        <Outlet />
      </main>
    </>
  );
}
