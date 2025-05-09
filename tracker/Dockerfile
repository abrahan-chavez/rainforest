FROM python:3.11-slim
WORKDIR /app
COPY tracker.py .
# Install dependencies + curl
RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && pip install --no-cache-dir requests redis \
  && apt-get clean && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["python", "-u", "tracker.py"]
