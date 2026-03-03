# Architectural Layout - Jiyu Cai (Member C)
 
## 1. Repository Layer
**File:** `src/apis/leaveRepo.ts`

### What does it do?
It handles **data access**. Currently, it uses **Mock Data** (an array of 10 items) to simulate a database. It provides methods to `fetch`, `add`, and `delete` leave requests.

### Why this logic?
I wanted to separate **data storage** from the rest of the app.
- **Separation of Concerns:** The UI doesn't need to know if data comes from a variable or a real API.
- **Benefit:** When we add a real backend later, I only need to change this file.

### Where is it used?
- **Used by:** `src/services/leaveService.ts` to get or save data.

---

## 2. Service Layer
**Files:** `src/services/leaveService.ts` (Also contributed to `clockService.ts` & `employeeService.ts`)

### What does it do?
It handles **business logic** and **validation**.
- It checks if the form input is valid (e.g., "Reason cannot be empty").
- It delegates data saving to the Repository.

### Why this logic?
I wanted to keep the **Components clean**.
- **Separation of Concerns:** Components should only handle rendering, not logic.
- **Benefit:** The validation logic is reusable. I also helped the team refactor their logic into services to follow this pattern.

### Where is it used?
- **Used by:** The custom hook `useLeaveRequests.ts` and the component `LeaveRequests.tsx` (for validation).

---

## 3. Custom Hook Layer
**File:** `src/hooks/useLeaveRequests.ts`

### What does it do?
It acts as a **State Manager**.
- It holds the React State (`requests`, `error`).
- It calls the Service to fetch data when the component mounts (`useEffect`).

### Why this logic?
I wanted to separate **State logic** from **UI rendering**.
- **Separation of Concerns:** The UI component (`LeaveRequests.tsx`) becomes a "dumb component"—it just displays data.
- **Benefit:** If I need to show Leave Requests on another page, I can just reuse this hook.

### Where is it used?
- **Used by:** `src/components/common/leave-requests/LeaveRequests.tsx`.