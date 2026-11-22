import SortableHeader from './SortableHeader.jsx';

// Domain-free table. Own implementation (no table libraries allowed).
// columns: [{ key, label, sortable?, render?(row) }]
// sort: { key, direction } | null
// rows arrive already searched/sorted/paginated by logic functions.
export default function DataTable({ columns, rows, sort, onSort, renderActions }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) =>
              col.sortable ? (
                <SortableHeader
                  key={col.key}
                  columnKey={col.key}
                  label={col.label}
                  direction={sort?.key === col.key ? sort.direction : null}
                  onSort={onSort}
                />
              ) : (
                <th key={col.key} scope="col">{col.label}</th>
              )
            )}
            {renderActions && <th scope="col"><span className="sr-only">Actions</span></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            // key = stable id, never the array index
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
              {renderActions && <td className="table__actions">{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
