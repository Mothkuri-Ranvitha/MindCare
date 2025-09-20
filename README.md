# MindCare - Mental Health Support Platform for Indian College Students

A comprehensive mental health support platform designed specifically for Indian college students, featuring multi-role authentication, PHQ-9 depression assessments, AI chatbot support, and crisis intervention systems.

## 🌟 Features

### Core Functionality
- **Multi-role Authentication**: Student, Counselor, College Admin, System Admin roles
- **PHQ-9 Depression Assessment**: Automated scoring with severity classification
- **AI Chatbot**: Crisis keyword detection in multiple languages (English, Hindi, Tamil)
- **Peer Support Chat**: Real-time chat interface with moderation
- **Counselor Booking**: Appointment scheduling system
- **Resource Library**: Multi-language mental health resources
- **Analytics Dashboard**: Usage statistics and trends for administrators
- **Crisis Alert System**: Emergency contact integration and immediate support

### Design Features
- **Cultural Sensitivity**: Designed for Indian college context
- **Multi-language Support**: English, Hindi, Tamil
- **Mobile Responsive**: Optimized for smartphone access
- **Accessibility**: Screen reader support and high contrast options
- **Professional UI**: Healthcare-appropriate design aesthetics

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation and Setup

1. **Clone or Download the Project**
   ```bash
   # If you have the project files, navigate to the project directory
   cd mental-health-platform
   
   # Or if downloading from a repository:
   git clone [repository-url]
   cd mental-health-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open your browser and go to `http://localhost:5173`
   - The application will automatically open in your default browser

### Demo Credentials

Use these credentials to test different user roles:

| Role | Email | Password |
|------|-------|----------|
| Student | `student@college.edu` | `student123` |
| Counselor | `counselor@college.edu` | `counselor123` |
| College Admin | `admin@college.edu` | `admin123` |
| System Admin | `superadmin@platform.com` | `super123` |

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/              # Authentication components
│   ├── Layout/            # Navigation and layout
│   ├── Dashboard/         # Role-specific dashboards
│   ├── Assessment/        # PHQ-9 assessment
│   ├── Chat/              # AI chatbot interface
│   ├── Resources/         # Resource library
│   └── Analytics/         # Admin analytics
├── contexts/              # React contexts
├── data/                  # Static JSON data files
└── App.tsx               # Main application component
```

## 📊 Static Data Structure

The application uses JSON files to simulate backend data:

- **`users.json`**: User profiles and authentication data
- **`phq9.json`**: PHQ-9 questions, scoring, and multi-language support
- **`resources.json`**: Mental health resources and emergency contacts
- **`appointments.json`**: Counseling appointment data
- **`chatbot.json`**: Crisis keywords and AI responses
- **`analytics.json`**: Dashboard statistics and trends

## 🔧 Key Components

### Authentication System
- Role-based access control
- Secure login with demo credentials
- Context-based state management

### PHQ-9 Assessment
- Standard depression screening questionnaire
- Multi-language support (English, Hindi, Tamil)
- Automated scoring and severity classification
- Crisis intervention triggers

### AI Chatbot
- Crisis keyword detection
- Multi-language support
- Immediate crisis alert system
- Professional escalation pathways

### Analytics Dashboard
- Usage statistics and trends
- College-wise performance metrics
- Depression severity distribution
- Crisis alert monitoring

## 🌐 Multi-language Support

The platform supports:
- **English**: Primary language
- **Hindi**: हिंदी support for North Indian students
- **Tamil**: தமிழ் support for South Indian students

Language switching is available in the navigation bar.

## 🚨 Crisis Support Features

- **24/7 Helpline Integration**: Direct calling links to Indian crisis helplines
- **Crisis Keyword Detection**: AI monitors conversations for crisis indicators
- **Emergency Contacts**: Quick access to mental health helplines
- **Professional Escalation**: Immediate counselor connection for high-risk cases

## 💻 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔒 Security Features

- Role-based access control
- Data encryption simulation
- Crisis alert protocols
- Emergency contact integration

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Smartphones (iOS/Android)
- Tablets
- Desktop computers
- Various screen sizes and orientations

## 🎨 Design System

- **Primary Colors**: Blue (#2563EB) for trust and stability
- **Secondary Colors**: Green (#059669) for healing and growth
- **Accent Colors**: Orange (#EA580C) for warmth and support
- **Alert Colors**: Red system for crisis situations
- **Typography**: Clear, readable fonts optimized for healthcare
- **Spacing**: Consistent 8px grid system

## 📞 Emergency Contacts (India)

- **National Suicide Prevention Helpline**: 022-2754-6669
- **Snehi (Delhi)**: 011-65656565
- **AASRA (Mumbai)**: 022-27546669
- **Sumaitri (Delhi)**: 011-23389090

## 🤝 Contributing

This is a prototype application using static data. For production deployment, integration with:
- Real database systems
- Authentication services
- Video calling platforms
- SMS/Email services
- Professional counselor networks

## 📄 License

This project is developed as a prototype for educational and demonstration purposes.

## 💡 Future Enhancements

- Real-time chat with Socket.io integration
- Video counseling sessions
- Mobile app development
- Integration with Indian healthcare systems
- Advanced AI/ML features for mental health prediction
- Community forums and peer support groups

---

**Important**: This is a prototype application. For actual mental health crises, please contact professional services or emergency helplines immediately.