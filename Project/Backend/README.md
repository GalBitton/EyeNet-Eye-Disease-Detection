# EyeNet Backend Service

## Overview

The EyeNet Backend is a high-performance Python service that provides AI-powered eye disease detection capabilities. Built with Robyn web framework and TensorFlow, it offers real-time image analysis, face detection, and disease classification with explainable AI features.

## Technology Stack

- **Web Framework**: Robyn (Fast Python web framework)
- **AI Framework**: TensorFlow 2.9 with Keras
- **Computer Vision**: OpenCV 4.10
- **Image Processing**: PIL (Pillow)
- **Face Detection**: Haar Cascades, dlib
- **Explainable AI**: Grad-CAM visualization
- **Container**: Docker with NVIDIA CUDA support

## Operating Environment

### Hardware Requirements

#### Minimum Requirements
- **CPU**: Intel i5 or AMD Ryzen 5 (4 cores)
- **RAM**: 8GB DDR4
- **Storage**: 5GB available space
- **GPU**: NVIDIA GPU with 4GB VRAM (optional but recommended)

#### Recommended Requirements
- **CPU**: Intel i7 or AMD Ryzen 7 (8 cores)
- **RAM**: 16GB DDR4
- **Storage**: 10GB SSD
- **GPU**: NVIDIA RTX 3060 or better (8GB+ VRAM)

### Software Infrastructure

#### System Requirements
- **Operating System**: Ubuntu 20.04+, Windows 10/11, macOS 12+
- **Python**: 3.8 or higher
- **CUDA**: 11.8 (for GPU acceleration)
- **NVIDIA Drivers**: Version 470+

#### Dependencies
- **Core**: Python 3.8+, pip
- **Build Tools**: cmake, build-essential
- **System Libraries**: libgl1, libglib2.0-0

## Installation Instructions

### Option 1: Docker Deployment (Recommended)

1. **Build the Docker image**
   ```bash
   docker build -t eyenet-backend .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up backend
   ```

3. **Or run standalone**
   ```bash
   docker run -p 8000:8000 --gpus all eyenet-backend
   ```

### Option 2: Local Installation

1. **Install system dependencies**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install -y python3 python3-pip build-essential cmake libgl1 libglib2.0-0
   
   # For GPU support
   sudo apt-get install -y nvidia-cuda-toolkit
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the service**
   ```bash
   python main.py
   ```

## Configuration

### Environment Variables

Create a `.env` file in the Backend directory:

```env
# Model Configuration
MODEL_NAME=EyeNet
MODEL_PATH=src/assets/models/eyenet_model_52k_ds.h5
GRAD_CAM_LAYER=multiply_1

# Server Configuration
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Image Processing
CROP_PADDING_X=20
CROP_PADDING_Y=40

# Directories
TEMP_IMAGES_DIR=temp_images
SAVED_EYES_DIR=saved_eyes

# Disease Classes
CLASSES=Cataract,Conjunctivitis,Healthy,Stye
```

### Model Files

Ensure the following files are present:
- `src/assets/models/eyenet_model_52k_ds.h5` - Main AI model
- `src/assets/cascades/haarcascade_eye.xml` - Eye detection cascade
- `src/assets/cascades/haarcascade_frontalface_default.xml` - Face detection cascade
- `src/assets/shape_predictor_68_face_landmarks.dat` - Facial landmarks predictor

## API Endpoints

### POST /predict
Analyzes multiple eye images from face detection.

**Request Body:**
```json
[
  {
    "image": "data:image/png;base64,...",
    "score": 0.95,
    "blur": 0.02,
    "box": {"x": 100, "y": 150, "w": 200, "h": 200}
  }
]
```

**Response:**
```json
{
  "status_code": 200,
  "body": {
    "left_eye": {
      "average_scores": {
        "Cataract": 15.2,
        "Conjunctivitis": 8.7,
        "Healthy": 65.1,
        "Stye": 11.0
      },
      "best_prediction": "Healthy",
      "image_preview": "data:image/png;base64,...",
      "grad_cam_preview": "data:image/png;base64,..."
    },
    "right_eye": {
      // Similar structure
    }
  }
}
```

### POST /upload
Analyzes a single uploaded eye image.

**Request Body:**
```json
{
  "image": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "left_eye": {
    "average_scores": {
      "Cataract": 5.2,
      "Conjunctivitis": 2.7,
      "Healthy": 85.1,
      "Stye": 7.0
    },
    "best_prediction": "Healthy",
    "image_preview": "data:image/png;base64,...",
    "grad_cam_preview": "data:image/png;base64,..."
  },
  "right_eye": {
    "best_prediction": "Not Detected"
  }
}
```

## System Maintenance Guide

### Daily Operations

#### Health Checks
```bash
# Check service status
curl http://localhost:8000/health

# Monitor logs
docker logs eyenet-backend

# Check GPU usage (if applicable)
nvidia-smi
```

