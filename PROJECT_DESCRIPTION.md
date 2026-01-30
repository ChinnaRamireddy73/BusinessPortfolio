# Business Portfolio - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Architecture](#architecture)
5. [Deployment Status](#deployment-status)
6. [Admin Panel Guide](#admin-panel-guide)
7. [API Documentation](#api-documentation)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Business Portfolio** is a full-stack web application designed for professionals and businesses to showcase their:
- Portfolio of projects/work samples
- Client testimonials and reviews
- Services and capabilities
- Contact information for inquiries

The application features:
- **Public Landing Page**: Showcases projects, clients, and enables contact/newsletter signup
- **Admin Dashboard**: Secure panel for managing content (projects, clients, inquiries)
- **Real-time Data**: All content is dynamically fetched from MongoDB
- **Image Storage**: Cloudinary integration for persistent cloud storage

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI Framework |
| Vite | 7.2.4 | Build tool & dev server |
| React Router | 7.13.0 | Page routing |
| Axios | 1.13.4 | API requests |
| Swiper | 12.1.0 | Carousel/slider |
| CSS | Vanilla | Styling |

**Deployment**: Vercel  
**URL**: `https://businessportfolio1.vercel.app`

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 22.22.0 | Runtime |
| Express | 5.2.1 | Server framework |
| MongoDB | 9.1.5 | Database |
| Mongoose | 9.1.5 | ODM |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |
| Cloudinary | 1.40.0 | Image storage |
| Multer | 2.0.2 | File uploads |
| CORS | 2.8.6 | Cross-origin requests |

**Deployment**: Render  
**URL**: `https://business-portfolio-api.onrender.com`

### Database
| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Cloud database hosting |
| Collections | Admin, Project, Client, Contact, Subscriber |

### Image Storage
| Service | Purpose |
|---------|---------|
| Cloudinary | Cloud image hosting & CDN |
| Folder | `business_portfolio` |

---

## ✨ Features

### 🌐 Public Features
1. **Home Page**
   - Hero section with business intro
   - Featured projects showcase
   - Client testimonials carousel
   - Call-to-action buttons

2. **Projects Showcase**
   - Display all projects with images
   - Project descriptions and links
   - Cloudinary-hosted images
   - Responsive grid layout

3. **Client Testimonials**
   - Client names, designations, images
   - Testimonial text
   - Swiper carousel for browsing

4. **Contact Form**
   - Name, email, subject, message fields
   - Server-side validation
   - Stores in MongoDB
   - Toast notifications

5. **Newsletter Subscription**
   - Email subscription form
   - Stores subscribers in database
   - Used for marketing campaigns

### 🔐 Admin Features
1. **Admin Authentication**
   - Secure login with JWT
   - Token stored in localStorage
   - Auto token injection in requests
   - Protected routes

2. **Project Management**
   - Add new projects (with image upload)
   - Edit existing projects
   - Delete projects
   - Images uploaded to Cloudinary

3. **Client Management**
   - Add client testimonials
   - Edit client info
   - Delete clients
   - Profile image upload

4. **Data Viewing**
   - View all contact inquiries
   - View all newsletter subscribers
   - Search/filter data (future enhancement)

---

## 🏗 Architecture

### Frontend Structure
```
client/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ClientCard.jsx
│   │   ├── ContactForm.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Modal.jsx
│   │   ├── Newsletter.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Slider.jsx
│   │   └── Toast.jsx
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageProjects.jsx
│   │   ├── ManageClients.jsx
│   │   ├── ViewInquiries.jsx
│   │   └── ViewSubscribers.jsx
│   ├── layouts/              # Layout wrappers
│   │   ├── MainLayout.jsx    # Public site layout
│   │   └── AdminLayout.jsx   # Admin dashboard layout
│   ├── context/              # State management
│   │   └── ToastContext.jsx  # Toast notifications
│   ├── api.js                # Axios configuration
│   ├── App.jsx               # Main component
│   └── main.jsx              # Entry point
└── vite.config.js            # Vite configuration
```

### Backend Structure
```
server/
├── routes/                   # API endpoints
│   ├── auth.js              # Login/Seed endpoints
│   ├── projects.js          # Project CRUD
│   ├── clients.js           # Client CRUD
│   ├── contact.js           # Contact form
│   └── subscribe.js         # Newsletter
├── models/                   # MongoDB schemas
│   ├── Admin.js
│   ├── Project.js
│   ├── Client.js
│   ├── Contact.js
│   └── Subscriber.js
├── middleware/               # Custom middleware
│   ├── auth.js              # JWT verification
│   └── cloudinary.js        # Cloudinary upload config
├── utils/                    # Helper functions
│   └── seedAdmin.js         # Create default admin
└── index.js                  # Server entry point
```

### Request Flow (Login Example)
```
Frontend (Vercel)
    ↓ (AXIOS POST /api/auth/login)
Backend (Render) - CORS check
    ↓
Auth Route - Password verification (bcrypt)
    ↓
Generate JWT token
    ↓
Send token to frontend
    ↓
Frontend stores in localStorage
    ↓
Attach token in all future requests
    ↓
Auth middleware validates token
    ↓
Allow/Deny access
```

---

## 🚀 Deployment Status

### Current Deployments
| Service | Status | URL |
|---------|--------|-----|
| Frontend (Vercel) | ✅ Live | https://businessportfolio1.vercel.app |
| Backend (Render) | ✅ Live | https://business-portfolio-api.onrender.com |
| Database (MongoDB Atlas) | ✅ Connected | Cloud hosted |
| Images (Cloudinary) | ✅ Configured | Cloud CDN |

### Environment Variables Set

**Vercel (Frontend)**
```
VITE_API_URL=https://business-portfolio-api.onrender.com/api
```

**Render (Backend)**
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://businessportfolio1.vercel.app
```

---

## 👥 Admin Panel Guide

### Accessing Admin Panel
1. Visit: `https://businessportfolio1.vercel.app/admin/login`
2. Login credentials:
   - Email: `admin@business.com`
   - Password: `admin123`
3. After login, you'll be redirected to dashboard

### Admin Dashboard Features

#### 1. Manage Projects
- **View Projects**: List of all projects with images
- **Add Project**:
  1. Click "Add New Project"
  2. Fill: Name, Description, Project Link
  3. Upload image (auto-uploaded to Cloudinary)
  4. Click Save
- **Edit Project**: Click edit icon, modify fields, save
- **Delete Project**: Click delete icon, confirm

#### 2. Manage Clients
- **View Clients**: List of all client testimonials
- **Add Client**:
  1. Click "Add New Client"
  2. Fill: Name, Designation, Testimonial text
  3. Upload profile image
  4. Click Save
- **Edit/Delete**: Similar to projects

#### 3. View Inquiries
- See all contact form submissions
- Display: Name, Email, Subject, Message, Date

#### 4. View Subscribers
- See all newsletter subscribers
- Display: Email, Subscription date
- Use for marketing campaigns

### Security Notes
- Change default password immediately after first login
- JWT token expires in 24 hours
- Token is stored in browser localStorage
- Logout clears token

---

## 📡 API Documentation

### Base URL
`https://business-portfolio-api.onrender.com/api`

### Health Check
```
GET /
Response: "API is running..."
```

### Authentication

#### Login
```
POST /auth/login
Content-Type: application/json

Request:
{
  "email": "admin@business.com",
  "password": "admin123"
}

Response (200):
{
  "token": "eyJhbGc...",
  "admin": {
    "id": "507f1f77...",
    "email": "admin@business.com"
  }
}
```

#### Seed Admin
```
POST /auth/seed
Content-Type: application/json

Request:
{
  "email": "admin@business.com",
  "password": "admin123"
}

Response (201):
{
  "message": "Admin created"
}

Error (400):
{
  "message": "Admin already exists"
}
```

### Projects

#### Get All Projects
```
GET /projects
Auth: Not required

Response (200):
[
  {
    "_id": "507f1f77...",
    "name": "Project Name",
    "description": "...",
    "image": "https://cloudinary.com/...",
    "link": "https://...",
    "createdAt": "2026-01-30T..."
  }
]
```

#### Add Project
```
POST /projects
Auth: Required (Bearer token)
Content-Type: multipart/form-data

Request:
{
  "name": "My Project",
  "description": "Project description",
  "link": "https://project-url.com",
  "image": <file>
}

Response (201): Project object
```

#### Update Project
```
PUT /projects/:id
Auth: Required
Content-Type: multipart/form-data

Request: Same as POST
Response (200): Updated project object
```

#### Delete Project
```
DELETE /projects/:id
Auth: Required

Response (200):
{
  "message": "Project deleted"
}
```

### Clients

#### Get All Clients
```
GET /clients
Auth: Not required

Response (200):
[
  {
    "_id": "507f1f77...",
    "name": "Client Name",
    "designation": "CEO",
    "description": "Testimonial text",
    "image": "https://cloudinary.com/...",
    "createdAt": "2026-01-30T..."
  }
]
```

#### Add Client
```
POST /clients
Auth: Required
Content-Type: multipart/form-data

Request:
{
  "name": "Client Name",
  "designation": "Job Title",
  "description": "Testimonial",
  "image": <file>
}

Response (201): Client object
```

#### Update Client
```
PUT /clients/:id
Auth: Required

Response (200): Updated client object
```

#### Delete Client
```
DELETE /clients/:id
Auth: Required

Response (200):
{
  "message": "Client deleted"
}
```

### Contact Inquiries

#### Submit Contact Form
```
POST /contact
Auth: Not required
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question..."
}

Response (201):
{
  "message": "Inquiry submitted"
}
```

#### Get All Inquiries (Admin)
```
GET /contact
Auth: Required

Response (200):
[
  {
    "_id": "507f1f77...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "...",
    "createdAt": "2026-01-30T..."
  }
]
```

### Newsletter

#### Subscribe
```
POST /subscribe
Auth: Not required
Content-Type: application/json

Request:
{
  "email": "user@example.com"
}

Response (201):
{
  "message": "Subscribed"
}
```

#### Get Subscribers (Admin)
```
GET /subscribe
Auth: Required

Response (200):
[
  {
    "_id": "507f1f77...",
    "email": "user@example.com",
    "createdAt": "2026-01-30T..."
  }
]
```

### Error Responses

#### 400 Bad Request
```json
{
  "message": "Invalid input"
}
```

#### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

#### 403 Forbidden
```json
{
  "message": "Token is not valid"
}
```

#### 404 Not Found
```json
{
  "message": "Project not found"
}
```

#### 500 Server Error
```json
{
  "message": "Server error message"
}
```

---

## 🔧 Troubleshooting

### Login Issues

**"Invalid credentials"**
- Verify email is `admin@business.com`
- Verify password is `admin123`
- Check admin exists in MongoDB Atlas
- Clear browser cache/localStorage

**"CORS error"**
- Verify `CLIENT_URL` in Render matches Vercel URL
- Ensure Render service has redeployed
- Check browser console for exact CORS error

### Image Upload Issues

**"Image upload fails"**
- Verify Cloudinary credentials in Render env
- Check image size < 5MB
- Verify image format (jpg, jpeg, png, gif)
- Check Cloudinary storage quota

### Database Connection

**"MongoDB Connection Error"**
- Verify `MONGO_URI` is correct in `.env`
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify database name is correct
- Check username/password are correct

### API Not Responding

**"Cannot reach API"**
- Check Render service status (not sleeping)
- Verify API URL in frontend env: `https://business-portfolio-api.onrender.com/api`
- Try: `https://business-portfolio-api.onrender.com/` (should return "API is running...")
- Check browser Network tab for exact error

### Token Expiration

**"Token is not valid"**
- Token expires after 24 hours
- Login again to get new token
- Check browser console for JWT errors

