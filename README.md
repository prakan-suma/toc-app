# TOC App

This project consists of a FastAPI backend and a React frontend.

## Preview Web
https://toc-app-fe.onrender.com

## Setup

### Backend (FastAPI)

1. Navigate to the backend directory: 
```
cd toc-app/backend
```

3. Create a virtual environment: 
```
python -m venv venv
```

5. Activate the virtual environment:
- On Windows:
  ```
  venv\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```

4. Install dependencies: 
```
pip install -r requirements.txt
```

5. Run the FastAPI server: 
```
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend (React)

1. Navigate to the frontend directory: 
```
cd toc-app/frontend
```

3. Install dependencies: 
```
npm install
```

5. Start the development server:
```
npm run dev
```

The React app will be available at `http://localhost:5174`.