#### Performance Monitoring
- Monitor API response times
- Check memory usage
- Verify model inference accuracy
- Monitor disk space for temporary files

### Weekly Maintenance

#### Dependency Updates
```bash
# Update Python packages
pip list --outdated
pip install -r requirements.txt --upgrade

# Update Docker image
docker build -t eyenet-backend .
```

#### System Cleanup
```bash
# Clean temporary files
rm -rf temp_images/*
rm -rf saved_eyes/*

# Clean Docker resources
docker system prune -f
```

### Monthly Maintenance

#### Model Performance Review
- Analyze prediction accuracy trends
- Review error logs for common issues
- Update model if new training data available
- Performance optimization review

#### Security Updates
- Update system packages
- Review access logs
- Security audit of dependencies
- Backup critical files

### Troubleshooting

#### Common Issues

1. **Model Loading Failures**
   ```bash
   # Check model file exists
   ls -la src/assets/models/
   
   # Verify GPU memory
   nvidia-smi
   
   # Check TensorFlow installation
   python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
   ```

2. **Memory Issues**
   ```bash
   # Monitor memory usage
   htop
   
   # Check for memory leaks
   python -m memory_profiler main.py
   
   # Restart service if needed
   docker restart eyenet-backend
   ```

3. **API Timeout Errors**
   ```bash
   # Check system resources
   top
   
   # Monitor network connectivity
   netstat -tulpn | grep 8000
   
   # Increase timeout in configuration
   ```

4. **Face Detection Issues**
   ```bash
   # Verify cascade files
   ls -la src/assets/cascades/
   
   # Test OpenCV installation
   python -c "import cv2; print(cv2.__version__)"
   ```

#### Performance Optimization

1. **GPU Acceleration**
   ```bash
   # Verify CUDA installation
   nvcc --version
   
   # Check TensorFlow GPU support
   python -c "import tensorflow as tf; print(tf.test.is_built_with_cuda())"
   ```

2. **Memory Optimization**
   - Implement image caching
   - Optimize batch processing
   - Use memory-efficient data types

3. **API Optimization**
   - Implement request caching
   - Optimize image preprocessing
   - Use async processing for multiple requests

### Backup and Recovery

#### Critical Files to Backup
- `src/assets/models/eyenet_model_52k_ds.h5`
- `src/assets/cascades/`
- `src/assets/shape_predictor_68_face_landmarks.dat`
- Configuration files (`.env`, `settings.py`)

#### Backup Script Example
```bash
#!/bin/bash
BACKUP_DIR="/backup/eyenet/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup model files
cp -r src/assets/models/ $BACKUP_DIR/
cp -r src/assets/cascades/ $BACKUP_DIR/
cp src/assets/shape_predictor_68_face_landmarks.dat $BACKUP_DIR/

# Backup configuration
cp .env $BACKUP_DIR/
cp src/config/settings.py $BACKUP_DIR/

echo "Backup completed: $BACKUP_DIR"
```

#### Recovery Procedure
1. Stop the service
2. Restore backup files
3. Verify file permissions
4. Restart the service
5. Test API endpoints

### Monitoring and Logging

#### Log Configuration
The service uses Python's logging module with configurable levels:
- DEBUG: Detailed debugging information
- INFO: General information about program execution
- WARNING: Warning messages for potentially problematic situations
- ERROR: Error messages for serious problems

#### Monitoring Tools
- **System Monitoring**: htop, nvidia-smi
- **API Monitoring**: curl, Postman
- **Log Analysis**: grep, tail, journalctl
- **Performance**: cProfile, memory_profiler

## Development

### Project Structure
```
Backend/
├── main.py                 # Application entry point
├── requirements.txt        # Python dependencies
├── Dockerfile             # Container configuration
├── src/
│   ├── api/               # API routes and endpoints
│   ├── assets/            # Model files and cascades
│   ├── config/            # Configuration settings
│   ├── core/              # Core application logic
│   ├── services/          # Business logic services
│   └── utils/             # Utility functions
├── temp_images/           # Temporary image storage
└── saved_eyes/            # Processed eye images
```

### Adding New Features

1. **New API Endpoints**
   - Add routes in `src/api/routes/`
   - Implement business logic in `src/services/`
   - Update documentation

2. **Model Improvements**
   - Retrain model with new data
   - Update model file in `src/assets/models/`
   - Test inference performance

3. **Configuration Changes**
   - Update `src/config/settings.py`
   - Modify environment variables
   - Update documentation

## Support

For technical support and maintenance questions:
- **Email**: backend-support@eyenet.com
- **Documentation**: [Backend Wiki]
- **Issues**: [GitHub Issues]

## License

This backend service is part of the EyeNet project and is licensed under the MIT License.
