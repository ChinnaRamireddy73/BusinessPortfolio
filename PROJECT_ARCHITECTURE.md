# Business Portfolio Website - End-to-End Project Architecture

## 📌 Project Overview
This document outlines the complete technical architecture and data flow for the Business Portfolio Website. The system is designed as a **Full Stack Web Application** comprising a public-facing React frontend and a secure Node.js/Express backend.

---

## 1️⃣ Public User Flow (No Login)
**Goal**: Allow any visitor to view the portfolio and contact the business without authentication.

### **A. Landing Page Access**
1.  **User Action**: Visitor opens the website URL (e.g., `http://localhost:5173`).
2.  **Frontend**: React loads the `Home` component.
3.  **Data Fetching**:
    *   On load (`useEffect`), the frontend makes HTTP `GET` requests using **Axios**.
    *   `GET /api/projects` → Fetches project list.
    *   `GET /api/clients` → Fetches client testimonials.
4.  **Display**: The data (JSON) received from the backend is rendered into **Project Cards** and **Client Cards**. Images are served from the backend's static file server.

### **B. Contact Form Submission**
1.  **User Action**: User fills out the "Get in Touch" form (Name, Email, Mobile, City) and clicks Submit.
2.  **Frontend**: Validates input -> Sends `POST /api/contact` with form data.
3.  **Backend**: Receives data -> Validates -> Saves to the **Contacts Collection** in MongoDB.
4.  **Feedback**: Frontend displays a "Success" message upon 200 OK response.

### **C. Newsletter Subscription**
1.  **User Action**: User enters email in the footer and subscribes.
2.  **Frontend**: Sends `POST /api/subscribe` with the email.
3.  **Backend**: Checks validity -> Saves to **Subscribers Collection**.

---

## 2️⃣ Admin Login Flow (Secure)
**Goal**: Restrict access to content management features to authorized administrators only.

### **A. Authentication Mechanism**
1.  **Access**: Admin navigates to `/admin/login`.
2.  **Credentials**: Admin enters Email and Password.
3.  **Request**: Frontend sends `POST /api/auth/login`.

### **B. Backend Verification**
1.  **User Lookup**: Search `Admin` collection for the email.
2.  **Password Check**: Compare entered password with stored **Bcrypt Hash**.
3.  **Token Generation**: If valid, sign a **JWT (JSON Web Token)** containing the admin's ID.
4.  **Response**: Send the JWT string back to the client.

### **C. Frontend Session Handling**
1.  **Storage**: React saves the JWT in `localStorage` (`token`).
2.  **Redirection**: User is redirected to `/admin/dashboard`.
3.  **Route Protection**: The `AdminLayout` wrapper checks for the token's existence. If missing, it kicks the user back to Login.

---

## 3️⃣ Admin Panel Flow
**Goal**: Enable dynamic content management.

### **A. Dashboard Access**
*   All requests to Admin APIs include the JWT in the `Authorization` header.
*   **Backend Middleware (`auth.js`)**: Intercepts requests, verifies the JWT signature. If valid, the request proceeds; otherwise, 401 Unauthorized.

### **B. Project & Client Management (CRUD)**
1.  **Add/Edit**: Admin fills a form and selects an image.
2.  **Image Handling**:
    *   Frontend uses `FormData` to package text fields + binary file.
    *   Sends `POST` or `PUT` request.
3.  **Backend Processing**:
    *   **Multer Middleware**: Intercepts the file -> Renames it (timestamped) -> Saves to `/uploads` folder.
    *   **Controller**: Saves the *file path* (e.g., `/uploads/image-123.jpg`) and text data to MongoDB.
4.  **UI Update**: Frontend refreshes the list or optimistically updates the UI to show the new item immediately.

### **C. Viewing Inquiries**
*   Admin visits "Inquiries" page -> `GET /api/contact` (Protected Route) -> Backend returns all form submissions from DB.

---

## 4️⃣ Backend Architecture Flow
**Stack**: Node.js, Express, MongoDB

### **A. API Structure**
*   **Method**: RESTful API
*   **Format**: JSON
*   **Endpoint Pattern**: `/api/resource`

### **B. Key Components**
1.  **`index.js`**: Entry point. initializes Express, connects to MongoDB, mounts routes.
2.  **Routes (`/routes/*.js`)**: Define endpoints (GET/POST/PUT/DELETE) and map them to logic.
3.  **Middleware**:
    *   `cors`: Allows frontend (Port 5173) to talk to backend (Port 5000).
    *   `auth`: Validates JWT for protected routes.
    *   `upload`: Handles multipart/form-data (file uploads).
4.  **Models (`/models/*.js`)**: Mongoose schemas defining data structure (Types, Required fields).

---

## 5️⃣ Database Flow
**System**: MongoDB (NoSQL)

### **Collections (Tables)**
1.  **Projects**: Stores portfolio items (`title`, `desc`, `imagePath`, `link`).
2.  **Clients**: Stores testimonials (`name`, `role`, `imagePath`, `feedback`).
3.  **Contacts**: Stores user messages (`name`, `email`, `mobile`, `city`).
4.  **Subscribers**: Stores email addresses.
5.  **Admins**: Stores admin credentials (`email`, `passwordHash`).

---

## 6️⃣ Assets Usage
**Strategy**: Hybrid approach.

1.  **Static/Design Assets**:
    *   Icons, Logos, Backgrounds provided in "Assets" folder.
    *   Placed in `client/public` or `src/assets`.
    *   Used for layout structure (Headers, Footers, UI elements).

2.  **Dynamic Content**:
    *   Project/Client images are **not** hardcoded.
    *   They are uploaded by the Admin via the Panel.
    *   Stored in `server/uploads` and served statically.

---

## 7️⃣ Deployment Flow
**Production Strategy**: Decoupled Deployment.

### **A. Frontend (React)**
1.  **Build**: Run `npm run build` -> Compiles React to static HTML/CSS/JS.
2.  **Hosting**: Deploy `dist` folder to platforms like **Vercel**, **Netlify**, or **AWS S3**.
3.  **Config**: Set `VITE_API_URL` environment variable to point to the live Backend URL.

### **B. Backend (Node/Express)**
1.  **Environment**: Ensure `PORT`, `MONGO_URI`, and `JWT_SECRET` are set in production environment variables.
2.  **Hosting**: Deploy to **Render**, **Railway**, or **AWS EC2**.
3.  **Storage**: For production, local file storage (Multer) is ephemeral on some cloud platforms. *Recommendation: Switch Multer storage to **Cloudinary** or **AWS S3** for persistent image hosting.*

---

**Summary**: This architecture ensures a secure, scalable, and manageable application where public users experience fast, dynamic content, and admins have full control via a secure, authenticated interface.
