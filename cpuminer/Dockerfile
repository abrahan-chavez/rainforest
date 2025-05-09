FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    git build-essential automake autoconf libcurl4-openssl-dev && \
    git clone https://github.com/pooler/cpuminer.git /src && \
    cd /src && ./autogen.sh && ./configure CFLAGS="-O3" && make && \
    cp minerd /usr/local/bin && rm -rf /src

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
