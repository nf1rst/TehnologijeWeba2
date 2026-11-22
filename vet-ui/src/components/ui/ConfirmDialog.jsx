// Native <dialog> keeps focus handling accessible.
// TODO(logic): a useConfirm hook holds the ref and calls dialogRef.current.showModal() / close().
export default function ConfirmDialog({ title, message, confirmLabel = 'Delete', busy, onConfirm, onCancel, dialogRef }) {
  return (
    <dialog ref={dialogRef} className="dialog" aria-labelledby="dialog-title" onCancel={onCancel}>
      <h2 id="dialog-title">{title}</h2>
      <p>{message}</p>
      <div className="dialog__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={busy}>
          {busy ? 'Working…' : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
