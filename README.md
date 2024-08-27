# Map App

訪れたい観光地などを地図から検索し、DB管理するアプリ


## Features

1. React Leafletを使用した地図表示。
2. 地図をダブルクリックしてクリック付近の観光地を検索して表示。
3. 訪れたい観光地をDB登録。

## Tech Stack

- Frontend: React
- Backend: FastAPI
- Database: MySQL
- Web Server: Nginx (no setup)

## Development Setup

1. Clone the repository:
  ```
  git clone https://github.com/yourusername/map-app.git
  cd map-app
  ```

2. Install Docker and Docker Compose if you haven't already.

3. Build and run the Docker containers:
  ```
  docker-compose up --build
  ```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Development Workflow

1. Frontend (React):
- Make changes in the `frontend/src` directory.
- The development server will automatically reload with your changes.

2. Backend (FastAPI):
- Make changes in the `backend/app` directory.
- The development server will automatically reload with your changes.

3. Database (MySQL):
- Connect to the database using a MySQL client:
  ```
  mysql -h localhost -P 3306 -u root -p
  ```
- The password is set in the `docker-compose.yml` file.

## Building React App
1. Build the React app:
  ```
  cd frontend
  npm run build
  ```

2. The built files will be in the `frontend/build` directory.


## Deploying React App
1. Update the `docker-compose.yml` file with production settings:
- Remove volume mounts for development
- Update environment variables as needed

2. Build and run the Docker containers in production mode:
  ```
  docker-compose -f docker-compose.prod.yml up --build -d
  ```
