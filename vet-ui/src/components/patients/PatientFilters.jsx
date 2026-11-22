// Filters: species + neutered. Options come from props (loaded from /species).
export default function PatientFilters({ species, speciesId, neutered, onSpeciesChange, onNeuteredChange, onReset }) {
  return (
    <div className="filters">
      <div className="field field--inline">
        <label htmlFor="f-species">Species</label>
        <select id="f-species" value={speciesId} onChange={(e) => onSpeciesChange(e.target.value)}>
          <option value="">All</option>
          {species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="field field--inline">
        <label htmlFor="f-neutered">Neutered</label>
        <select id="f-neutered" value={neutered} onChange={(e) => onNeuteredChange(e.target.value)}>
          <option value="">Any</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button type="button" className="btn btn--ghost" onClick={onReset}>Clear filters</button>
    </div>
  );
}
