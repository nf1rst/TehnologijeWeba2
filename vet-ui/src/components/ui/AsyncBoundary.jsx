// Decides which of the five request states to show, so pages stay clean.
// status: 'idle' | 'loading' | 'failed' | 'succeeded'
// error: { kind: 'network' | 'unauthorized' | 'server' | 'other', message }
const ERROR_TEXT = {
  network: 'Cannot reach the server. Check that it is running and try again.',
  unauthorized: 'Your session has expired. Log in again to continue.',
  server: 'The server had a problem. Try again in a moment.',
};

export default function AsyncBoundary({ status, error, isEmpty, emptyTitle = 'Nothing here yet', emptyHint, onRetry, children }) {
  if (status === 'idle') {
    return <p className="state state--idle">Results will appear here.</p>;
  }
  if (status === 'loading') {
    return <p className="state state--loading" role="status">Loading…</p>;
  }
  if (status === 'failed') {
    return (
      <div className="state state--error" role="alert">
        <p>{ERROR_TEXT[error?.kind] ?? error?.message ?? 'Something went wrong.'}</p>
        {onRetry && <button type="button" className="btn" onClick={onRetry}>Try again</button>}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="state state--empty">
        <p><strong>{emptyTitle}</strong></p>
        {emptyHint && <p>{emptyHint}</p>}
      </div>
    );
  }
  return children;
}
