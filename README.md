# Business Portfolio Website

A complete full-stack business portfolio application with a public landing page and a secure admin panel. Ready for production deployment on Vercel, Render, MongoDB Atlas, and Cloudinary.

## 🎨 Technology Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Swiper** for carousel/slider
- **CSS** (Vanilla, responsive)

### Backend
- **Node.js** with Express
- **MongoDB** (MongoDB Atlas for production)
- **JWT** for authentication
- **Cloudinary** for image storage
- **Multer** for file handling
- **bcryptjs** for password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Images**: Cloudinary CDN

## ✨ Features

### 🌐 Public Landing Page
- Dynamic Projects Showcase with filtering
- Client Testimonials & Reviews
- Contact Form with validation
- Newsletter Subscription
- Responsive Design
- Smooth animations & transitions

### 🔐 Admin Panel
- Secure JWT Authentication
- Manage Projects (CRUD)
- Manage Clients (CRUD)
- View Contact Inquiries
- View Newsletter Subscribers
- Image Upload to Cloudinary

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v16+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BusinessPortfolio.git
   cd BusinessPortfolio
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   
   # Create .env file (copy from .env.example)
   cp .env.example .env
   
   # Edit .env with your values (local MongoDB)
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   
   # Create .env file (copy from .env.example)
   cp .env.example .env
   
   npm run dev
   ```

4. **Access the App**
   - 🌐 **Website**: [http://localhost:5173](http://localhost:5173)
   - 🔐 **Admin Panel**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
   - **Default Credentials**: 
     - Email: `admin@example.com`
     - Password: `admin123` (⚠️ Change after first login!)

## 📦 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions:

1. **MongoDB Atlas Setup** (5 min)
2. **Cloudinary Setup** (2 min)
3. **Deploy Backend to Render** (10 min)
4. **Deploy Frontend to Vercel** (5 min)
5. **Configure Environment Variables**

### Environment Variables

**Backend (.env)**
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/business_portfolio
JWT_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://your-vercel-app.vercel.app
```

**Frontend (.env)**
```
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## 📚 API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/clients` - Get all clients
- `POST /api/contact` - Submit contact form
- `POST /api/subscribe` - Subscribe to newsletter

### Protected Routes (Admin Only)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client
- `GET /api/contact` - View inquiries
- `GET /api/subscribe` - View subscribers

### Auth Routes
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

## 📁 Project Structure

```
BusinessPortfolio/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout wrappers
│   │   ├── context/        # React Context (Toast)
│   │   └── api.js          # Axios configuration
│   └── vite.config.js
├── server/                 # Express Backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB schemas
│   ├── middleware/         # Auth, Cloudinary upload
│   ├── utils/              # Helper functions
│   └── index.js            # Server entry point
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Environment variables for sensitive data
- ✅ Image validation & size limits
- ✅ Cloudinary secure uploads

## 🛠 Development

### Available Scripts

**Backend**
```bash
npm start          # Start server
npm test           # Run tests (if available)
```

**Frontend**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 📝 Default Admin Account

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

- **Email**: `admin@example.com`
- **Password**: `admin123`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions on changing the admin password.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ | Ready for Production** 🚀
