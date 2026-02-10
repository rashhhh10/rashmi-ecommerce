# Rashmi E-commerce

A full-stack e-commerce application built with Spring Boot and React.

## Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL
- Maven

## Local Setup

### Backend
1. Navigate to `backend/`.
2. Configure `src/main/resources/application.properties` with your PostgreSQL credentials.
3. Run: `mvn spring-boot:run`

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`
3. Run: `npm run dev`

## Deployment

### 1. Push to GitHub
Create a new repository on GitHub and push this code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin master
```

### 2. Deploy Backend (Render)
1. Create a **Web Service** on Render connected to your repo.
2. **Runtime**: Docker
3. **Environment Variables**:
   - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<host>:<port>/<db_name>` (Use Render's internal DB URL)
   - `SPRING_DATASOURCE_USERNAME`: `<db_user>`
   - `SPRING_DATASOURCE_PASSWORD`: `<db_password>`
   - `RASHMI_APP_JWTSECRET`: (Generate a long random string)
   - `RASHMI_APP_JWTEXPIRATIONMS`: `86400000`

### 3. Deploy Frontend (Vercel)
1. Import the repository in Vercel.
2. Set **Root Directory** to `frontend`.
3. Set **Environment Variable**:
   - `VITE_API_URL`: Your Render Backend URL (e.g., `https://rashmi-ecommerce.onrender.com/api`)
4. Deploy!
