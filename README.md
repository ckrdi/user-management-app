# MEVN Fullstack Take Home Assignment

A full-stack web application built with NestJS (Node.js + TypeScript) and React 18 (Vite + TypeScript) that demonstrates JWT authentication, user management, and clean architectural patterns—now backed by PostgreSQL via Prisma ORM.

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, React-Router, Axios, TailwindCSS      |
| Backend   | NestJS 10, PostgreSQL, Prisma ORM, Passport-JWT |

---

## Project Structure
```sh
user-management-app/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── auth/
│   │   ├── prisma/
│   │   ├── users/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   ├── .prettierrc
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── router/
│   │   ├── services/
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

---

## Authentication Endpoints

| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| POST   | `/api/auth/login`  | Login with email & password |
| GET    | `/api/auth/me`     | Returns logged-in user info |

**Token Format**: Bearer Token (JWT) stored in `localStorage`

**Example Request:**

```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password"
}
=>
{
  "token": "jwt.token.here",
  "user": {
    "id": "...abc",
    "name": "Admin",
    "email": "admin@example.com",
    "status": "Active"
  }
}
```

```json
GET /api/auth/me
{
  "user": {
    "id": "...abc",
    "name": "Admin",
    "email": "admin@example.com",
    "status": "Active"
  }
}
```

---

## User Management Endpoints

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| GET    | `/api/users`       | Get all users          |
| GET    | `/api/users/:id`   | Get user by ID         |
| POST   | `/api/users`       | Create new user        |
| PUT    | `/api/users/:id`   | Update user by ID      |
| DELETE | `/api/users/:id`   | Delete user by ID      |

**Token Format**: Bearer Token (JWT) stored in `localStorage`

**Example Request:**

```json
GET /api/users
[
  {
    "id": "abc",
    "name": "User 1",
    "email": "user1@example.com",
    "status": "Active"
  },
  {
    "id": "def",
    "name": "User 2",
    "email": "user2@example.com",
    "status": "Active"
  },
]
```

```json
GET /api/users/abc
{
  "id": "abc",
  "name": "User 1",
  "email": "user1@example.com",
  "status": "Active"
}
```

```json
POST /api/users
{
  "name": "User 3",
  "email": "user3@example.com",
  "status": "Active",
  "password": "password"
}
=>
{
  "_id": "ghi",
  "name": "User 3",
  "email": "user3@example.com",
  "status": "Active"
}
```

```json
PUT /api/users/ghi
{
  "name": "User 5",
  "email": "user5@example.com",
  "status": "Not Active"
}
=>
{
  "_id": "ghi",
  "name": "User 5",
  "email": "user5@example.com",
  "status": "Not Active"
}
```

```json
DELETE /api/users/ghi
{
    "message": "User has been deleted"
}
```

---

## Frontend Pages

| Route        | View               | Purpose                              |
|--------------|--------------------|--------------------------------------|
| `/login`     | LoginPage.tsx      | Login screen                         |
| `/`          | DashboardPage.tsx  | Total users summary                  |
| `/users`     | UserListPage.tsx   | User list                            |
| `/users/add` | UserAddPage.tsx    | User create form                     |
| `/users/:id` | UserEditPage.tsx   | User edit form                       |

---

## Features

- JWT-based Authentication
- PostgreSQL Data Persistence
- Prisma ORM (type-safe database queries)
- Responsive UI with Tailwind CSS
- Fully documented API & modular codebase

---

## Getting Started

### 1. Clone the repo
```sh
git clone https://github.com/ckrdi/user-management-app.git
```

### 2. Change directory to backend
```sh
cd backend
```

### 3. Create new .env file
```sh
DATABASE_URL=""
FRONTEND_URL=""
JWT_SECRET=""
JWT_EXPIRES_IN=""
PORT=3000
```

### 4. Run the backend
```sh
npm i
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

### 5. Open new terminal, change directory to frontend
```sh
cd frontend
```

### 6. Create new .env file
```sh
VITE_API_URL=""
```

### 7. Run the frontend
```sh
npm i
npm run dev
```


---

## Example Admin User

| Field     | Value              |
|-----------|--------------------|
| Email     | admin@example.com  |
| Password  | password           |
