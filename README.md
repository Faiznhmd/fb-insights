#  Facebook Insights Dashboard

A full-stack web application that integrates with the Facebook Graph API to fetch and display page analytics. Users can log in with Facebook, view their managed pages, and see key metrics like followers and fans in a clean dashboard.

---

##  Live Demo

*  Frontend (Vercel): [https://fb-insights-topaz.vercel.app/]
*  Backend (Render): [https://fb-insights.onrender.com]

---

##  Features

*  **Facebook OAuth Login**
*  Fetch user profile (name & profile picture)
*  Fetch all Facebook pages managed by the user
*  Select a page from dropdown
*  Display analytics:

  * Followers count
  * Fans count
*  Loading & error handling
*  Clean and responsive UI

---

##  Tech Stack

### Frontend

* React.js
* Axios

### Backend

* Node.js
* Express.js
* Facebook Graph API

### Deployment

* Frontend → Vercel
* Backend → Render

---

##  Note on Facebook Insights API

Due to Facebook’s API restrictions:

* Advanced insights (like impressions, engagement) require **App Review**
* In development mode, these metrics may not be accessible
* For demonstration purposes, this app uses:

  * `fan_count`
  * `followers_count`

 These still effectively showcase analytics functionality without requiring approval.

---

##  Installation & Setup

###  Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
APP_ID=your_facebook_app_id
APP_SECRET=your_facebook_app_secret
REDIRECT_URI=http://localhost:5000/auth/facebook/callback
```

Run backend:

```bash
npm start
```

---

###  Setup Frontend

```bash
cd client
npm install
npm start
```

---

##  Environment Variables

### Backend (.env)

```env
APP_ID=your_facebook_app_id
APP_SECRET=your_facebook_app_secret
REDIRECT_URI=http://localhost:5000/auth/facebook/callback
```

---

##  Application Flow

1. User logs in via Facebook OAuth
2. Backend exchanges code for access token
3. Frontend receives token
4. Fetch user profile
5. Fetch user-managed pages
6. User selects a page
7. Fetch and display analytics

---

##  Future Improvements

* Add charts (Recharts / Chart.js)
* Improve UI with Tailwind CSS
* Enable full insights after App Review
* Add date range filters for analytics

---

##  Why This Project?

This project demonstrates:

* Real-world OAuth integration
* Secure token handling
* Third-party API integration (Facebook Graph API)
* Full-stack development (React + Node)
* Deployment on Vercel & Render

---

##  Author

**Faizan Ahmad**

* Full Stack Developer (MERN)
* Interested in building scalable web applications

---

##  License

This project is for educational and assessment purposes.
