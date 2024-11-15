import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from app import makePrediction

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StringInput(BaseModel):
    message: str


@app.get("/")
async def ping():
    return "ping"   


@app.post("/predict")
async def predict(data: StringInput):
    message = data.message
    prediction = makePrediction(message)
    return {"prediction" : prediction}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)