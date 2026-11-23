import { NavLink, Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  const user = null;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <Link to="/" className="brand">Vet Clinic</Link>
        <nav aria-label="Main" className="topbar__nav">
          <NavLink to="/patients">Patients</NavLink>
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
