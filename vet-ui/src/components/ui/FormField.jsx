import { useId } from 'react';

// Label + control + error text, wired together for screen readers.
// Children is a render function so id / aria props reach the input:
// <FormField label="Name" error={errors.name}>{(p) => <input name="name" {...p} />}</FormField>
export default function FormField({ label, error, hint, children }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {hint && <p id={hintId} className="field__hint">{hint}</p>}
      {error && <p id={errorId} className="field__error" role="alert">{error}</p>}
    </div>
  );
}
