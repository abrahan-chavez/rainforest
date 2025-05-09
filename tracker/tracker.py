import os, time, json, requests, redis, re
from requests.auth import HTTPBasicAuth

# --- ENV VARS ---
DATUM_API = os.getenv("DATUM_API", "http://datum:8080/api/clients")
DATUM_USER = os.getenv("DATUM_USER", "admin")
DATUM_PASS = os.getenv("DATUM_PASS", "demo")
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
TARGET_DIFF = int(os.getenv("HASHRATE_TARGET_DIFF", "1000"))

# --- Redis & Pattern ---
r = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)
ORDER_PATTERN = re.compile(r'order-([a-z0-9\-]+)$', re.I)

# --- Poll Logic ---
def poll():
    try:
        response = requests.get(DATUM_API, auth=HTTPBasicAuth(DATUM_USER, DATUM_PASS), timeout=5)
        response.raise_for_status()
        clients = response.json()
    except Exception as e:
        print("DATUM fetch error:", e)
        return

    for client in clients:
        user = client.get("username", "")
        diff = int(client.get("acceptedDiff", 0))
        m = ORDER_PATTERN.search(user)
        if not m:
            continue

        oid = m.group(1)
        key_prefix = f"order:{oid}"

        # Store current diff
        r.set(f"{key_prefix}:shares", diff)

        # Optionally store full client object for visibility
        r.set(f"{key_prefix}:client", json.dumps(client))

        # Fulfillment check
        if diff >= TARGET_DIFF:
            r.set(f"{key_prefix}:fulfilled", 1)
            print(f"✅ Order {oid} fulfilled (diff {diff})")
        else:
            r.set(f"{key_prefix}:fulfilled", 0)

# --- Loop ---
while True:
    poll()
    time.sleep(5)
