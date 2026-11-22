export default function SearchBox({ value, onChange, label = 'Search', placeholder }) {
  return (
    <div className="field field--inline">
      <label htmlFor="search">{label}</label>
      <input
        id="search"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}