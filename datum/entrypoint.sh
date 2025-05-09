#!/bin/bash
set -e

echo "[entrypoint] Waiting 5s for bitcoind..."
sleep 5

# Generate a new payout address
echo "[entrypoint] Fetching new payout address..."
ADDRESS=$(curl -s --user rainforrest:devpassword \
  --data-binary '{"jsonrpc":"1.0","id":"get","method":"getnewaddress","params":["", "legacy"]}' \
  -H 'content-type: text/plain;' \
  http://bitcoin:18443/wallet/rainforrest | jq -r .result)

echo "[entrypoint] Using payout address: $ADDRESS"

RESPONSE=$(curl -s --user rainforrest:devpassword \
  --data-binary '{"jsonrpc":"1.0","id":"get","method":"getnewaddress","params":["", "legacy"]}' \
  -H 'content-type: text/plain;' \
  http://bitcoin:18443/wallet/rainforrest)

echo "[entrypoint] RPC response: $RESPONSE"

ADDRESS=$(echo "$RESPONSE" | jq -r .result)


# Patch the config
jq --arg addr "$ADDRESS" '.mining.pool_address = $addr' /app/datum_gateway_config.json > /app/datum_gateway_config.final.json

# Launch DATUM
echo "[entrypoint] Final DATUM config:"
cat /app/datum_gateway_config.final.json
echo "[entrypoint] Launching DATUM..."
mv /app/datum_gateway_config.final.json /app/datum_gateway_config.json
exec /usr/local/bin/datum-gateway

