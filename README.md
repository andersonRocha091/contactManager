# Contact Manager 🌐📇

**A Modern Contact Management System**  
*Built with Vue 3, Vite, Chart.js, Material Design, and Bootstrap*

[![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.0-FF6384?logo=chart.js)](https://www.chartjs.org/)

## ✨ Features
- 📊 Interactive Dashboard with Contact Analytics
- 👥 CRUD Operations for Contact Management
- 🔍 Advanced Search & Filter System
- 📈 Visual Relationship Charts
- 📱 Fully Responsive Design

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- npm 10+

### Installation
```bash
# 1. Clone repository
git clone https://github.com/andersonRocha091/contactflow.git

# 2. Install dependencies
npm install

# 3. Configure environment
# inside .env set VITE_BASE_URL that should be something like https://<ngrok url generated>/api
touch .env 

# 4. Start development server
npm run dev


contactflow/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Global assets
│   │   ├── styles/          # SCSS/CSS files
│   │   └── images/          # App images
│   │
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Generic components (Buttons, Cards)
│   │   ├── contacts/        # Contact-specific components
│   │   └── charts/          # Data visualization components
│   │
│   ├── views/               # Page components
│   │   ├── Dashboard.vue
│   │   ├── Contacts.vue
│   │   └── Settings.vue
│   │
│   ├── stores/              # Pinia state management
│   │   ├── contacts.js
│   │   └── analytics.js
│   │
│   ├── router/              # Vue Router configuration
│   ├── utils/               # Helper functions
│   ├── App.vue              # Root component
│   └── main.js              # App entry
│
├── tests/                   # Unit & E2E tests
├── .env                     # Environment variables
├── vite.config.js           # Vite configuration
└── package.json