# Habit Tracker

A modern web application for tracking daily habits and building consistent routines. Monitor your progress, set goals, and develop positive habits with an intuitive and responsive interface.

## Features

### Core Functionality
- **Habit Management**: Create, edit, and delete custom habits with categories and priorities
- **Progress Tracking**: Visual progress indicators, streak counters, and completion percentages
- **Daily Check-ins**: Mark habits as complete with simple interactions and notes
- **Analytics Dashboard**: View habit completion statistics, trends, and historical data
- **Goal Setting**: Set weekly, monthly, and yearly habit goals with progress tracking
- **Habit Categories**: Organize habits by categories (Health, Productivity, Learning, etc.)

### User Experience
- **User Authentication**: Secure JWT-based registration and login system
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Notifications**: Reminder notifications for habit check-ins
- **Data Export**: Export habit data to CSV for external analysis
- **Habit Templates**: Pre-built habit templates for quick setup

## Tech Stack

- **MongoDB** - NoSQL database for storing user profiles, events, and application data
- **Express.js** - Backend framework for building RESTful APIs and server-side logic
- **React** - Frontend library for building interactive user interfaces
- **Vite** - Modern build tool for fast development and optimized production builds
- **Node.js** - JavaScript runtime environment for server-side development

*Note: This project uses modern versions of React, Express, and Mongoose, avoiding deprecated libraries and outdated methods for enhanced stability and security.*

## Project Structure

```
Habit_Tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS and styling files
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Express.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route handlers
│   ├── middleware/       # Custom middleware
│   ├── controllers/      # Business logic
│   ├── config/          # Configuration files
│   └── utils/           # Server utilities
├── .env.example         # Environment variables template
├── package.json         # Backend dependencies
└── README.md           # Project documentation
```

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** (v7 or higher) or **yarn** (v1.22 or higher)
- **Git** for version control

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Habit_Tracker
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
```

### Environment Variables
Update the `.env` file with the following configuration:

```env
# Database
MONGO_URI=mongodb://localhost:27017/habit_tracker
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/habit_tracker

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=30d

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Client URL
CLIENT_URL=http://localhost:3000
```

4. Initialize the database (optional):
```bash
# Seed the database with sample data
npm run seed
```

5. Start the development servers:
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Backend server (runs on http://localhost:5000)
npm run server

# Frontend development server (runs on http://localhost:3000)
npm run client
```

## Available Scripts

```bash
npm run dev          # Start both client and server concurrently
npm run server       # Start Express.js backend server
npm run client       # Start React development server
npm run build        # Build production version
npm run test         # Run test suites
npm run seed         # Seed database with sample data
npm run lint         # Run ESLint for code quality
npm run format       # Format code with Prettier
```

## Usage

1. Register a new account or login with existing credentials
2. Create your first habit by clicking "Add Habit"
3. Set habit details including name, frequency, and goals
4. Mark habits as complete each day to build streaks
5. View your progress in the analytics dashboard

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Habit Management
- `GET /api/habits` - Get all user habits
- `GET /api/habits/:id` - Get specific habit
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/complete` - Mark habit as complete
- `GET /api/habits/:id/stats` - Get habit statistics

### Analytics & Reports
- `GET /api/analytics/dashboard` - Get dashboard data
- `GET /api/analytics/streaks` - Get streak information
- `GET /api/analytics/progress` - Get progress reports
- `POST /api/analytics/export` - Export habit data

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Deployment

### Production Build
```bash
# Build the client for production
cd client
npm run build
cd ..

# Start production server
npm start
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Environment Setup for Production
- Set `NODE_ENV=production`
- Use MongoDB Atlas for database
- Configure proper JWT secrets
- Set up SSL certificates
- Configure reverse proxy (Nginx)

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suites
npm run test:unit        # Unit tests
npm run test:integration # Integration tests
npm run test:e2e        # End-to-end tests
```

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network access and firewall settings

**Port Already in Use**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

**Module Not Found Errors**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build Failures**
- Check Node.js version compatibility
- Ensure all environment variables are set
- Clear build cache: `npm run clean`

## Performance Optimization

- **Database Indexing**: Proper indexes on frequently queried fields
- **Caching**: Redis integration for session management
- **Code Splitting**: Lazy loading of React components
- **Image Optimization**: WebP format and responsive images
- **Bundle Analysis**: Use `npm run analyze` to check bundle size

## Security Features

- JWT token authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js for security headers

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Follow coding standards (ESLint + Prettier)
4. Write tests for new features
5. Commit changes (`git commit -am 'Add new feature'`)
6. Push to branch (`git push origin feature/new-feature`)
7. Create a Pull Request

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow React best practices and hooks patterns
- Write meaningful commit messages
- Add JSDoc comments for functions
- Maintain test coverage above 80%

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Social features and habit sharing
- [ ] Advanced analytics and insights
- [ ] Integration with fitness trackers
- [ ] Habit recommendation system
- [ ] Team challenges and competitions

## Support

For support and questions:
- Create an issue on GitHub
- Check the [Wiki](link-to-wiki) for detailed guides
- Join our [Discord community](link-to-discord)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the amazing framework
- MongoDB team for the flexible database
- All contributors who helped improve this project