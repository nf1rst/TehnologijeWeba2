import Card from '../components/ui/Card.jsx';
import AsyncBoundary from '../components/ui/AsyncBoundary.jsx';
import AppointmentList from '../components/appointments/AppointmentList.jsx';

// Nested index route. Data: GET /patients/:id/appointments
export default function PatientAppointmentsTab() {
  // TODO(logic): fetch via store/hook using useParams().id
  const appointments = [
    { id: 1, date: '2027-01-12', time: '09:30', reason: 'Annual vaccination', status: 'scheduled', price: 35 },
    { id: 2, date: '2026-09-03', time: '11:00', reason: 'Skin check', status: 'done', price: 20, vetNote: 'Healing well.' },
  ];

  return (
    <Card title="Appointments" actions={<button type="button" className="btn">Book appointment</button>}>
      <AsyncBoundary status="succeeded" isEmpty={appointments.length === 0} emptyTitle="No appointments yet" emptyHint="Book the first one for this patient.">
        <AppointmentList appointments={appointments} canEdit onCancel={() => {}} onMarkDone={() => {}} />
      </AsyncBoundary>
    </Card>
  );
}
