FROM python:3.11-slim
WORKDIR /app
COPY tracker.py .
RUN pip install --no-cache-dir requests redis
ENTRYPOINT ["python","tracker.py"]