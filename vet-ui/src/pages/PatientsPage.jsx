import { Link } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import SearchBox from '../components/ui/SearchBox.jsx';
import DataTable from '../components/ui/DataTable.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import PatientFilters from '../components/patients/PatientFilters.jsx';
import { useEffect, useState } from 'react';
import { patientHttp } from '../services/patientService.jsx';
import { speciesHttp } from '../services/SpeciesService.jsx';



export default function PatientsPage() {  
  const [patients, setPatients]=useState([]);
  const [species, setSpecies]=useState([]);
  const [loading, setLoading]=useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage]= useState(1)
  const [postsPerPage, setPostsPerPage]=useState(10)
  

  useEffect(()=>{
    async function loadPatients(){
      try{
        setLoading(true);
        const patientRes = await patientHttp.getAll();
        const speciesRes = await speciesHttp.getAll();

        const patientsList = Array.isArray(patientRes)?patientRes:(patientRes?.data || patientRes?.items ||[]);
        const speciesList = Array.isArray(speciesRes)?speciesRes:(speciesRes?.data || speciesRes?.items ||[]);

        setPatients(patientsList);
        setSpecies(speciesList);
      }
      catch(err){
        setError(err)
      }
      finally{
        setLoading(false)
      }
    }
    loadPatients()
  }, []); 
  const status = 'succeeded';

  
  const columns = [
    { key: 'name', label: 'Name', sortable: true, render: (r) => <Link to={`/patients/${r.id}`}>{r.name}</Link> },
    { key: 'speciesId', label: 'Species', sortable: true, render: (r) => species.find((s) => s.id === r.speciesId)?.name },
    { key: 'breed', label: 'Breed', sortable: true },
    { key: 'weightKg', label: 'Weight (kg)', sortable: true },
    { key: 'neutered', label: 'Neutered', sortable: true, render: (r) => (r.neutered ? 'Yes' : 'No') },
  ];

  const safePatients = Array.isArray(patients) ? patients : [];
  const totalPages = Math.max(1, Math.ceil(safePatients.length / postsPerPage));

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const rows = safePatients.slice(firstPostIndex, lastPostIndex);

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
          <Pagination page={currentPage} pages={totalPages} pageSize={postsPerPage} onPageChange={(newPage)=>setCurrentPage(newPage)} onPageSizeChange={(newSize)=>{
            setPostsPerPage(newSize);
            setCurrentPage(1);
          }} />
      </Card>
    </>
  );
}

