import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import PatientForm from '../components/patients/PatientForm.jsx';
import { useEffect, useState } from 'react';
import { speciesHttp } from '../services/SpeciesService.jsx';
import { patientHttp } from '../services/patientService.jsx';

const INITIAL_VALUES = {
  name: '',
  speciesId: '',
  ownerId: '',
  breed: '',
  dateOfBirth: '',
  chipNumber: '',
  weightKg: '',
  neutered: false,
};

export default function PatientEditPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [values, setValues]=useState(INITIAL_VALUES)
  const [species, setSpecies]= useState([])
  const [owners, setOwners]=useState([])
  const [submitting, setSubmitting]=useState(false)
  const [error, setError]= useState(null)
  const [fieldErrors, setFieldErrors]=useState({})

  function showError(err){
    console.error(err)
    setError(err.response?.data?.message)
  }

  useEffect(()=>{
    speciesHttp.getAll().then(setSpecies).catch(showError)
    //set owners
  }, [])

  useEffect(()=>{
    if(isEdit){
      patientHttp
      .getById(id)
      .then(patient=>setValues({...INITIAL_VALUES, ...patient}))
      .catch(showError)
    }
  }, [id])

  function handleChange(e){
    const {name, type, value, checked} = e.target
    setValues({...values, [name]: type ==='checkbox'? checked:value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setFieldErrors({})

    const payload = {
      name: values.name,
      speciesId: Number(values.speciesId),
      ownerId: Number(values.ownerId),
      breed: values.breed,
      dateOfBirth: values.dateOfBirth,
      chipNumber: values.chipNumber || undefined,
      weightKg: Number(values.weightKg),
      neutered: values.neutered,
    };

    try{
      if(isEdit){
        await patientHttp.update(id, payload)
      }
      else{
        await patientHttp.insert(payload)
      }
      navigate('/patients')
    }
    catch(err){
      setFieldErrors(err.response?.data?.fields ||{})
      setError(err.response?.data?.message ||'Failed to save patient')
    }
    finally{
      setSubmitting(false)
    }
  }

  return (
    <Card title={isEdit ? 'Edit patient' : 'New patient'}>
      <PatientForm
        values={values}
        fieldErrors={fieldErrors}
        species={species}
        owners={owners}
        submitting={submitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/patients')}
      />
    </Card>
  );
}
