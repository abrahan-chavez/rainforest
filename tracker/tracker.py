import os, time, json, requests, redis, re

DATUM_API = os.getenv("DATUM_API", "http://datum:8080/api/clients")
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
TARGET_DIFF = int(os.getenv("HASHRATE_TARGET_DIFF", "1000"))

r = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)
ORDER_PATTERN = re.compile(r'order-([a-z0-9\-]+)$', re.I)

def poll():
    try:
        clients = requests.get(DATUM_API, timeout=5).json()
    except Exception as e:
        print("DATUM fetch error", e)
        return
    for c in clients:
        user = c.get("username", "")
        diff = int(c.get("acceptedDiff", 0))
        m = ORDER_PATTERN.search(user)
        if not m:
            continue
        oid = m.group(1)
        r.set(f"order:{oid}:shares", diff)
        if diff >= TARGET_DIFF:
            r.set(f"order:{oid}:fulfilled", 1)
            print(f"Order {oid} fulfilled (diff {diff})")

while True:
    poll()
    time.sleep(5)