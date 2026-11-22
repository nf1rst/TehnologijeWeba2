// One <th> that shows the sort direction and raises onSort(key).
// direction: 'asc' | 'desc' | null
export default function SortableHeader({ columnKey, label, direction, onSort }) {
  const ariaSort = direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';
  const arrow = direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '↕';

  return (
    <th scope="col" aria-sort={ariaSort}>
      <button type="button" className="th-btn" onClick={() => onSort(columnKey)}>
        {label} <span aria-hidden="true" className="th-btn__arrow">{arrow}</span>
      </button>
    </th>
  );
}
