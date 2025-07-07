export const HOMECONTENT = {
  HEADER: "Early Eye Health Detection",
  SUBHEADER: "AI-Driven",
  HERO_TEXT: "EyeNet uses cutting-edge AI to detect cataracts, conjunctivitis, styes and healthy eyes with 98% accuracy. Get instant, reliable eye health insights from the comfort of your home.",
  START_SCAN: "Start Eye Scan",
  LEARN_MORE: "Learn More",
  VIDEO_TUTORIAL_HEADER: "How to Use EyeNet",
  VIDEO_TUTORIAL_DESC: "Watch this simple tutorial to learn how to use our AI-powered eye detection system.",
  FEATURES_HEADER: "Why Choose EyeNet?",
  FEATURES_DESC: "Our advanced AI technology makes eye health screening accessible, accurate, and convenient for everyone.",
  FEATURES: {
    INSTANT_RESULTS: {
      TITLE: "Instant Results",
      DESCRIPTION: "Get accurate eye condition detection results in seconds using our advanced DenseNet121 model with attention mechanisms.",
    },
    HIGH_ACCURACY: {
      TITLE: "91% Accuracy",
      DESCRIPTION: "Trained on over 13,000 images per condition, our AI model delivers reliable detection for cataracts, conjunctivitis, and styes.",
    },
    USER_FRIENDLY: {
      TITLE: "User-Friendly",
      DESCRIPTION: "Designed for all ages from 10 to 85+. Simple interface that works perfectly on both desktop and mobile devices.",
    },
  },
  CTA_HEADER: "Ready to Check Your Eye Health?",
  CTA_DESC: "Take the first step towards better eye health with our AI-powered detection system. Quick, easy, and reliable results in minutes.",
  CTA_BUTTON: "Start Your Eye Scan Now",
}

export const EYESCANCONTENT = {
  RECOMMENDATIONS:
      ["Ensure no light reflections on the eyes when taking the photo",
        "Keep the eye open and look directly at the camera",
        "Make sure the image is clear and not blurry — clean your camera if needed",
        "Locate your face inside the bounding box"
      ]
}

export const ABOUTCONTENT = {
  OUR_MISSION:
  [
      "The sense of sight is fundamental to our daily lives, yet millions of people worldwide\n" +
      "lack access to timely and affordable eye care. Traditional diagnosis methods are often\n" +
      "time-consuming, expensive, and require specialized medical equipment.",
      "EyeNet bridges this gap by providing an accessible, AI-powered solution that can detect\n" +
      "external eye conditions with remarkable accuracy. Our goal is to democratize eye health\n" +
      "screening and enable early detection of conditions like cataracts, conjunctivitis, and styes."
  ],
  DESC: "Many eye conditions can be effectively treated when caught early. Our AI technology\n" +
      "helps identify potential issues before they significantly impact your vision and daily functioning.",
  CHALLENGES:[
      "Limited access to specialized eye care equipment",
      "Time-consuming and expensive diagnostic processes",
      "Geographic barriers to professional eye care",
      "Delayed detection leading to vision complications"
  ],
  SOLUTIONS:[
      "Accessible AI-powered screening from any device",
      "Instant results with 91% accuracy rate",
      "Available 24/7 from the comfort of your home",
      "Early detection enabling timely treatment"
  ],
  SPECIAL_FEATURES: [
      "Our DenseNet121 model with attention mechanisms is trained on over 13,000 images\n" +
      "per condition, ensuring high accuracy and reliability.",
      "Get comprehensive eye health analysis in seconds, not hours.\n" +
      "Our optimized system delivers results almost instantly.",
      "Designed for users aged 10 to 80+, with intuitive interfaces that work\n" +
      "seamlessly across all devices and platforms."
      ],
  IMPACT:
      {
        GOAL: "We envision a world where advanced eye health screening is accessible to everyone,\n" +
            "regardless of location, economic status, or access to specialized healthcare facilities.",
        ACCURACY:{
          HEADER: "91%",
          DESC: "Detection Accuracy"
        },
        DATASET:{
            HEADER: "13K+",
            DESC: "Training Images per Condition"
        },
        AVAILABLE:{
            HEADER: "24/7",
            DESC: "Available Anytime, Anywhere"
        }
      }
}

export const TECHNOLOGY = {
  ARCHITECTURE:{
    DENSENET:"Dense connections between layers for optimal feature reuse and gradient flow",
    ATTENTION: "Enhanced focus on relevant image regions for improved accuracy",
    AUGMENTATION: "Robust training with varied lighting conditions and image transformations",
  },
  TECH_STACK:{
    FRONTEND:[
      "React.js for interactive UI",
      "Tailwind CSS for styling",
      "Responsive design principles",
      "Modern web standards"
    ],
    BACKEND:[
      "FastAPI for high-performance APIs",
      "Python ecosystem integration",
      "Async request handling",
      "Automatic API documentation",
      "RESTful architecture",
      "Dockerized for easy deployment"
    ],
    AIML:[
      "TensorFlow for deep learning",
      "OpenCV for image processing",
      "NumPy for numerical computing",
      "Scikit-learn for ML utilities",
      "CUDA GPU acceleration",
    ]
  }
}

import galImage from '../assets/gal_photo.jpeg';
import ronImage from '../assets/hidden_person.jpeg'
export const TEAM = {
    MEMBER: [
        {
            NAME: "Gal Bitton",
            ROLE: "Backend Developer at Qlik",
            EXPERTISE:"Backend Development & Node.js | Python",
            IMAGE: galImage,
            BIO: "Software engineer student in his final year at Braude College of Engineering. Passionate about backend development, particularly in Node.js and Python.",
            EMAIL: "galbitton22@gmail.com"
        },
        {
            NAME: "Ron Bendel",
            ROLE: "Software Engineer at Rafael",
            EXPERTISE:"Backend Development & Python | AI/ML",
            IMAGE: ronImage,
            BIO: "Software engineer student in his final year at Braude College of Engineering. Passionate about backend development, particularly in Node.js and Python.",
            EMAIL: "ronbendel12345@gmail.com"
        }
    ]
}

export const COMMONTEXT = {
    EMAIL: "CatarctProject3@gmail.com",
    SUPPORT_EMAIL: "EyeNetSupport@gmail.com",
    PHONE: "+(0) 123-456-7890",
    SECOND_PHONE: "+(0) 987-654-3210",
    ADDRESS: "Braude College of Engineering Karmiel",
    SUPPORT_HOURS: {
        WEEK: "08:00 AM - 6:00 PM",
        FRIDAY: "08:00 AM - 2:00 PM",
        SATURDAY: "Closed"
    }
}
