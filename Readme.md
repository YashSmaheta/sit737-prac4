# Calculator Microservice

This project is a simple microservice built using **Node.js** and **Express.js** that provides basic arithmetic operations (addition, subtraction, multiplication, and division) via a REST API. The service also includes error handling and logging using **Winston**.

---

## 📌 Features

✅ Perform basic arithmetic operations (Addition, Subtraction, Multiplication, Division)  
✅ REST API with query parameters for easy access  
✅ **Error Handling** – Ensures valid numerical inputs and prevents division by zero  
✅ **Logging with Winston** – Tracks API requests and errors  
✅ **Frontend HTML Page** – Allows users to input numbers and perform operations  

---

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

Ensure **Node.js** is installed. Then, run:

```sh
npm install express winston
```

Start the server
```sh
node index.js
```
App is accesible from 
```sh
localhost:3000 
```

🔴 Error Handling:

-> Invalid inputs return a 400 Bad Request response.

->Division by zero is not allowed.
