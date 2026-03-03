### Sprint 3

## I.4: Architectural Layout Document (P2)

# **TimePilot Time Tracking Architecture**

# Mardown documentation by Alyssa Urquiola

- This document explains the architecture and detail implementations for the **Time Tracking - Clock In/Out Page**.
It covers the new *hook, service, repository, and test data* as a requirement for Sprint 3:

UI (current) → **Hook → Service → Repository** → Test Data

- Each implementation **(Hook, Service, and epository)** has its own three descriptions:
    1. What does this hook/service/repository do?
    2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
    3. Where is this implementation made use of in the project and how?

# **1. Hook**

# What does this *useClockInOut (Hook)* do?
- This manages all the Time Tracking state such as attendance history records, success messages, and errors.
- It will load records for the user currently logged in.
- Enriches raw repository data with employee details (Name, role, and department).
- It has UI-ready actions for Clock-In, Clock-Out, and Delete.
- It also gives the user's current clock-in status based on the latest record.
- The *useClockInOut (Hook)* is used exclusively in the *ClockInOut.tsx* Time Tracking page.

# How and why did I decide to use this *useClockInOut (Hook)* logic?
- I decided to use this hook for the Time Tracking Page because it is the most maintainable way to separate UI concerns from business logic here in the Sprint 3 architecture.
- In Sprint 2, Time Tracking page had scattered logic inside the UI. So, putting everything into a hook it can consolidate all the records making it clean.
- It keeps the UI simple and clean by enriching employee details as well as determining the user's clock-in status, ensuring consistent behavior across the project's hook design.

# Where and how the *useClockInOut (Hook)* was used in the Time Tracking page?
- The hook is used in *src/components/common/clock-in-out/ClockInOut.tsx* and inside the file where the UI subsscribes the hook.
- The UI reads all the Time Tracking data such as the records, errors, success messages, and clock-in status.
- The UI also triggers all actions through the hook. The page doesn't calls the service or repositry directly. Instead, it calls the hook's exposed functions. These functions *handleClockIn(location), handleClockOut(id, location), and handleRemove(id)* internally call the service -> repository pipleline.
- This hook also automatically re-renders the UI instantly whenever a user submitted a new record, updated it, or deleted a record. The hook updates the internal state.

# **2. Service**

# What does this *clockService.ts (Service)* do?
- It handles all business logic for the Time Tracking page (Clock In, Clock Out, and Delete).
- Creates new user's clock-in records with timestamps and location (Office/Home/Site).
- It also updates existing records when clocking out and added the employee's attendnce history record.

# How and why did I decide to use this *clockService.ts (Service)* logic?
- I decided to use this service layer because it is the orrect place for such business logic, keeping them out of the UI and repository. It also ensures a clean separation of concerns as required in Sprint 3.
- Also, it keeps the Time Tracking page consistent with architecture used in Employess and Leave Management.

# Where and how the *clockService.ts (Service)* was used in the Time Tracking page?
- The *clockService.ts (Service)* is used indirectly through the *useClockInOut (Hook)*.
- It mainly returns updated data to the hook, which will update the UI state.

# **3. Repository**

# What does this *clockInOutRepository (Repository)* do?
- This stoires all clock-in and clock-out records for the Time Tracking page, and loads initial mock data from *clock-in-outData.ts*.
- Aside from it generates ID's for new records, it also provide CRUD operations such as getbyEmployee, add, update, and remove.

# How and why did I decide to use this *clockInOutRepository (Repository)* logic?
- I used this logic specifically for data access and storage, keeping it separate from UI and business logic.
- It ensures the Time Tracking page follows the Sprint 3 architeture requirement and keeps the service layer cleam by handling all data retrieval and persistence.

# Where and how the *clockInOutRepository (Repository)* was used in the Time Tracking page?
- This is used indirectly through the Time Tracking page service layer to etch, add, update, and delete records.
- It will work onnce the hook received the processed data from the service, the UI will instantly updates.
- Through this repository, it will ensure the Time Tracking page displays accurate and persistent attendance history.
