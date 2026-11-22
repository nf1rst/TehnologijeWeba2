import { Link } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import SearchBox from '../components/ui/SearchBox.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import AsyncBoundary from '../components/ui/AsyncBoundary.jsx';
import PatientFilters from '../components/patients/PatientFilters.jsx';

// STATIC PLACEHOLDERS: replace every constant below with hook/store values.
const sample = [
  { id: 1, name: 'Luna', speciesId: 1, breed: 'Labrador', weightKg: 28.4, neutered: true },
  { id: 2, name: 'Miso', speciesId: 2, breed: 'Domestic shorthair', weightKg: 4.1, neutered: false },
];
const species = [{ id: 1, name: 'Dog' }, { id: 2, name: 'Cat' }];

const columns = [
  { key: 'name', label: 'Name', sortable: true, render: (r) => <Link to={`/patients/${r.id}`}>{r.name}</Link> },
  { key: 'speciesId', label: 'Species', sortable: true, render: (r) => species.find((s) => s.id === r.speciesId)?.name },
  { key: 'breed', label: 'Breed', sortable: true },
  { key: 'weightKg', label: 'Weight (kg)', sortable: true },
  { key: 'neutered', label: 'Neutered', sortable: true, render: (r) => (r.neutered ? 'Yes' : 'No') },
];

export default function PatientsPage() {
  // TODO(logic): one list hook returns rows, status, error, search, sort, filters, page, pages, pageSize and setters.
  const status = 'succeeded';
  const rows = sample;

  return (
    <>
      <div className="page__head">
        <h1>Patients</h1>
        <Link to="/patients/new" className="btn">Add patient</Link>
      </div>

      <Card>
        <div className="toolbar">
          <SearchBox value="" onChange={() => {}} label="Search patients" placeholder="Name, breed, chip" />
          <PatientFilters species={species} speciesId="" neutered="" onSpeciesChange={() => {}} onNeuteredChange={() => {}} onReset={() => {}} />
        </div>

        <AsyncBoundary status={status} isEmpty={rows.length === 0} emptyTitle="No patients match" emptyHint="Try a different search or clear the filters." onRetry={() => {}}>
          <DataTable
            columns={columns}
            rows={rows}
            sort={{ key: 'name', direction: 'asc' }}
            onSort={() => {}}
            renderActions={(row) => (
              <>
                <Link to={`/patients/${row.id}/edit`} className="btn btn--ghost">Edit</Link>
                <button type="button" className="btn btn--ghost" onClick={() => {}}>Delete</button>
              </>
            )}
          />
          <Pagination page={1} pages={1} pageSize={10} onPageChange={() => {}} onPageSizeChange={() => {}} />
        </AsyncBoundary>
      </Card>
    </>
  );
}
