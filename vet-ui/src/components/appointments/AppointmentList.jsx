// Appointments of one patient. key = id.
export default function AppointmentList({ appointments, onCancel, onMarkDone, canEdit }) {
  return (
    <ul className="appt-list">
      {appointments.map((a) => (
        <li key={a.id} className="appt">
          <div>
            <p className="appt__when">{a.date}, {a.time}</p>
            <p className="appt__reason">{a.reason}</p>
            {a.vetNote && <p className="appt__note">{a.vetNote}</p>}
          </div>
          <div className="appt__side">
            <span className={`badge badge--${a.status}`}>{a.status}</span>
            {a.price != null && <span>{a.price} EUR</span>}
            {canEdit && a.status === 'scheduled' && (
              <div className="appt__actions">
                <button type="button" className="btn btn--ghost" onClick={() => onMarkDone(a)}>Mark done</button>
                <button type="button" className="btn btn--ghost" onClick={() => onCancel(a)}>Cancel</button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
