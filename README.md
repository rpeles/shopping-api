# 🛍️ Shopping Cart API 

## 👩‍💻 Developed by: Rachel Broner

## 🗓️ July 2025

---

## 🔗 Git Repository

> [https://github.com/rpeles/shopping-api]

---

## 🚀 Project Overview

This is a full-stack backend API built with **NestJS** and **Microsoft SQL Server**, implementing a shopping experience that includes:

* ✅ Secure login with JWT token authentication
* ✅ Product catalog with categories
* ✅ Cart functionality (add / update / delete)
* ✅ Modular, clean, scalable architecture

The application reflects modern TypeScript development patterns using DTOs, Guards, Dependency Injection, and database entities with TypeORM.

---

## 🧩 Main Features

| Endpoint       | Method | Description                    | Auth Required |
| -------------- | ------ | ------------------------------ | ------------- |
| `/auth/login`  | POST   | Login with username/password   | ❌             |
| `/categories`  | GET    | Get all categories             | ✅             |
| `/products`    | GET    | Get products by user's cart        | ✅             |
| `/cart/add`    | POST   | Add a product to the cart      | ✅             |
| `/cart/change` | PATCH  | Change quantity of a cart item | ✅             |
| `/cart/remove` | DELETE | Remove item from the cart      | ✅             |

---

## ⚙️ Technologies Used

* **NestJS** (TypeScript)
* **TypeORM** for database access
* **MSSQL** (SQL Server Express)
* **JWT Auth**
* **class-validator** / **class-transformer** for input validation

---

## 📦 Setup Instructions

### 🔧 Prerequisites

* Node.js v18+
* NPM
* SQL Server Express (running on localhost)
* SSMS (for DB browsing)

### 🔑 Configuration

Update `.env` file or `app.module.ts` with:

```
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=yourPassword
DB_NAME=shopping_db
JWT_SECRET=yourSuperSecretKey
```

### 📥 Installation

```bash
git clone https://github.com/your-username/shopping-api
cd shopping-api
npm install
```

### ▶️ Run the Project

```bash
npm run start:dev
```

App will be available at: `http://localhost:3000`

---

## 🧪 Sample User

* Username: `rachel`
* Password: `1234`

Use `/auth/login` to retrieve a JWT token.
Pass it in headers for all protected endpoints:

```
Authorization: Bearer <your_token>
```

---

## 🌱 Database Seed Info

Upon first run, the app inserts:

* 2 Categories (Books, Clothing)
* 3 Products
* 1 User (rachel)
* 2 Cart items

Seed runs only once if the database is empty.

---

## 💬 Notes

* Error handling is done using NestJS's `HttpException` classes.
* Input validation uses DTO classes with decorators.
* Code is structured in modules (user, product, category, cart, auth, seed).
* Postman collection is available in repo.

---

## 📬 Submission

Please refer to the original assignment email for how to submit this file and link.
