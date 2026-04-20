
# Church Event Management System

A web-based system for managing church events, registering youth, tracking attendance, and generating badges with QR codes.

## Features

- Register youth with full details (name, congregation, talent, phone, allergies, MPESA code)
- Dashboard for total registered, checked-in, and not checked-in youth
- Search youth by name
- Admin-only youth list with:
  - Search by phone
  - Check-in youth
  - Delete youth
  - Generate printable event badges with QR codes
- Progress bar for attendance
- Secure admin access via secret key
- Professional dashboard with header & footer

## Technologies Used

- Frontend: React, Axios, React Router
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Authentication: JWT
- QR Codes: `qrcode.react`
- Printing: `react-to-print`
- Styling: CSS, dashboard cards, responsive layout

## Installation

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file with:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ADMIN_KEY=your_admin_secret
   ```
4. Start server:

   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set environment variable in `.env`:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start React app:

   ```bash
   npm start
   ```

## Deployment

* Backend: Heroku, Render, or Railway
* Frontend: Netlify, Vercel, or GitHub Pages
* Make sure to set **REACT_APP_API_URL** to your backend URL in production.

## Usage

* Admin must enter secret key to access the youth list and perform check-in or deletion.
* Youth can register without logging in.
* Badges can be printed for each youth, including a QR code.

## Author

**Pianist Charles Wambua**
Contact: 0745939344
Developed for church event management




```
