# Business Portfolio Website

A complete full-stack business portfolio application with a public landing page and a secure admin panel.

## Technology Stack
- **Frontend**: React (Vite), CSS (Vanilla)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Image Upload**: Multer (Local Storage) / Ready for Cloudinary

## Features
- **Public Landing Page**:
  - Dynamic Projects Showcase
  - Client Testimonials
  - Contact Form
  - Newsletter Subscription
- **Admin Panel**:
  - Secure Login
  - Manage Projects (Add, Edit, Delete)
  - Manage Clients (Add, Edit, Delete)
  - View Contact Inquiries
  - View Newsletter Subscribers

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running (default: `mongodb://localhost:27017`)

### Installation

1. **Clone the repository** (if not already local)

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create .env file with:
   # PORT=5000
   # MONGO_URI=mongodb://localhost:27017/business_portfolio
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the App**
   - User Site: `http://localhost:5173`
   - Admin Panel: `http://localhost:5173/admin/login`
   - Admin Credentials: `admin@business.com` / `admin123`

## API Documentation

- `GET /api/projects`: List all projects
- `POST /api/projects`: Add new project (multipart/form-data)
- `GET /api/clients`: List all clients
- `POST /api/contact`: Submit inquiry
- `POST /api/subscribe`: Subscribe to newsletter

## License
MIT
