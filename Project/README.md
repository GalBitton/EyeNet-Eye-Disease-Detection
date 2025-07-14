# EyeNet - AI-Powered Eye Disease Detection System

## Overview

EyeNet is a comprehensive AI-powered eye disease detection system that combines computer vision, machine learning, and web technologies to provide real-time eye health analysis. The system can detect and classify four common eye conditions: Cataract, Conjunctivitis, Healthy, and Stye.

## System Architecture

The EyeNet system consists of three main components:

### 1. Backend Service (Python/Robyn)
- **Technology Stack**: Python 3.8+, Robyn web framework, TensorFlow 2.9, OpenCV
- **Purpose**: AI model inference, image processing, and API services
- **Key Features**:
  - Real-time eye disease classification using CNN
  - Face and eye detection using Haar cascades
  - Grad-CAM visualization for explainable AI
  - RESTful API endpoints for image analysis

### 2. Frontend Application (React/Vite)
- **Technology Stack**: React 18, Vite, Tailwind CSS, ONNX Runtime Web
- **Purpose**: User interface for image capture, analysis, and result visualization
- **Key Features**:
  - Real-time camera capture with face detection
  - File upload support
  - Interactive results display with confidence scores
  - PDF report generation
  - Responsive design with dark mode support

### 3. AI Model (TensorFlow/Keras)
- **Model**: Custom CNN trained on 52K eye images
- **Classes**: Cataract, Conjunctivitis, Healthy, Stye
- **Features**: Grad-CAM integration for explainable predictions

## Operating Environment

### Hardware Requirements

#### Minimum Requirements
- **CPU**: Intel i5 or AMD Ryzen 5 (4 cores)
- **RAM**: 8GB DDR4
- **Storage**: 10GB available space
- **GPU**: NVIDIA GPU with 4GB VRAM (for CUDA acceleration)
- **Camera**: Webcam for real-time capture

#### Recommended Requirements
- **CPU**: Intel i7 or AMD Ryzen 7 (8 cores)
- **RAM**: 16GB DDR4
- **Storage**: 20GB SSD
- **GPU**: NVIDIA RTX 3060 or better (8GB+ VRAM)
- **Camera**: 1080p webcam

### Software Infrastructure

#### System Requirements
- **Operating System**: Windows 10/11, Ubuntu 20.04+, macOS 12+
- **Docker**: Version 20.10+ (for containerized deployment)
- **NVIDIA Drivers**: Version 470+ (for GPU acceleration)
- **CUDA Toolkit**: Version 11.8 (for TensorFlow GPU support)

#### Network Requirements
- **Bandwidth**: 10 Mbps minimum for real-time video
- **Latency**: <100ms for optimal user experience
- **Ports**: 8000 (Backend), 5173 (Frontend)

## Installation Instructions

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EyeNet-Eye-Disease-Detection/Project
   ```

2. **Install Docker and Docker Compose**
   - Follow official Docker installation guide for your OS
   - Ensure Docker Compose is included

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

### Option 2: Local Development Setup

#### Backend Setup
1. **Install Python dependencies**
   ```bash
   cd Backend
   pip install -r requirements.txt
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run the backend**
   ```bash
   python main.py
   ```

#### Frontend Setup
1. **Install Node.js dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoints
   ```

3. **Run the frontend**
   ```bash
   npm run dev
   ```

## System Maintenance Guide

### Regular Maintenance Tasks

#### Daily Operations
- Monitor system logs for errors
- Check API response times
- Verify model inference accuracy
- Monitor disk space usage

#### Weekly Tasks
- Update system dependencies
- Backup user data and model files
- Review performance metrics
- Clean temporary files

#### Monthly Tasks
- Full system health check
- Update AI model if new training data available
- Security updates and patches
- Performance optimization review

### Troubleshooting Common Issues

#### Backend Issues
1. **Model Loading Failures**
   - Verify model file exists in `assets/models/`
   - Check GPU memory availability
   - Restart the backend service

2. **API Timeout Errors**
   - Increase timeout settings in configuration
   - Check system resources (CPU, RAM, GPU)
   - Optimize image processing pipeline

3. **Memory Leaks**
   - Monitor memory usage with `htop` or `nvidia-smi`
   - Restart services if memory usage exceeds 80%
   - Review image processing code for memory leaks

#### Frontend Issues
1. **Camera Access Problems**
   - Check browser permissions
   - Verify HTTPS for production deployments
   - Test with different browsers

2. **API Connection Errors**
   - Verify backend service is running
   - Check CORS configuration
   - Validate API endpoint URLs

3. **Performance Issues**
   - Clear browser cache
   - Check network connectivity
   - Optimize image processing on client side

### Performance Optimization

#### Backend Optimization
- Enable GPU acceleration for TensorFlow
- Implement request caching
- Optimize image preprocessing pipeline
- Use connection pooling for database operations

#### Frontend Optimization
- Implement lazy loading for components
- Optimize bundle size with code splitting
- Use WebP image format for better compression
- Implement service workers for caching

### Security Considerations

#### Data Protection
- Implement HTTPS for all communications
- Encrypt sensitive data at rest
- Regular security audits
- Implement rate limiting for API endpoints

#### Access Control
- Implement user authentication if required
- Log all system access attempts
- Regular backup of critical data
- Monitor for suspicious activities

### Backup and Recovery

#### Data Backup Strategy
- Daily automated backups of model files
- Weekly backups of configuration files
- Monthly full system backups
- Test backup restoration procedures

#### Disaster Recovery
- Document recovery procedures
- Maintain backup copies in multiple locations
- Regular disaster recovery drills
- Keep system documentation updated

## API Documentation

### Endpoints

#### POST /predict
Analyzes multiple eye images from face detection
- **Input**: Array of base64 encoded images with metadata
- **Output**: Classification results for left and right eyes

#### POST /upload
Analyzes a single uploaded eye image
- **Input**: Base64 encoded image
- **Output**: Classification result with confidence scores

### Response Format
```json
{
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
```

## Model Information

### Training Data
- **Dataset Size**: 52,000+ eye images
- **Classes**: 4 (Cataract, Conjunctivitis, Healthy, Stye)
- **Data Augmentation**: Rotation, scaling, brightness adjustment
- **Validation Split**: 20%

### Model Performance
- **Accuracy**: 92% on validation set
- **Inference Time**: <500ms per image (GPU)
- **Model Size**: ~50MB
- **Framework**: TensorFlow 2.9

### Model Updates
- Retrain with new data every 6 months
- Validate performance on test set
- A/B testing for new model versions
- Gradual rollout to production

## Support and Contact

For technical support, maintenance questions, or feature requests:
- **Email**: support@eyenet.com
- **Documentation**: [Project Wiki]
- **Issues**: [GitHub Issues]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- TensorFlow and Keras for deep learning framework
- OpenCV for computer vision capabilities
- React and Vite for frontend development
- NVIDIA for GPU acceleration support 