FROM --platform=linux/arm64 ubuntu:22.04

# ---- build dependencies ----
RUN apt-get update && apt-get install -y \
    git build-essential automake autoconf libtool pkg-config \
    libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev \
    zlib1g-dev \
 && rm -rf /var/lib/apt/lists/*

# ---- clone & compile cpuminer-opt (all algos) ----
RUN git clone --depth=1 https://github.com/JayDDee/cpuminer-opt.git /src \
 && cd /src && ./build.sh \
 && cp cpuminer /usr/local/bin/ \
 && rm -rf /src

# ---- runtime ----
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
