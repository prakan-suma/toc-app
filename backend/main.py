from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    # Port of React (Vite) // dev port
    # allow_origins=["http://localhost:5173"],
    # Port of React (Vite) // Product port
    allow_origins=["https://toc-app-fe.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint


@app.get("/")
def read_root():
    return {"message": "Hello TOC Project"}


# run command : uvicorn main:app --reload
