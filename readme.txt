hashrate-store/
├─ docker-compose.yml
├─ bitcoin/
│   ├─ Dockerfile
│   └─ bitcoin.conf
├─ datum/
│   ├─ Dockerfile
│   └─ datum_gateway_config.json
├─ redis/
│   └─ Dockerfile
├─ tracker/
│   ├─ Dockerfile
│   └─ tracker.py
├─ api/
│   ├─ Dockerfile
│   ├─ requirements.txt
│   └─ app.py
└─ frontend/
    ├─ Dockerfile
    ├─ nginx.conf 
    └─ build/   

Build & run ⇒ docker compose up -d --build

Create blocks (regtest) ⇒ see command at top.

Checkout flow – generate workerName = "storeAddr.order-<uuid>", return Stratum URL stratum+tcp://<host>:23334.

Miner command (CPU demo):

cpuminer -a sha256d -o stratum+tcp://YOUR_IP:23334 -u storeAddr.order-<uuid> -p x --diff 1

Front‑end polling ⇒ GET /order/<uuid> from FastAPI to show live shares & fulfillment.

Switch to OCEAN ⇒ edit datum_gateway_config.json → set pool_host & pooled_mining_only:true, then docker compose restart datum.



Run this once:

docker exec -it $(docker ps -qf name=bitcoin) \
  bitcoin-cli -regtest createwallet rainforrest
Then:

docker exec -it $(docker ps -qf name=bitcoin) \
  bitcoin-cli -regtest getnewaddress



TODO: 

1. Add ability to track miner data in stratum 
2. Track hashrate data from datum 
3. Connect API to GUI 
4. Verify if the node is working correctly. 