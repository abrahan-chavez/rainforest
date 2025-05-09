FROM ubuntu:22.04
RUN apt-get update && apt-get install -y wget unzip
RUN wget -O /tmp/datum.zip \
      https://github.com/OCEAN-Site/DATUM-Gateway/releases/latest/download/datum-linux-amd64.zip && \
    unzip /tmp/datum.zip -d /usr/local/bin && \
    chmod +x /usr/local/bin/datum-gateway
COPY datum_gateway_config.json /app/
WORKDIR /app
ENTRYPOINT ["/usr/local/bin/datum-gateway","-config","/app/datum_gateway_config.json"]