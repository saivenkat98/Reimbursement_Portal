# 🧾 University Reimbursement Web App

A full-stack web application for university employees to submit and manage reimbursement receipts.

**Built With:**
- 🔧 [.NET 8 Web API (C#)] – backend  
- 🎨 [Angular 17 + Bootstrap] – frontend  
- 💾 [MySQL] – database  
- 📎 File Upload support for PDF, JPG, PNG  

---

## 📂 Project Structure

```
.
├── Backend/                # .NET 8 Web API backend
└── Frontend/               # Angular frontend (ng CLI)
```

---

## 🚀 Features

- Employees can submit:
  - Date, Amount, Description
  - Upload receipt (PDF/JPG/PNG)
- Server stores file + details in MySQL
- Receipt path stored as relative URL
- Validations on frontend + backend
- Clean UI styled like University of Iowa 💛🖤

---

## ✅ Prerequisites

### For Backend:
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)  
- [MySQL 8.x](https://dev.mysql.com/downloads/mysql/)  
- [Postman](https://postman.com) *(optional for testing API)*  

### For Frontend:
- [Node.js](https://nodejs.org/) *(v18+ recommended)*  
- [Angular CLI](https://angular.io/cli)  

---

## ⚙️ Backend Setup (.NET + MySQL)

### 1. Go to the backend folder:
```bash
cd Backend
```

### 2. Update DB Credentials

Edit `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;port=3306;database=reimbursement_db;user=root;password=your_password"
}
```

### 3. Create MySQL Database & Table

```sql
CREATE DATABASE reimbursement_db;

USE reimbursement_db;

CREATE TABLE Reimbursements (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Date DATE NOT NULL,
  Amount DECIMAL(10,2) NOT NULL,
  Description TEXT NOT NULL,
  ReceiptPath VARCHAR(255) NOT NULL,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Run the API

```bash
dotnet restore
dotnet build
dotnet run
```

Visit Swagger at:  
`https://localhost:5191/swagger`

API POST endpoint:
```
POST /api/reimbursements
```

---

## 🎨 Frontend Setup (Angular)

### 1. Go to frontend folder
```bash
cd Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the frontend
```bash
ng serve
```

Visit: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Testing

### Submit Form:
- Fill date, amount, description
- Upload a PDF/JPG/PNG (max 5MB)
- Click Submit ✅

---

## 📁 Public & UIowa Branding

> Utilized the Original University of Iowa logo at for demo purposes.:  
`public/Iowa_logo.png`

---

## 🧹 Cleanup (Optional)

- Add `.gitignore` for `node_modules`, `bin/`, `obj/`, etc.  
- Use `.env` or `appsettings.Development.json` to hide secrets in production

---

## 🧑‍💻 Author

Built by **Sai Venkat Kumar Rapol** as part of a take-home assignment.  
Backend: C# + .NET 8 | Frontend: Angular 17 | DB: MySQL
