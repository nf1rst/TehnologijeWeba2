import FormField from '../ui/FormField.jsx';

// Create and edit share this form. Presentational only.
// fieldErrors: { fieldName: message } from the client OR the server's 400 `fields`.
// submitting: disables the button (double-submit guard).
// TODO(logic): control it with a form hook, validate with a pure function in logic/validation.js,
// and merge server `fields` into fieldErrors.
export default function PatientForm({ values = {}, fieldErrors = {}, species = [], owners = [], submitting = false, onChange, onSubmit, onCancel }) {
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <FormField label="Name" error={fieldErrors.name}>
        {(p) => <input {...p} name="name" value={values.name ?? ''} onChange={onChange} />}
      </FormField>

      <FormField label="Species" error={fieldErrors.speciesId}>
        {(p) => (
          <select {...p} name="speciesId" value={values.speciesId ?? ''} onChange={onChange}>
            <option value="">Select species</option>
            {species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        )}
      </FormField>

      <FormField label="Owner" error={fieldErrors.ownerId}>
        {(p) => (
          <select {...p} name="ownerId" value={values.ownerId ?? ''} onChange={onChange}>
            <option value="">Select owner</option>
            {owners.map((o) => <option key={o.id} value={o.id}>{o.firstName} {o.lastName}</option>)}
          </select>
        )}
      </FormField>

      <FormField label="Breed (optional)" error={fieldErrors.breed}>
        {(p) => <input {...p} name="breed" value={values.breed ?? ''} onChange={onChange} />}
      </FormField>

      <FormField label="Date of birth" error={fieldErrors.dateOfBirth}>
        {(p) => <input {...p} type="date" name="dateOfBirth" value={values.dateOfBirth ?? ''} onChange={onChange} />}
      </FormField>

      <FormField label="Chip number" hint="15 digits. Required for dogs." error={fieldErrors.chipNumber}>
        {(p) => <input {...p} name="chipNumber" inputMode="numeric" value={values.chipNumber ?? ''} onChange={onChange} />}
      </FormField>

      <FormField label="Weight (kg)" error={fieldErrors.weightKg}>
        {(p) => <input {...p} type="number" step="0.01" name="weightKg" value={values.weightKg ?? ''} onChange={onChange} />}
      </FormField>

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
