# Node.js MySQL JWT Project Setup

A basic Node.js project setup with MySQL database and JWT authentication.

## Prerequisites

- Node.js
- MySQL
- npm (Node Package Manager)

## Quick Start

1. **Clone the Project**
```bash
git clone https://github.com/Udayanzoysa/envision-back.git 
cd envision-back
```

2. **Install Dependencies**
```bash
npm install
npm install nodemon --save-dev
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
# MySQL database Config
PORT=5000
DB_HOST=localhost
DB_USER=<your_username>
DB_PASSWORD=<your_password>
DB_NAME=envision_blog

# JWT
JWT_SECRET=blog@envision
NODE_ENV=dev
```

4. **Database Setup**
```sql
CREATE DATABASE envision_blog;
```

5. **Start the Server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Basic API Routes

- `POST /api/auth/login` - Register new user
- `POST /api/auth/register` - User login
- `GET /api/blog/trip/all` - Get trip detail
- `GET /api/blog/expences/all` - Get trip detail
- `GET /api/blog/trip/:slug` - Get trip by slug (Protected)

## JWT Usage

Include token in API requests:
```
Authorization: Bearer <your_jwt_token>
```
