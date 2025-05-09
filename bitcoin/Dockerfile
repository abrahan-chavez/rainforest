FROM ubuntu:22.04

# Install dependencies and import Bitcoin Knots release key
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -qO - https://bitcoinknots.org/keys/bitcoin-knots-release-signing.asc | gpg --import

# Download and verify Bitcoin Knots (26.1 build compiled 2024‑03‑10)
RUN wget https://bitcoinknots.org/files/26.x/bitcoin-26.1.knots20240310-x86_64-linux-gnu.tar.gz && \
    wget https://bitcoinknots.org/files/26.x/bitcoin-26.1.knots20240310-x86_64-linux-gnu.tar.gz.asc && \
    gpg --verify bitcoin-26.1.knots20240310-x86_64-linux-gnu.tar.gz.asc && \
    tar -xzf bitcoin-26.1.knots20240310-x86_64-linux-gnu.tar.gz && \
    mv bitcoin-26.1.knots20240310/bin/* /usr/local/bin/ && \
    useradd -m bitcoin

COPY bitcoin.conf /home/bitcoin/.bitcoin/bitcoin.conf
RUN chown -R bitcoin:bitcoin /home/bitcoin/.bitcoin

USER bitcoin
ENTRYPOINT ["bitcoind","-conf=/home/bitcoin/.bitcoin/bitcoin.conf"]
```Dockerfile
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -qO - https://bitcoin.org/keys/laanwj-releases.asc | gpg --import && \
    wget https://bitcoincore.org/bin/bitcoin-core-26.1/bitcoin-26.1-x86_64-linux-gnu.tar.gz && \
    tar -xzf bitcoin-26.1-x86_64-linux-gnu.tar.gz && \
    mv bitcoin-26.1/bin/* /usr/local/bin/ && \
    useradd -m bitcoin
COPY bitcoin.conf /home/bitcoin/.bitcoin/bitcoin.conf
RUN chown -R bitcoin:bitcoin /home/bitcoin/.bitcoin
USER bitcoin
ENTRYPOINT ["bitcoind","-conf=/home/bitcoin/.bitcoin/bitcoin.conf"]