# Digital Business Card Portfolio Platform

A full-stack digital business card portfolio web application with a public-facing site and a private admin panel.

## Features

### Public Pages
- **Home (Business Card)**: 3D flip card with profile info and contact details
- **Projects/Works**: Grid layout of projects with filtering capabilities
- **About/Profile**: Bio, education, work experience, skills, and contact info

### Admin Panel
- JWT-based authentication
- Dashboard to manage all content
- Image upload functionality
- Real-time updates to public site

## Tech Stack

- **Frontend**: React (Vite), TailwindCSS, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **File Upload**: Multer

## Project Structure

```
/client          → React frontend (Vite)
/server          → Node.js + Express backend
/server/models   → Mongoose models
/server/routes   → API routes
/server/controllers → Business logic
/server/middleware  → Auth middleware
/server/uploads  → Uploaded images
.env             → Environment variables
README.md        → This file
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd digital-business-card-portfolio
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-card-portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Run the seed script to create the first admin user:

```bash
npm run seed
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

- **Public Site**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Default Admin Credentials**: 
  - Email: admin@example.com
  - Password: admin123

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Profile/Card
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### About
- `GET /api/about` - Get about page content
- `PUT /api/about` - Update about content (protected)

## Environment Variables

### Server (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | Secret key for JWT | - |
| NODE_ENV | Environment mode | development |

### Client (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## License

MIT
