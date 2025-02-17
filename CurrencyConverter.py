# Currency Converter

from fastapi import FastAPI ,status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

origins = ['http://localhost:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url='https://api.currencyapi.com/v3/latest'
params = {
    "apikey":"Enter your API key",
    "currencies":"EUR,USD,CAD,AED,INR"
}

class Convert(BaseModel):
    convert_from:str
    convert_to:str
    amount:float

@app.post("/convert",status_code=status.HTTP_200_OK)
async def convert(user:Convert):
    try:
        response = requests.get(url,params=params)
        data = response.json()
        a = data["data"][user.convert_from]["value"]
        b = data["data"][user.convert_to]["value"]
        c = user.amount/a
        d = c*b
        return {"amount":d}
    except requests.RequestException as e:
        raise HTTPException(status_code=500,detail="Error in getting data")

# An example of the data recieved by the api

# data = {
#   "meta": {
#     "last_updated_at": "2025-02-13"   
#   },
#   "data": {
#     "AED": {
#       "code": "AED",
#       "value": 3.6727004384
#     },
#     "CAD": {
#       "code": "CAD",
#       "value": 1.4194601504
#     },
#     "EUR": {
#       "code": "EUR",
#       "value": 0.9560801757
#     },
#     "INR": {
#       "code": "INR",
#       "value": 86.7329126117
#     },
#     "USD": {
#       "code": "USD",
#       "value": 1
#     }
#   }
# }