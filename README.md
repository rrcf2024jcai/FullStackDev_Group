# TimePilot Attendance and Leave Tracker Application

## Group 3 Members

- Alyssa Urquiola
- Chenyang Ma
- Jiyu Cai

## Project General Description

Our chosen app is inspired by Darwinbox, an attendance tracker used by several companies nationwide.
The app focuses in emphasizing usability, scalability, and data-driven insights.

## Scope of our chosen app:

- Employee login

- Clock In / Clock Out

- View Attendance history

- Manager approval

## High-Level User Stories

- As an employee, I want to record my clock in - clock out… so that my daily work hours are recorded and captured accurately.

- As a manager, I want to track my team’s attendance records through a simple web interface… so that I can monitor their attendance and filed leaves.

- As an HR Associate, I want to generate attendance reports efficiently... so that I can process employees’ payroll accurately.

## Sprint 1 - Team Member Tasks

**Chenyang Ma**:
- **Employee Directory Feature Page** - responsible for the Employee list.
- Managed the App Stylesheet and Style Guide.
- Worked on the App.css.
- Contributed in the App integration.
- Completed all individual requirements.
- Tracked the project board and ensure all tasks are moving from backlog to completed stage.

**Alyssa Urquiola**:
- **Time Tracking Feature Page** - responsible for the clock-in and clock-out records.
- Modified the README and markdown file.
- Worked on the Project initialization.
- Contributed in the App integration.
- Completed all individual requirements.
- Tracked the project board and ensure all tasks are moving from backlog to completed stage.

**Jiyu Cai**:
- **Leave Requests Feature Page** - responsible for the leave requests page.
- Set up the Git Repository and Team Vercel account/management.
- Build the Home Page and link to all feature pages.
- Contributed in the App integration.
- Completed all individual reqirements.
- Tracked the project board and ensure all tasks are moving from backlog to completed stage.

## Sprint 2 - Team Member Tasks

**Chenyang Ma**:
- Build the T.1 Multi-page navigation where users can navigate to different sections of the app.
- Managed the routers, shared state across pages, and made changes in the app.tsx.
- **Employee Directory Feature Page** - completed all individual requirements.
  - Page contains Form Component (1.2 - Seacrh Form).
  - Page contains Element Add/Remove (I.3 - Add/Delete Employee).
  - Page has a distinct purpose from other feature pages
- Tracked the project board and ensure all tasks are moving from backlog to completed stage.

**Alyssa Urquiola**:
- Modified the T.2 Naviagtion Interfaces.
- Update the README for Sprint 2 documentation.
- **Time Tracking Feature Page** - completed all individual requirements.
  - Page contains Form Component (1.2 - Text field) where the app will asks for user's location.
  - Page contains Element Add/Remove (I.3 - Remove button in the Attendance Log).
  - Page has a distinct purpose from other feature pages.
- Tracked the project board and ensure all tasks are moving from backlog to completed stage.

**Jiyu Cai**
- Enhancements for T.3 Shared state across pages.
- **Leave Requests Feature Page** - completed all individual requirements.
  - Page contains Form Component (1.2 - Request Validation Form).
  - Page contains Element Add/Remove (I.3 - Delete Request).
  - Page has a distinct purpose from other feature pages
- Work on the Sprint 1 T.4 App.tsx:
  - Add the application name in the header.
  - Put member names in the footer.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```