# --- Build stage ---
FROM ubuntu:22.04 AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential cmake git ca-certificates \
    pkg-config libcurl4-openssl-dev libjansson-dev libsodium-dev libmicrohttpd-dev curl && \
    rm -rf /var/lib/apt/lists/*

# 👇 Copy your local modified DATUM source
COPY . /src
WORKDIR /src

RUN cmake -B build -DCMAKE_BUILD_TYPE=Release && \
    cmake --build build --target datum_gateway -j$(nproc)

# --- Runtime stage ---
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libcurl4 libsodium23 libjansson4 libmicrohttpd12 curl jq && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /src/build/datum_gateway /usr/local/bin/datum-gateway

# Setup user and app directory
RUN useradd -m datum
COPY datum_gateway_config.json /app/datum_gateway_config.json
COPY entrypoint.sh /app/entrypoint.sh
RUN mkdir -p /app && chown -R datum:datum /app && chown -R datum:datum /home/datum

WORKDIR /app
USER datum
ENTRYPOINT ["bash", "/app/entrypoint.sh"]
