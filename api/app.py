import os, redis
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

r = redis.Redis(host=os.getenv("REDIS_HOST", "redis"),
                port=int(os.getenv("REDIS_PORT", 6379)), decode_responses=True)

app = FastAPI(title="Rainforrest Order API")
app.add_middleware(CORSMiddleware, allow_origins=["*"],
                   allow_methods=["GET"], allow_headers=["*"])

@app.get("/order/{order_id}")
def order(order_id: str):
    shares = r.get(f"order:{order_id}:shares")
    if shares is None:
        raise HTTPException(404, "order not found")
    fulfilled = r.get(f"order:{order_id}:fulfilled") == "1"
    return {"orderId": order_id, "shares": int(shares), "fulfilled": fulfilled}