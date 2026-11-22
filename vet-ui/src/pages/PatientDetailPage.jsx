import { Outlet, NavLink, useParams } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import AsyncBoundary from '../components/ui/AsyncBoundary.jsx';

// Parent of the nested routes: patient info on top, child route renders in <Outlet />.
export default function PatientDetailPage() {
  const { id } = useParams();
  // TODO(logic): load patient by id (?_embed=owner&_embed=species). A 404 from the API means "not found".
  const status = 'succeeded';
  const patient = { id, name: 'Luna', breed: 'Labrador', dateOfBirth: '2019-04-02', weightKg: 28.4, chipNumber: '123456789012345' };

  return (
    <AsyncBoundary status={status} isEmpty={!patient} emptyTitle="Patient not found">
      <div className="page__head">
        <h1>{patient.name}</h1>
      </div>
      <Card title="Details">
        <dl className="dl">
          <div><dt>Breed</dt><dd>{patient.breed}</dd></div>
          <div><dt>Born</dt><dd>{patient.dateOfBirth}</dd></div>
          <div><dt>Weight</dt><dd>{patient.weightKg} kg</dd></div>
          <div><dt>Chip</dt><dd>{patient.chipNumber}</dd></div>
        </dl>
      </Card>
      <nav className="tabs" aria-label="Patient sections">
        <NavLink end to={`/patients/${id}`}>Appointments</NavLink>
        <NavLink to={`/patients/${id}/edit`}>Edit patient</NavLink>
      </nav>
      <Outlet />
    </AsyncBoundary>
  );
}
