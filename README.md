# 🚀 Barzah Internal Task Management System

A comprehensive internal task management web application built specifically for Barzah employees. This system allows team members to create, assign, track, and collaborate on tasks efficiently.

![Barzah Tasks](https://img.shields.io/badge/Barzah-Tasks-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🔐 Authentication
- Secure login system with JWT tokens
- Beautiful branded login page with Barzah theme
- Session management and automatic logout

### 📋 Task Management
- **Create Tasks**: Add new tasks with title, description, category, and due date
- **Edit Tasks**: Modify existing tasks and update their status
- **Delete Tasks**: Remove tasks with confirmation
- **Complete Tasks**: Mark tasks as completed with automatic timestamp and user tracking

### 🏷️ Categories & Status
- **Categories**: Marketing, Technical, Support, Administration
- **Status**: In Progress, Postponed, Completed
- Color-coded badges for easy visual identification

### 👥 Collaboration
- **Comments System**: Internal team communication on each task
- **File Attachments**: Upload and download documents, images, PDFs
- **Task Assignment**: Assign tasks to specific team members
- **Activity Tracking**: See who completed tasks and when

### 📊 Dashboard & Analytics
- Real-time task statistics (In Progress, Postponed, Completed, Overdue)
- Separate views for active and completed tasks
- Overdue task detection with visual indicators

### 🔍 Search & Filter
- Search tasks by title or description
- Filter by status, category
- Advanced filtering options

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet and desktop optimized
- Modern, professional UI with smooth animations

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **date-fns** for date formatting
- **Vite** for development and building

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Concurrently** for running multiple processes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB connection (already configured)
- npm or yarn package manager

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   ```bash
   npm run start:full
   ```

   This command starts both the backend server (port 3001) and frontend development server (port 5173) simultaneously.

### Alternative Start Methods

- **Frontend only:**
  ```bash
  npm run dev
  ```

- **Backend only:**
  ```bash
  npm run server
  ```

- **Production build:**
  ```bash
  npm run build
  npm run preview
  ```

## 🔑 Test Account

A test admin account has been created for immediate access:

**Email:** `admin@barzah.com`  
**Password:** `admin123`

You can use this account to:
- Log into the system immediately
- Create and manage tasks
- Test all features
- Add more users as needed

## 📁 Project Structure

```
barzah-tasks/
├── src/
│   ├── components/          # React components
│   │   ├── Login.tsx       # Login page
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── TaskCard.tsx    # Task display component
│   │   ├── TaskModal.tsx   # Task creation/editing
│   │   ├── TaskDetailsModal.tsx # Task details view
│   │   └── Header.tsx      # Navigation header
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── services/           # API services
│   │   └── api.ts         # API communication
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # Type definitions
│   └── App.tsx            # Main application
├── server/
│   └── index.js           # Express server
├── public/                # Static assets
│   ├── Barzah Logo.png    # Company logo
│   └── Barzah Main Theme 3.png # Background theme
└── uploads/               # File upload directory
```

## 🎯 Usage Guide

### Creating Tasks
1. Click "Add New Task" button on the dashboard
2. Fill in task details (title, description, category, due date, assignee)
3. Click "Create Task" to save

### Managing Tasks
- **View Details**: Click the info (ℹ️) icon on any task card
- **Edit**: Click the edit (✏️) icon to modify task details
- **Delete**: Click the trash (🗑️) icon to remove tasks
- **Complete**: Click "Complete" button to mark as finished

### Task Details
- View full task information
- Add comments for team collaboration
- Upload and download file attachments
- See completion history

### Filtering & Search
- Use the search bar to find specific tasks
- Filter by status (Active/Completed)
- Filter by category (Marketing, Technical, Support, Administration)
- View task statistics on the dashboard

## 🔧 Configuration

### Environment Variables
The application uses the following environment variables (already configured):

```env
MONGODB_URI=mongodb+srv://barzah_user:De0y1wCchivYtTTD@cluster0.p6lxx.mongodb.net/barzah_tasks?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
PORT=3001
```

### File Upload Settings
- **Supported formats**: JPEG, JPG, PNG, GIF, PDF, DOC, DOCX, TXT
- **File size limit**: 10MB per file
- **Storage**: Local filesystem in `/uploads` directory

## 🛡️ Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **File Type Validation**: Restricted file upload types
- **CORS Protection**: Configured for secure cross-origin requests

## 📱 Mobile Support

The application is fully responsive and works seamlessly on:
- 📱 Mobile phones (iOS/Android)
- 📱 Tablets (iPad, Android tablets)
- 💻 Desktop computers
- 🖥️ Large screens and monitors

## 🎨 Design Philosophy

The interface follows modern design principles:
- **Clean & Minimal**: Focused on functionality without clutter
- **Professional**: Suitable for corporate environment
- **Intuitive**: Easy to learn and use
- **Accessible**: High contrast ratios and readable fonts
- **Branded**: Incorporates Barzah visual identity

## 🔄 Development Workflow

### Adding New Features
1. Create feature branch
2. Implement frontend components in `src/components/`
3. Add backend routes in `server/index.js`
4. Update TypeScript types in `src/types/`
5. Test thoroughly before deployment

### Database Schema
- **Users**: name, email, password, timestamps
- **Tasks**: title, description, category, status, dates, assignments, attachments, comments
- **Comments**: user reference, text, timestamps
- **Attachments**: filename, path, metadata

## 🚀 Deployment

For production deployment:

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Deploy to your preferred hosting service** (Vercel, Netlify, Heroku, etc.)

4. **Ensure MongoDB connection is accessible from production environment**

## 📞 Support

For technical support or feature requests related to the Barzah Task Management System, please contact the development team.

## 📄 License

This is an internal application developed specifically for Barzah employees. All rights reserved.

---

**Built with ❤️ for the Barzah Team**