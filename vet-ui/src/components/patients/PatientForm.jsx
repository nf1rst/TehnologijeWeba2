import FormField from '../ui/FormField.jsx';

//label type name 

// | Polje | Vrsta | Obavezno | Pravila | Opis |
// |---|---|---|---|---|
// | `id` | broj | — | dodjeljuje poslužitelj | identifikator |
// | `name` | tekst | da | 1–40 znakova | ime životinje |
// | `speciesId` | identifikator | da | → /species | vrsta |
// | `ownerId` | identifikator | da | → /owners | vlasnik |
// | `breed` | tekst | ne | najviše 60 znakova | pasmina |
// | `dateOfBirth` | datum GGGG-MM-DD | da |  | datum rođenja |
// | `chipNumber` | tekst | ne | oblik `^\d{15}$`, jedinstveno | broj mikročipa, 15 znamenaka |
// | `weightKg` | broj | da | od 0,01 do 150 | masa u kilogramima |
// | `neutered` | da/ne | ne | zadano: `false` | kastrirano ili sterilizirano |


export default function PatientForm({ values = {}, fieldErrors = {}, species = [], owners = [], submitting = false, onChange, onSubmit, onCancel }) {
  const speciesOptions = species.map((s)=>({value: s.id, label :s.name}))
  const ownersOption = owners.map(o=>({value: o.id, label: `${o.firstName} ${o.lastName}`}))
  
  return (
    <form className="form" noValidate onSubmit={onSubmit}>

      <FormField label="Name" name="name" value={values.name??''} onChange={onchange} error={fieldErrors.name} />

      <FormField label="Species" name="speciesId" value={values.speciesId??''} onChange={onchange} error={fieldErrors.speciesId} options={speciesOptions}  />

      <FormField label="Owner" name="ownerId" value={values.ownerId??''} onChange={onchange} error={fieldErrors.ownerId} options={ownersOption} />

      <FormField label="Breed(optional)" value={values.breed??''} onChange={onchange} error={fieldErrors.breed}/>

      <FormField label="Date of birth" error={fieldErrors.dateOfBirth} value={values.dateOfBirth??''} name="dateOfBirth" type="date"  onChange={onchange}/>

      <FormField label="Chip number" value={values.chipNumber??''} hint="15 digits. Required for dogs" onChange={onchange} error={fieldErrors.chipNumber} name="chipNumber"/>

      <FormField label="Weight(kg)" onChange={onchange} value={values.weight??''} error={fieldErrors.weight} name="weight" />

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
