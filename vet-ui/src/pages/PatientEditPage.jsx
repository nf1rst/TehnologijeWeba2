import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import PatientForm from '../components/patients/PatientForm.jsx';

// One page for /patients/new and /patients/:id/edit.
// useParams().id present -> edit mode (prefill from the store), otherwise create mode.
export default function PatientEditPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  // TODO(logic): values + onChange from a form hook; fieldErrors = client errors merged with server `fields`;
  // submitting from request status; on success navigate to /patients/:id.
  return (
    <Card title={isEdit ? 'Edit patient' : 'New patient'}>
      <PatientForm
        values={{}}
        fieldErrors={{}}
        species={[{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }]}
        owners={[{ id: 1, firstName: 'Ana', lastName: 'Horvat' }]}
        submitting={false}
        onChange={() => {}}
        onSubmit={(e) => e.preventDefault()}
        onCancel={() => {}}
      />
    </Card>
  );
}
