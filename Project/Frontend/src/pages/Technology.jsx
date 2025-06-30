import React from 'react';
import { Brain, Database, Zap, Shield, Code, Server } from 'lucide-react';

const Technology = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Brain className="h-16 w-16 text-purple-600 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Technology Behind EyeNet
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Cutting-edge AI and deep learning technologies powering accurate eye condition detection
                        </p>
                    </div>
                </div>
            </section>

            {/* AI Model Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Advanced Deep Learning Architecture
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                EyeNet leverages state-of-the-art Convolutional Neural Networks (CNNs) with
                                DenseNet121 as the foundational architecture. This powerful combination provides
                                exceptional feature extraction and pattern recognition capabilities.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-purple-100 p-2 rounded-full">
                                        <Brain className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">DenseNet121 Base Model</h3>
                                        <p className="text-gray-600">Dense connections between layers for optimal feature reuse and gradient flow</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <Zap className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Attention Mechanisms</h3>
                                        <p className="text-gray-600">Enhanced focus on relevant image regions for improved accuracy</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <Database className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Data Augmentation</h3>
                                        <p className="text-gray-600">Robust training with varied lighting conditions and image transformations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Model Performance</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Overall Accuracy</span>
                                    <span className="text-2xl font-bold text-purple-600">98%</span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-3">
                                    <div className="bg-purple-600 h-3 rounded-full" style={{ width: '98%' }}></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-blue-600">13K+</div>
                                        <div className="text-sm text-gray-600">Images per Class</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-green-600">4</div>
                                        <div className="text-sm text-gray-600">Conditions Detected</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Complete Technology Stack
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A robust, scalable architecture designed for reliability and performance
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Frontend */}
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Code className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• React.js for interactive UI</li>
                                <li>• TypeScript for type safety</li>
                                <li>• Tailwind CSS for styling</li>
                                <li>• Responsive design principles</li>
                                <li>• Modern web standards</li>
                            </ul>
                        </div>

                        {/* Backend */}
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Server className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• FastAPI for high-performance APIs</li>
                                <li>• Python ecosystem integration</li>
                                <li>• Async request handling</li>
                                <li>• Automatic API documentation</li>
                                <li>• RESTful architecture</li>
                            </ul>
                        </div>

                        {/* AI/ML */}
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Brain className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI/ML</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• PyTorch deep learning framework</li>
                                <li>• OpenCV for image processing</li>
                                <li>• NumPy for numerical computing</li>
                                <li>• Scikit-learn for ML utilities</li>
                                <li>• CUDA GPU acceleration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data & Training */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Dataset</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Cataract Images</span>
                                    <span className="font-bold text-green-600">13,000+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Conjunctivitis Images</span>
                                    <span className="font-bold text-blue-600">13,000+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Stye Images</span>
                                    <span className="font-bold text-purple-600">13,000+</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Normal Eyes</span>
                                    <span className="font-bold text-gray-600">13,000+</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between text-lg font-semibold">
                                        <span className="text-gray-900">Total Dataset</span>
                                        <span className="text-indigo-600">52,000+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Comprehensive Training Data
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Our model is trained on a diverse, high-quality dataset of over 52,000 eye images,
                                ensuring robust performance across different conditions and demographics.
                            </p>
                            <div className="space-y-4">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Data Augmentation Techniques</h4>
                                    <p className="text-yellow-800">
                                        Advanced augmentation including rotation, brightness adjustment, contrast enhancement,
                                        and noise injection to improve model robustness.
                                    </p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">Quality Assurance</h4>
                                    <p className="text-blue-800">
                                        All training images are medically validated and annotated by healthcare professionals
                                        to ensure accuracy and reliability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security & Privacy */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Shield className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Security & Privacy
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Your privacy and data security are our top priorities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
                            <p className="text-gray-300 text-sm">All data transmission is encrypted using industry-standard protocols</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Database className="h-8 w-8 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No Data Storage</h3>
                            <p className="text-gray-300 text-sm">Images are processed in real-time and not stored on our servers</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Code className="h-8 w-8 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">HIPAA Compliant</h3>
                            <p className="text-gray-300 text-sm">Built following healthcare data protection standards</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-8 w-8 text-yellow-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Edge Processing</h3>
                            <p className="text-gray-300 text-sm">Local processing capabilities for enhanced privacy</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Technology;