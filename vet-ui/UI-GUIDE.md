# UI skeleton guide

Everything here is presentational. Every `TODO(logic)` comment marks where your logic plugs in.
Run: `npm install`, copy `.env.example` to `.env`, `npm run dev`.

## What each part does and what to wire

### Entry and routing
| File | Purpose | Wire up |
|---|---|---|
| `main.jsx` | Mounts React, BrowserRouter, global CSS | Wrap in Redux `<Provider>` |
| `App.jsx` | Route table only: shared layout, parameterized `patients/:id`, nested `edit` and index, protected group, `*` 404 | Nothing; keep logic out |
| `routes/ProtectedRoute.jsx` | Gate for private routes (currently passes through) | Read auth state; if no user, `<Navigate to="/login" replace state={{ from: location }} />` |
| `layout/AppLayout.jsx` | Skip link, navbar, `<Outlet />` | Show real user, dispatch logout, hide protected links when logged out |

### Generic UI components (`components/ui`, no domain knowledge)
| Component | Purpose | Wire up |
|---|---|---|
| `Card` | Titled box, takes `children` | Nothing |
| `SearchBox` | Controlled search input | Feed a debounced value into your list hook |
| `SortableHeader` | `<th>` with sort arrow and `aria-sort` | Nothing; it calls `onSort(key)` |
| `DataTable` | Own table: columns config, rows, sort props, action slot; `key={row.id}` | Pass rows already searched, sorted and paginated by `logic/` functions |
| `Pagination` | Prev/next and page size 10/20/50 | Pass page, pages, pageSize and setters; reset page to 1 when search, filters or size change |
| `FormField` | Label, control, hint, error with aria wiring | Pass `error` from client validation or server `fields` |
| `ConfirmDialog` | Native `<dialog>` for delete confirmation | A `useConfirm` hook owns the ref and calls `showModal()` / `close()` |
| `AsyncBoundary` | Chooses idle, loading, failed, empty or success | Pass status and error kind from the store; map thrown errors to `network`, `unauthorized`, `server` |

### Domain components
| Component | Purpose | Wire up |
|---|---|---|
| `PatientFilters` | Species and neutered selects | Species options from `/species`; values from your list hook |
| `PatientForm` | Create and edit form | Make controlled (hook), run a pure validator, merge server `fields`, set `submitting` from request status |
| `AppointmentList` | Appointments with status badge and actions | `onMarkDone` / `onCancel` send PATCH `{status}`; hide actions for non-logged-in users |

### Pages (one per route)
| Page | Route | Wire up |
|---|---|---|
| `PatientsPage` | `/`, `/patients` | List hook: fetch, search, sort, filter, paginate, delete with confirm |
| `PatientDetailPage` | `/patients/:id` | Fetch by id with `?_embed=owner&_embed=species`; 404 shows "not found" |
| `PatientAppointmentsTab` | `/patients/:id` (index) | Fetch `/patients/:id/appointments`; book form with 409 slot error on `time` |
| `PatientEditPage` | `/patients/new`, `/patients/:id/edit` | `id` present means prefill and PUT/PATCH, else POST; navigate on success |
| `LoginPage` | `/login` | POST `/login`, store token, go back to `location.state.from` |
| `NotFoundPage` | `*` | Nothing |

## How to make the UI functional (suggested order)
1. Replace the sample arrays in `PatientsPage` with data from a service and the store; keep `AsyncBoundary` as the only place that picks a state.
2. Write pure functions in `logic/`: `searchRows`, `sortRows`, `filterRows`, `paginate`. Compose them in a list hook and give `DataTable` the result.
3. Replace `() => {}` handlers with real setters. Sort toggling goes none, asc, desc, or asc/desc only.
4. Make `PatientForm` controlled; validation function returns `{field: message}`; show server `fields` through the same prop.
5. Add the double-submit guard: set `submitting` before the request and disable the submit button until it settles.
6. Implement `ProtectedRoute`, the login flow, and token persistence.
7. Add `ConfirmDialog` to deletes; handle 409 (owner or species with patients) by showing the server message.
8. Extract repeated logic into hooks used in at least two places (list view, form submit, debounce, confirm).

## Accessibility and responsive notes already in place
- Every input has a label tied through `useId`; errors use `aria-describedby` and `role="alert"`.
- Skip link, visible focus ring, sortable headers are real buttons with `aria-sort`.
- Tables scroll horizontally inside their wrapper at 375px; toolbars wrap; form buttons stack on small screens.
- Keep an `<h1>` per page and do not remove the focus styles.
