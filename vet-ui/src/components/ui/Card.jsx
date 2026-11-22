// Uses children (I3 requirement). Generic wrapper with optional title and actions.
export default function Card({ title, actions, children }) {
  return (
    <section className="card">
      {(title || actions) && (
        <div className="card__head">
          {title && <h2 className="card__title">{title}</h2>}
          {actions && <div className="card__actions">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
