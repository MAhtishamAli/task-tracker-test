# 🏆 Enterprise-Grade Task Tracker Application

A production-ready **Task Tracker** web application engineered with **Vue 2**, **Vuex**, and **Vuetify**, demonstrating strict adherence to enterprise best practices, clean architecture, and robust state management.

**Author**: Ahtisham Ali  
**Submission Date**: 5/Jan/2026  
**Live Demo**: [https://tracktaskdaily1.netlify.app/](https://tracktaskdaily1.netlify.app/)

---

## 🚀 Key Features

### 1️⃣ Advanced Task Management
*   **CRUD Operations**: Full Create, Read, Update, and Delete capabilities.
*   **Sequential IDs**: Smart ID generation ensures logical continuity (21, 22...) after API data.
*   **Optimistic UI**: Instant interface updates while processing background API requests.

### 2️⃣ Powerful Filtering & Search
*   **Dual-Field Search**: Real-time filtering by **Title** AND **Description**.
*   **Status Filter**: Filter tasks by status (All, Pending, In Progress, Completed).

### 3️⃣ Enterprise Architecture
*   **Offline-First Architecture**: Changes are written to local storage before network requests to prevent data loss.
*   **Hybrid Persistence**: Seamlessly merges API data with local changes.

---

## 📖 Technical Documentation

### 🛠 Vuex State Schema
The application uses a modular Vuex store with a centralized state:
- tasks: Array of objects containing task details.
- filters: Object managing search strings and status filters.
- loading: Boolean state for asynchronous indicators.
- error: Stores API or validation error messages.

### 🔌 API Integration Notes
The app uses a **Non-Standard Hybrid Pattern**:
- **Pessimistic Sync**: Every action attempts an API call via Axios.
- **Fail-Safe Fallback**: If the API is unreachable, the system automatically switches to LocalStorage, ensuring 100% uptime for the user.

---

## ⏳ Project Timeline (Time Tracking)
**Total Development Time**: 5 Hours

| Phase | Time Spent | Activities |
| :--- | :--- | :--- |
| **Setup** | 0.5 Hours | Environment config, structure creation. |
| **Vuex Integration** | 1 Hour | State schema, persistence logic. |
| **Component Dev** | 1 Hour | UI development with Vuetify components. |
| **Testing/Verify** | 0.5 Hour | Logic verification and search hardening. |
| **Netlify Deploy** | 2 Hours | Subdirectory config and routing fixes. |

---

*Generated for Enterprise Compliance Assessment.*
