import FormField from '../ui/FormField.jsx';

//label type name 

export default function PatientForm({ values = {}, fieldErrors = {}, species = [], owners = [], submitting = false, onChange, onSubmit, onCancel }) {
  const speciesOptions = species.map((s)=>({value: s.id, label :s.name}))
  const ownerOption = owners.map(o=>({value: o.id, label: `${o.firstName} ${o.lastName}`}))
  
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <FormField label="Name" name="name" value={values.name} onChange={onChange} error={fieldErrors.name} />
      <FormField label="Species" name="speciesId" value={values.speciesId} onChange={onChange} error={fieldErrors.speciesId} options={speciesOptions} />
      <FormField label="Owner" name="ownerId" value={values.ownerId} onChange={onChange} error={fieldErrors.ownerId} options={ownerOption} />
      <FormField label="Breed (optional)" name="breed" value={values.breed} onChange={onChange} error={fieldErrors.breed} />
      <FormField label="Date of birth" name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={onChange} error={fieldErrors.dateOfBirth} />
      <FormField label="Chip number" name="chipNumber" hint="15 digits. Required for dogs." value={values.chipNumber} onChange={onChange} error={fieldErrors.chipNumber} />
      <FormField label="Weight (kg)" name="weightKg" type="number" step="0.01" value={values.weightKg} onChange={onChange} error={fieldErrors.weightKg} />

      <div className="field field--check">
        <input id="neutered" type="checkbox" name="neutered" checked={Boolean(values.neutered)} onChange={onChange} />
        <label htmlFor="neutered">Neutered</label>
      </div>

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save patient'}
        </button>
      </div>
    </form>
  );
}
