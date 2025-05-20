# Invoice Management Dashboard

A modern, responsive, and dark-themed invoice management system built with **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. This dashboard helps manage invoices, clients, notifications, and settings efficiently.

## 🔗 Live Demo
[Vercel Deployment](https://your-dashboard.vercel.app](https://invoice-management-dashboard-taupe.vercel.app/))

## 📂 Source Code
[GitHub Repository](https://github.com/Rohan04022003/invoice-management-dashboard)

## ✨ Features

### ✅ Dashboard

- Overview of key metrics, invoices, and client summaries.
- Clean visual layout using custom charts and cards.

### 📄 Invoices

- View all invoices with dynamic listing.
- Support for adding, updating, and deleting invoices.
- Invoice status filters and search.

### 👤 Clients

- List all clients with names and email addresses.
- Navigate to detailed client view via `/clients/:email`.
- Manage client information (add/edit/remove).

### 🔔 Notifications

- Real-time alerts on invoice and client activity.

### ⚙️ Settings

- Toggle between **light** and **dark** mode (powered by shadcn/ui theme system).
- Customize visual preferences.

### 🎨 Theme & Design

- **Dark Mode Support** using `ThemeProvider` from shadcn/ui.
- Custom Tailwind CSS color scheme with `oklch` values for vibrant contrast.
- Global radius and component styling through `index.css`.

### 🧠 State Management

- Context API used for managing invoice and theme data globally.

### 🔁 Routing

Handled using `react-router-dom`:

- `/` → Dashboard
- `/invoices` → Invoices
- `/clients` → Clients List
- `/clients/:email` → Client Details
- `/notifications` → Notifications Page
- `/settings` → Settings

---

## 🧱 Tech Stack

- **React** – UI library
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Component library for modern UIs
- **React Router** – Client-side routing
- **Vite** – Build tool
- **Context API** – State management

---

## 🗂️ Project Structure

src/
├── App.tsx # Main component with route configuration
├── main.tsx # Entry point
├── index.css # Global styles & Tailwind setup
├── vite-env.d.ts # Vite type support
├── context/
│ ├── invoice-provider.tsx
│ └── theme-provider.tsx
├── components/
│ └── layout.tsx
├── hooks/
│ └── useDocumentTitle.ts
├── pages/
├── Dashboard.tsx
├── Invoices.tsx
├── Clients.tsx
├── ClientDetails.tsx
├── Notifications.tsx
└── Settings.tsx

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm/yarn must be installed.

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/rohan04022003/invoice-management-dashboard.git

   cd invoice-management-dashboard
   npm install
   ```

# or

yarn install

npm run dev

# or

yarn dev

## The app will run at: http://localhost:5173

# 🔗 Deployment

```
git init
git remote add origin https://github.com/yourusername/invoice-management-dashboard.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

# 📝 License

## This project is licensed under the MIT License.
