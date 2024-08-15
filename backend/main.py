from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Port of React (Vite) // dev port
    # allow_origins=["http://toc-app-render"],  # Port of React (Vite) // Product port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
@app.get("/")
def read_root():
    return {"message": "Hello from TOC!"}


# run command : uvicorn main:app --reload
