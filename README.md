# DoBu Martial Arts Training Website

A modern, responsive full-stack web application developed for **DoBu Martial Arts**, designed to promote the gym, streamline business operations, and provide an engaging digital experience for members and visitors.

## 📖 Project Overview

The DoBu Martial Arts website is built to establish a professional online presence while supporting the gym's daily operations. The platform provides information about memberships, martial arts classes, instructors, facilities, and enables online booking and payment.

This project is developed as part of a web development assignment using modern web technologies and best development practices.

---

## 🎯 Project Objectives

* Promote the DoBu Martial Arts brand.
* Display membership plans and pricing.
* Provide an interactive class timetable.
* Introduce instructors and their qualifications.
* Showcase gym facilities.
* Enable online bookings and secure payments.
* Manage blog content through an admin dashboard.
* Integrate an AI-powered chatbot.
* Improve customer communication through automated notifications.
* Deliver an accessible, responsive, and secure user experience.

---

## ✨ Features

### Public Website

* Responsive homepage
* Membership plans and pricing
* Martial arts class timetable
* Instructor profiles
* Gym facilities gallery
* Specialist courses
* Blog and news section
* Contact and enquiry form
* AI chatbot
* Online booking system
* Secure PayPal payment integration
* Customer reviews and feedback

### Admin Dashboard

* Secure administrator login
* Manage memberships
* Manage instructors
* Manage timetable
* Manage blog posts
* View customer enquiries
* View bookings
* Send promotional notifications

---

## 🛠 Technology Stack

### Frontend

* React.js
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL
* Prisma ORM

### APIs & Services

* PayPal API
* Email Notification Service
* AI Chatbot Integration

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* Figma
* ClickUp
* Slack
* MS Office

---

## 📁 Project Structure

```text
dobu-martial-arts/
│
├── backend/                  # Node.js + Express Backend
│   ├── prisma/
│   │   ├── schema.prisma     # Database schemas (Mongoose, Sequelize, etc.)
│   ├── src/
│   │   ├── config/           # Database and environment configurations
│   │   ├── controllers/      # Request handlers (business logic)
│   │   ├── middlewares/      # Auth, error handling, validation functions
│   │   ├── routes/           # Express route definitions
│   │   ├── services/         # Helper functions
│   │   ├── utils/            # Helper functions
│   │   └── app.js            # The Express app
│   │   └── server.js         # Entry point for the Express app
│   ├── .env                  # Backend environment variables
│   ├── package.json
│   └── README.md
│
├── frontend/                 # Vite + React Frontend
│   ├── public/               # Static assets (favicons, robots.txt)
│   ├── src/
│   │   ├── assets/           # Images, SVGs, global styles
│   │   ├── components/       # Reusable UI components (Button, Card, Navbar)
│   │   ├── context/          # React Context providers (Auth, Theme)
│   │   ├── hooks/            # Custom React hooks (useAuth, useFetch)
│   │   ├── pages/            # Page/Route components (Home, Dashboard, Login)
│   │   ├── services/         # API client setup (Axios/Fetch instances)
│   │   ├── utils/            # Helper functions/formatters
│   │   ├── App.jsx           # Main App component & routing setup
│   │   └── main.jsx          # Vite entry point (renders App.jsx)
│   ├── .env                  # Frontend environment variables
│   ├── index.html            # Vite HTML template
│   ├── package.json
│   └── vite.config.js        # Vite configuration
│
├── .gitignore                # Root gitignore (ignores node_modules, .env in both folders)
└── README.md                 # Main project instructions
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/AungMinKhant123/dobu-martial-arts-training.git
```

### Navigate into the project

```bash
cd dobu-martial-arts
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=
PAYPAL_CLIENT_ID=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASSWORD=
OPENAI_API_KEY=
```

### Start the development server

```bash
npm run dev
```

---

## 📅 Core Modules

* Home
* About
* Membership
* Pricing
* Timetable
* Courses
* Instructors
* Facilities
* Booking
* Payment
* Blog
* Contact
* AI Chatbot
* Admin Dashboard

---

## 🔒 Security

The application includes:

* User authentication
* Protected admin routes
* Secure password hashing
* Environment variable protection
* Input validation
* SQL injection prevention using Prisma ORM
* Secure payment processing

---

## ♿ Accessibility

The website follows accessibility best practices:

* Responsive design
* Keyboard navigation
* Semantic HTML
* Accessible colour contrast
* Screen-reader friendly components
* Alternative text for images

---

## 📈 Future Improvements

* Member accounts
* Attendance tracking
* Mobile application
* SMS notifications
* Live class availability
* Instructor scheduling
* Analytics dashboard
* Multi-language support

---

## 👨‍💻 Development Workflow

1. Plan UI using Figma
2. Create GitHub repository
3. Develop frontend with React
4. Build backend using Express and Node.js
5. Design database with Prisma and MySQL
6. Integrate APIs
7. Test using Postman
8. Deploy application

---

## 📄 Project Requirements

The website satisfies the following requirements:

* Membership management
* Pricing display
* Interactive timetable
* Staff profiles
* Facility showcase
* Blog management
* AI chatbot
* Online booking
* Secure payment processing
* Automated email notifications
* Customer feedback system
* Administrative dashboard
* Accessibility
* Security
* Performance optimisation

---

## 👥 Authors

Developed for the **DoBu Martial Arts Training** project.

---

## 📜 License

This project is intended for educational purposes only.
