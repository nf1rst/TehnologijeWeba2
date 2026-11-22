// Page buttons + page-size select. Fully controlled.
export default function Pagination({ page, pages, pageSize, onPageChange, onPageSizeChange, sizes = [10, 20, 50] }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="field field--inline">
        <label htmlFor="page-size">Per page</label>
        <select id="page-size" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="pagination__buttons">
        <button type="button" className="btn btn--ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span aria-live="polite">Page {page} of {pages}</span>
        <button type="button" className="btn btn--ghost" disabled={page >= pages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </nav>
  );
}
