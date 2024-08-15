# TOC App

This project consists of a FastAPI backend and a React frontend.

## Project Structure
toc-app/
├── backend/    # FastAPI application
└── frontend/   # React application
## Setup

### Backend (FastAPI)

1. Navigate to the backend directory: cd toc-app/backend

2. Create a virtual environment: python -m venv venv

3. Activate the virtual environment:
- On Windows:
  ```
  venv\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```

4. Install dependencies: pip install -r requirements.txt

5. Run the FastAPI server: uvicorn main:app --reload

The API will be available at `http://localhost:8000`.

### Frontend (React)

1. Navigate to the frontend directory: cd toc-app/frontend

2. Install dependencies: npm install

3. Start the development server: npm start

The React app will be available at `http://localhost:5174`.

# React + Vite


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
