# Architecture Document - Chenyang Ma

## What does each implementation do?

- **useEmployees Hook**: Manages the employee state for components. It provides the filtered employee list, search term, and functions to add and delete employees.
- **employeeService**: Handles business logic for employees. It can validate new employee input, filter employees by search term, get all employees, add an employee, and delete an employee.
- **employeeRepository**: Handles all data access for employees. It has CRUD methods: getAll, getById, add, update, and delete. Right now it uses test data, but later it can be replaced with API calls.

## How did I decide what logic to include?

- **useEmployees Hook**: Hooks should only handle presentation logic. So I put state management (employee list, search term, errors) and functions that update the UI in the hook. The actual business logic like validation and filtering is in the service, not here.
- **employeeService**: Services should handle business logic like checking if the input is correct before saving, or filtering data based on a condition. It calls the repository for data access but does not touch any UI or state.
- **employeeRepository**: Repositories should only handle data access - reading and writing data. No validation or filtering logic belongs here. This makes it easy to swap the data source later without changing the service or hook.

## Where is each implementation used?

- **useEmployees Hook**: Used in `EmployeePage` (full hook - employee list, search, add, delete) and `HomePage` (shows total employee count).
- **employeeService**: Called by the `useEmployees` hook - uses `getAllEmployees()`, `filterEmployees()`, `addEmployee()`, and `deleteEmployee()`.
- **employeeRepository**: Called by `employeeService` to get and modify employee data.