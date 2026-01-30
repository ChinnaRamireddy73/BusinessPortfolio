# Deployment Guide

## 🚀 Deployment Configuration

### 1. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user with password
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string from "Connect" → "Connect your application"
6. Replace `<username>`, `<password>`, and database name

### 2. Cloudinary Setup
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret
4. Images will be stored in `business_portfolio` folder

### 3. Backend Deployment (Render)

**Steps:**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: business-portfolio-api
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLIENT_URL=https://your-frontend.vercel.app
   ```
6. Click "Create Web Service"
7. Copy the deployed URL (e.g., `https://business-portfolio-api.onrender.com`)

### 4. Frontend Deployment (Vercel)

**Steps:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
6. Click "Deploy"
7. Copy the deployed URL

### 5. Update Backend CORS
After getting Vercel URL, update `CLIENT_URL` in Render:
```
CLIENT_URL=https://your-frontend.vercel.app
```

### 6. Test Deployment
1. Visit your Vercel URL
2. Test all features:
   - View projects and clients
   - Submit contact form
   - Newsletter subscription
   - Admin login
   - Upload images (will go to Cloudinary)

## 📝 Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## ⚠️ Important Notes

1. **Free Tier Limitations:**
   - Render: Cold starts (may take 30s-1min to wake up)
   - MongoDB Atlas: 512MB storage limit
   - Cloudinary: 25 credits/month (generous for small projects)

2. **Default Admin Credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`
   - ⚠️ **CHANGE THIS IMMEDIATELY** after first login

3. **Image Migration:**
   - Existing images in local `uploads/` folder won't be migrated automatically
   - Re-upload images through admin panel after deployment

## 🔧 Troubleshooting

- **CORS Error**: Verify `CLIENT_URL` in backend env
- **API Not Found**: Check `VITE_API_URL` in frontend env
- **Image Upload Fails**: Verify Cloudinary credentials
- **Database Connection**: Check MongoDB Atlas IP whitelist and connection string
