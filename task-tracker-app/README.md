# 🏆 Enterprise-Grade Task Tracker Application

A production-ready **Task Tracker** web application engineered with **Vue 2**, **Vuex**, and **Vuetify**, demonstrating strict adherence to enterprise best practices, clean architecture, and robust state management.

**Author**: Ahtisham Ali  
**Submission Date**: 5/Jan/2026

---

## 🚀 Key Features

### 1️⃣ Advanced Task Management
*   **CRUD Operations**: Full Create, Read, Update, and Delete capabilities.
*   **Sequential IDs**: Smart ID generation ensures logical continuity (21, 22...) after API data.
*   **Optimistic UI**: Instant interface updates while processing background API requests.

### 2️⃣ Powerful Filtering & Search
*   **Dual-Field Search**: Real-time filtering by **Title** AND **Description**.
*   **Status Filter**: Filter tasks by status (All, Pending, In Progress, Completed).
*   **Combined Logic**: Search and Status filters work seamlessly together via Vuex getters.

### 3️⃣ Enterprise Architecture
*   **Modular Vuex Store**: Strict separation of data, logic, and UI.
*   **Offline-First Architecture**: "Optimistic Saving" ensures data is written to local storage *before* network requests, preventing data loss on refresh.
*   **Hybrid Persistence**: Seamlessly merges API data with local changes to bridge the gap of the mock API.
*   **Reliable Error Handling**: Graceful fallbacks and user-friendly Snackbar notifications.
*   **Strict Pagination**: Enforced 10 items per page for consistent data presentation.

---

## 🛠 Technology Stack

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Frontend** | **Vue.js 2** | Robust, reactive framework. |
| **State** | **Vuex** | Centralized, predictable state management. |
| **UI** | **Vuetify 2** | Material Design implementation. |
| **API** | **Axios** | Promise-based HTTP client with interceptors. |
| **Storage** | **LocalStorage** | Client-side persistence layer. |

---

## 📂 Project Structure

```text
src/
├── components/          # focused UI components
│   ├── AppHeader.vue    # Application navigation/branding
│   ├── FilterPanel.vue  # Search & Filter controls
│   ├── TaskForm.vue     # Modal for Create/Edit
│   └── TaskTable.vue    # Data display with pagination
├── services/            # API abstraction layer
│   └── api.js           # Axios configuration
├── store/               # Centralized State Management
│   ├── modules/
│   │   └── tasks.js     # Task logic (Actions, Mutations, Getters)
│   └── index.js         # Root store
├── App.vue              # Main Application Layout
└── main.js              # Entry point
```

---

## ⚡ Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Application**
    ```bash
    npm run serve
    ```
    > Access at `http://localhost:8080`

3.  **Lint Code**
    ```bash
    npm run lint
    ```

---



