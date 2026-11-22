import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="state state--empty">
      <h1>Page not found</h1>
      <p>That address does not exist.</p>
      <Link to="/patients" className="btn">Back to patients</Link>
    </div>
  );
}
