```bash
### Clone the repository
git clone https://github.com/Demandtech/hng13-stage-2-frontend-vue

### Navigate to the project directory
cd hng13-stage-2-frontend-vue

### Install dependencies
npm install

### Run the development server
npm run dev

# Build for production
npm run build
```
### ENV
VITE_API_URL=http://localhost:4000/api

### Folder Structure
```bash
src/
│
├── assets/              # Static assets
├── components/          # Reusable UI components
├── stores/              # Pinia stores
├── pages/               # Route views
├── router/              # Vue Router setup
├── App.vue              # Root component
└── main.ts              # Entry point
```