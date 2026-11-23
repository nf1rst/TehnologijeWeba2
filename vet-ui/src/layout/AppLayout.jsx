import { useEffect, useState } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export default function AppLayout() {
  const[user, setUser]=useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    const savedUser=localStorage.getItem('user')
    setUser(savedUser?JSON.parse(savedUser):null)
    }, [location])

    function handleLogout(){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      navigate('/login')
    }
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
