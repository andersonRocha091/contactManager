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
```

### Folder Structure
```bash

contactManager/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Global assets
│   │  
│   │
│   ├── components/          # Reusable UI components
│   │   ├── contacts/       # Contact-specific components
|   |   |        ├── AddContactModal.vue
|   |   |        ├── ContactDetailModal.vue
|   |   |        ├── ContactItem.vue
|   |   |        ├── ContactList.vue
|   |   |        ├── ContactSearchBar.vue
|   |   |        ├── ContactView.vue
|   |   |        ├── removeContactModal.vue
|   |   | 
│   │   ├──LoadSpinner.vue
│   │   └── Sidebar.vue
|   | 
│   ├── router/              # Vue Router configuration
│   │
│   ├── stores/              # Pinia state management
│   │   ├── contacts.js
│   │   └── auth.js
│   ├── views/               # Page components
│   │   ├── Analytics.vue
│   │   ├── Login.vue
│   │
│   ├── App.vue              # Root component
│   └── main.js              # App entry
│
├── .env                     # Environment variables
├── vite.config.js           # Vite configuration
└── package.json
```

🤝 Contributing
🐛 Report Issues
Use GitHub Issues with proper labels

💡 Suggest Features
Create a Feature Request issue

🛠️ Code Contributions
# Create feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "Add amazing feature"

# Push to branch
git push origin feature/amazing-feature


🚧 Future Development Roadmap
Core Feature Enhancements
Feature	Description
🔒 Auto reload token when it expires
🤝 Finishin twilio integration to enable calls to contacts with phone number set
📥 Advanced Import Tools	Drag-and-drop CSV/Excel imports with data validation
🔍 Improve report routine to full delegate to api its generation

