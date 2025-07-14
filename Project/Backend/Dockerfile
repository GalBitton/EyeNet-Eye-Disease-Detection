# 🧊 Base: CUDA 11.8 runtime (compatible with TF 2.9) on Ubuntu 22.04
FROM nvidia/cuda:11.8.0-runtime-ubuntu22.04

WORKDIR /app

# Install Python, build tools, OpenCV runtime libraries
RUN apt-get update && \
    apt-get install -y \
        python3 \
        python3-pip \
        build-essential \
        cmake \
        libgl1 \
        libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Upgrade pip
RUN python3 -m pip install --upgrade pip && \
    pip install --default-timeout=120 --retries=10 -r requirements.txt

# ✅ Copy rest of the app after dependencies
COPY . .

# Run your Robyn-based main.py server
CMD ["python3", "main.py"]