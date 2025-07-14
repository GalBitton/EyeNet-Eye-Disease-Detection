# EyeNet Frontend Application

## Overview

The EyeNet Frontend is a modern, responsive web application built with React that provides an intuitive user interface for eye disease detection. It features real-time camera capture, file upload capabilities, and interactive result visualization with explainable AI features.

## Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Hooks
- **Routing**: React Router DOM v7
- **AI Integration**: ONNX Runtime Web for client-side inference
- **UI Components**: Lucide React icons, custom components
- **Build Tool**: Vite 6.0
- **Package Manager**: npm

## Operating Environment

### Hardware Requirements

#### Minimum Requirements
- **CPU**: Intel i3 or AMD Ryzen 3 (2 cores)
- **RAM**: 4GB DDR4
- **Storage**: 2GB available space
- **Display**: 1024x768 resolution
- **Camera**: Webcam for real-time capture

#### Recommended Requirements
- **CPU**: Intel i5 or AMD Ryzen 5 (4 cores)
- **RAM**: 8GB DDR4
- **Storage**: 5GB SSD
- **Display**: 1920x1080 resolution
- **Camera**: 1080p webcam

### Software Infrastructure

#### System Requirements
- **Operating System**: Windows 10/11, macOS 12+, Ubuntu 20.04+
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

#### Browser Requirements
- **WebRTC Support**: For camera access
- **WebGL Support**: For AI model inference
- **ES6+ Support**: For modern JavaScript features
- **HTTPS**: Required for camera access in production

## Installation Instructions

### Option 1: Docker Deployment (Recommended)

1. **Build the Docker image**
   ```bash
   docker build -t eyenet-frontend .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up frontend
   ```

3. **Or run standalone**
   ```bash
   docker run -p 5173:5173 eyenet-frontend
   ```

### Option 2: Local Development Setup

1. **Install Node.js and npm**
   ```bash
   # Download from https://nodejs.org/
   # Or use package manager
   
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # macOS (with Homebrew)
   brew install node
   
   # Windows
   # Download installer from https://nodejs.org/
   ```

2. **Clone and navigate to project**
   ```bash
   cd Frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoints
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Development: http://localhost:5173
   - Production build: `npm run build`

## Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost
VITE_API_PORT=8000

# Application Configuration
VITE_APP_NAME=EyeNet
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_CAMERA=true
VITE_ENABLE_FILE_UPLOAD=true
VITE_ENABLE_PDF_EXPORT=true
```

### Build Configuration

The application uses Vite for building and development:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## Application Features

### Core Functionality

1. **Real-time Camera Capture**
   - Face detection using YOLO model
   - Automatic eye region detection
   - Blur detection for image quality
   - Video recording capabilities

2. **File Upload**
   - Drag and drop interface
   - Multiple file format support
   - Image validation and preprocessing

3. **Result Visualization**
   - Interactive confidence scores
   - Grad-CAM heatmaps
   - Side-by-side eye comparison
   - PDF report generation

4. **User Experience**
   - Responsive design
   - Dark/light mode toggle
   - Loading states and error handling
   - Accessibility features

### Pages and Components

#### Main Pages
- **Home**: Landing page with features and call-to-action
- **EyeScan**: Main scanning interface with camera and upload
- **Results**: Analysis results with detailed breakdown
- **About**: Project information and team details
- **Contact**: Contact form and support information

#### Key Components
- **Camera Interface**: Real-time video capture with overlays
- **File Upload**: Drag-and-drop file handling
- **Result Cards**: Individual eye analysis display
- **PDF Exporter**: Report generation functionality
- **Navigation**: Responsive navigation with mobile menu

## System Maintenance Guide

### Daily Operations

#### Development Server Health
```bash
# Check if development server is running
curl http://localhost:5173

# Monitor build process
npm run build

# Check for linting errors
npm run lint
```

#### Performance Monitoring
- Monitor page load times
- Check bundle size
- Verify API response times
- Monitor memory usage in browser

### Weekly Maintenance

#### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update major versions (with caution)
npm audit fix
```

#### Code Quality
```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check for security vulnerabilities
npm audit
```

### Monthly Maintenance

#### Performance Optimization
- Analyze bundle size
- Optimize images and assets
- Review and update dependencies
- Performance audit with Lighthouse

#### Security Review
- Update dependencies with security patches
- Review third-party package usage
- Security audit of build process
- Update environment variables

### Troubleshooting

#### Common Issues

1. **Camera Access Problems**
   ```bash
   # Check browser permissions
   # Verify HTTPS in production
   # Test with different browsers
   
   # Debug camera access
   navigator.mediaDevices.getUserMedia({ video: true })
     .then(stream => console.log('Camera access granted'))
     .catch(err => console.error('Camera access denied:', err))
   ```

2. **Build Failures**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Clear cache
   npm cache clean --force
   
   # Check Node.js version
   node --version
   npm --version
   ```

3. **API Connection Issues**
   ```bash
   # Verify backend is running
   curl http://localhost:8000
   
   # Check CORS configuration
   # Verify environment variables
   # Test API endpoints directly
   ```

4. **Performance Issues**
   ```bash
   # Analyze bundle size
   npm run build
   npx vite-bundle-analyzer dist
   
   # Check for memory leaks
   # Monitor network requests
   # Optimize images and assets
   ```

#### Performance Optimization

1. **Bundle Optimization**
   ```bash
   # Analyze bundle
   npm run build
   npx vite-bundle-analyzer dist
   
   # Implement code splitting
   # Use dynamic imports
   # Optimize third-party libraries
   ```

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Optimize image sizes
   - Use responsive images

3. **Caching Strategy**
   - Implement service workers
   - Use browser caching
   - Optimize API calls
   - Cache static assets

### Backup and Recovery

#### Critical Files to Backup
- `package.json` and `package-lock.json`
- Environment configuration files
- Custom components and utilities
- Build configuration files

#### Backup Script Example
```bash
#!/bin/bash
BACKUP_DIR="/backup/eyenet-frontend/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup source code
cp -r src/ $BACKUP_DIR/
cp package*.json $BACKUP_DIR/
cp vite.config.js $BACKUP_DIR/
cp tailwind.config.js $BACKUP_DIR/

# Backup configuration
cp .env* $BACKUP_DIR/

echo "Frontend backup completed: $BACKUP_DIR"
```

#### Recovery Procedure
1. Stop the development server
2. Restore backup files
3. Reinstall dependencies: `npm install`
4. Verify configuration
5. Start development server: `npm run dev`

### Monitoring and Logging

#### Development Monitoring
- Browser developer tools
- Network tab for API calls
- Console for JavaScript errors
- Performance tab for metrics

#### Production Monitoring
- Error tracking (Sentry, LogRocket)
- Performance monitoring (Lighthouse)
- User analytics (Google Analytics)
- Real User Monitoring (RUM)

## Development

### Project Structure
```
Frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── constants/         # Application constants
│   ├── routes/            # Routing configuration
│   ├── assets/            # Images and static files
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── Dockerfile             # Container configuration
```

### Development Workflow

1. **Feature Development**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   
   # Run tests and linting
   npm run lint
   npm test
   ```

2. **Building for Production**
   ```bash
   # Build production version
   npm run build
   
   # Preview production build
   npm run preview
   
   # Deploy to hosting service
   ```

3. **Code Quality**
   ```bash
   # Run ESLint
   npm run lint
   
   # Fix auto-fixable issues
   npm run lint -- --fix
   
   # Check for security issues
   npm audit
   ```

### Adding New Features

1. **New Components**
   - Create component in `src/components/`
   - Add TypeScript definitions if needed
   - Include unit tests
   - Update documentation

2. **New Pages**
   - Create page component in `src/pages/`
   - Add route in `src/routes/AppRouter.jsx`
   - Update navigation if needed
   - Add page metadata

3. **API Integration**
   - Create API service functions
   - Add error handling
   - Implement loading states
   - Update environment variables

## Testing

### Testing Strategy
- **Unit Tests**: Component testing with Jest and React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end testing with Playwright
- **Performance Tests**: Lighthouse CI for performance monitoring

### Running Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e
```

## Deployment

### Production Build
```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Deploy to hosting service
# (Netlify, Vercel, AWS S3, etc.)
```

### Environment-Specific Configuration
- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live application with optimized build

## Support

For technical support and maintenance questions:
- **Email**: frontend-support@eyenet.com
- **Documentation**: [Frontend Wiki]
- **Issues**: [GitHub Issues]

## License

This frontend application is part of the EyeNet project and is licensed under the MIT License.
