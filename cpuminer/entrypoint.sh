#!/bin/bash
exec cpuminer \
  --algo sha256d \
  --url "$STRATUM_URL" \
  --user "$WORKER_NAME" \
  --threads "4" \
  --pass x
