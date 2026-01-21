# TravelNest

A full-stack home rental web application enabling travelers to discover and book unique accommodations while allowing hosts to list and manage properties.

**Live Demo**: https://travelnest-mone.onrender.com/

## Overview

TravelNest bridges the gap between travelers seeking reliable accommodations and property owners looking to monetize unused living space through a centralized, user-friendly platform.

## Features

- **Property Listings**: Browse accommodations with images and detailed descriptions
- **Cloud Image Storage**: Cloudinary integration for image hosting and optimization
- **Responsive Design**: Optimized for desktop and mobile devices
- **MVC Architecture**: Clean separation of concerns with scalable structure
- **Secure Data Persistence**: MongoDB and Mongoose for reliable storage
- **RESTful Routing**: Intuitive API design following REST principles

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: EJS (templating), Tailwind CSS
- **Cloud & Tools**: Cloudinary (image hosting), Render (deployment)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account

### Installation

```bash
git clone https://github.com/dchaudhary27/TravelNest.git
cd TravelNest
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

### Running the Application

```bash
npm start
```

The app will be available at `http://localhost:3000`

## Future Improvements

- Booking and payment integration
- Advanced search and filtering
- Automated testing and CI/CD pipeline

## Author

Dhaval Chaudhari
Aspiring Full-Stack Developer
GitHub: https://github.com/dchaudhary27

## License

This project is licensed for learning and portfolio purposes.
