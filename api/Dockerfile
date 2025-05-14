# Stage 1: Build the app
FROM --platform=linux/amd64 mcr.microsoft.com/dotnet/sdk:8.0-jammy AS builder
ENV BUILD_DIR=/tmp/build/
ENV OUT_DIR=/tmp/output/
ENV CSPROJ_TARGET=RainforestApi/RainforestApi.csproj
RUN mkdir -p $BUILD_DIR $OUT_DIR
COPY . $BUILD_DIR
WORKDIR $BUILD_DIR
RUN chmod -R 777 $BUILD_DIR \
    && dotnet publish $CSPROJ_TARGET \
       --configuration Release \
       --runtime linux-x64 \
       --self-contained true \
       --output $OUT_DIR

# Stage 2: Create runtime container
FROM --platform=linux/amd64 ubuntu:22.04 AS final
RUN apt-get update && apt-get install -y ca-certificates --no-install-recommends && rm -rf /var/lib/apt/lists/*
ENV WORK_DIR=/work/
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1
RUN mkdir -p $WORK_DIR && chmod 777 $WORK_DIR
WORKDIR $WORK_DIR
COPY --from=builder /tmp/output/ .

ENTRYPOINT ["./RainforestApi"]
