from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    # Port of React (Vite) // dev port
    allow_origins=["http://localhost:5173"],
    # Port of React (Vite) // Product port
    # allow_origins=["https://toc-app-fe.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
cartoon_lists = [
    {
        "id": 1,
        "name": "Attack on titan",
        "image_url": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10701949_b_v8_ah.jpg",
        "rate": 9,
        "category": "action"
    },
    {
        "id": 2,
        "name": "Naruto",
        "image_url": "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
        "rate": 9.5,
        "category": "action"
    },
    {
        "id": 3,
        "name": "Chainsaw man",
        "image_url": "https://m.media-amazon.com/images/M/MV5BZjY5MDFhZTgtOGVhMi00NTUzLTk5NjktNmRlMjI3NjI4MmE0XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
        "rate": 7.6,
        "category": "action"
    },
    {
        "id": 4,
        "name": "Jujutsu kaisen",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
        "rate": 5,
        "category": "action"
    },
]


@app.get("/")
def read_root():
    return {"message": "Hello TOC Project"}


@app.get("/cartoons")
def cartoons_list():
    return cartoon_lists

# run command : uvicorn main:app --reload
