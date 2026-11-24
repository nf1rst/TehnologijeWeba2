import { useId } from 'react';

export default function FormField({ label, error, hint, options,...inputProps }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>

    {options? 
      <select {...inputProps}>
        <option value="">Select...</option>
        {options.map((opt)=>(
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))};
      </select>:(
        <input{...inputProps}/>
      )}
      
      {hint && <p id={hintId} className="field__hint">{hint}</p>}
      {error && <p id={errorId} className="field__error" role="alert">{error}</p>}
    </div>
  );
}
