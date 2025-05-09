FROM ubuntu:22.04

# Install wget & basic deps
RUN apt-get update && \
    apt-get install -y wget ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ------------------
# QUICK HACKATHON MODE
# ------------------
# Corporate firewalls (e.g. Zscaler MITM) break GPG key fetch & TLS verify.
# For the demo we **skip GPG verification**. For production, COPY the tarball & .asc
# into the build context or add your root CA cert.

ENV CORE_VER=26.1

RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "arm64" ] || [ "$ARCH" = "aarch64" ]; then \
      CORE_FILE=bitcoin-${CORE_VER}-aarch64-linux-gnu.tar.gz; \
    else \
      CORE_FILE=bitcoin-${CORE_VER}-x86_64-linux-gnu.tar.gz; \
    fi && \
    wget --no-check-certificate https://bitcoincore.org/bin/bitcoin-core-${CORE_VER}/$CORE_FILE && \
    tar -xzf $CORE_FILE && \
    mv bitcoin-${CORE_VER}/bin/* /usr/local/bin && \
    rm -rf $CORE_FILE bitcoin-${CORE_VER} && \
    useradd -m bitcoin

# Copy clean config
COPY bitcoin.conf /home/bitcoin/.bitcoin/bitcoin.conf
RUN chown -R bitcoin:bitcoin /home/bitcoin/.bitcoin

USER bitcoin

# Start in regtest with our config
ENTRYPOINT ["bitcoind","-regtest","-conf=/home/bitcoin/.bitcoin/bitcoin.conf"]