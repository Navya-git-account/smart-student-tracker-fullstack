# Smart Student Tracker

Smart Student Tracker is a full-stack web application designed to help students organize and manage their academic work in one place. Students can manage courses and assignments, track upcoming deadlines, monitor grades, calculate their GPA, and view important academic information through a centralized dashboard. The application provides an organized alternative to keeping assignments, courses, deadlines, and grades in different places. It includes a React frontend, a Java Spring Boot backend, REST APIs, a MySQL database, and student registration and login functionality.

## Features

- Student registration and login
- Personalized student dashboard
- Add, view, edit, and delete courses
- Add, view, edit, and delete assignments
- Track assignment due dates and due times
- Assignment status tracking
- Upcoming deadline display
- Course and grade management
- GPA calculation
- Form validation with user-friendly error messages
- Responsive design for desktop and mobile screens
- Contact page
- REST API integration between the frontend and backend

## Technologies Used

### Frontend

- React
- JavaScript
- HTML
- CSS
- React Router
- Vite
- Lucide React

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- REST APIs
- Maven

### Database

- MySQL

### Development Tools

- Git
- GitHub
- IntelliJ IDEA
- Visual Studio Code
- MySQL Workbench
- Postman

## Project Structure

```text
smart-student-tracker-fullstack/
│
├── backend/
│   └── Spring Boot backend application
│
├── student-tracker-frontend/
│   └── React frontend application
│
└── README.md
```

The frontend handles the user interface and communicates with the backend through REST API requests. The Spring Boot backend processes the requests and uses Spring Data JPA to interact with the MySQL database.

## Installation and Setup

Follow these steps to run Smart Student Tracker locally.

### Prerequisites

Make sure the following software is installed before running the project:

- Java 17
- Node.js
- npm
- MySQL
- Git

## 1. Clone the Repository

Clone the repository to your local computer:

```bash
git clone <https://github.com/Navya-git-account/smart-student-tracker-fullstack>
```

Navigate into the project:

```bash
cd smart-student-tracker-fullstack
```

## 2. Create the MySQL Database

Open MySQL Workbench or another MySQL client and create the application database:

```sql
CREATE DATABASE smart_student_tracker;
```

You can verify that the database was created with:

```sql
SHOW DATABASES;
```

## 3. Configure Database Environment Variables

The backend uses environment variables for the database connection.

Create the following environment variables on your computer:

```text
DB_URL=jdbc:mysql://localhost:3306/smart_student_tracker
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

Replace `your_mysql_username` and `your_mysql_password` with your own MySQL credentials.

The backend `application.properties` uses these environment variables:

```properties
spring.application.name=student-tracker

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Do not store your actual database password in the GitHub repository.

## 4. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

On Windows, start the Spring Boot application with:

```bash
.\mvnw.cmd spring-boot:run
```

The backend will run at:

```text
http://localhost:8080
```

The application provides REST API endpoints such as:

```text
/api/assignments
/api/courses
/api/auth/register
/api/auth/login
```

## 5. Run the Frontend

Open a second terminal.

From the root project directory, navigate to the frontend:

```bash
cd student-tracker-frontend
```

Install the required dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Open this address in your browser to use the application.

## API Communication

The React frontend communicates with the Spring Boot backend through REST API requests.

During local development, Vite proxies `/api` requests to the Spring Boot server running on port `8080`.

Example configuration:

```javascript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true
    }
  }
}
```

This allows the frontend to make requests such as:

```text
/api/assignments
/api/courses
/api/auth/login
```

without hardcoding the backend URL throughout the frontend application.

## Main Application Features

### Assignment Management

Students can create and manage assignments from the application.

Assignment information includes:

- Assignment title
- Course
- Due date
- Due time
- Description
- Status

Students can:

- Add assignments
- View assignments
- Edit assignments
- Delete assignments
- Track assignment status
- View upcoming deadlines

The application also validates assignment information before it is submitted.

### Course Management

Students can manage their courses through the Courses section.

Course information includes:

- Course code
- Course name
- Instructor
- Credit hours
- Grade

Students can:

- Add courses
- View courses
- Edit courses
- Delete courses

Form validation is used to make sure required course information is entered correctly.

### GPA Calculator

The application provides GPA information using course grades and credit hours.

The GPA calculation uses the grade associated with each course together with the number of credit hours for that course.

### Dashboard

The dashboard provides students with a centralized view of their academic information.

It displays information such as:

- Courses
- Assignments
- Upcoming deadlines
- Assignment status
- Academic progress information

Assignments are visually categorized based on their deadline status, such as upcoming, due soon, or overdue.

### Student Registration and Login

Students can create an account and log in to the application.

The authentication functionality includes:

- Student registration
- Student login
- Password hashing using BCrypt
- Session-based login handling
- Logout functionality

Student information is stored in the MySQL database.

## Form Validation

The application validates user input before submitting forms.

Examples include:

- Assignment title is required
- Assignment description is required
- Assignment due date is required
- Assignment due date cannot be in the past
- Course code is required
- Course name is required
- Course credits must be at least 1

Validation messages are displayed directly in the user interface instead of using browser alerts.

## Responsive Design

The application is designed to work across different screen sizes.

The interface uses:

- CSS Grid
- Flexbox
- Media queries
- Responsive navigation
- Mobile-friendly dashboard layouts

The design uses a simple color scheme with a blue primary accent and visual indicators for assignment status.

## Wireframes

Wireframes were created during the planning stage to define the layout and organization of the application.

The wireframes include designs for areas such as:

- Dashboard
- Assignments
- Courses
- GPA Calculator
- Contact page
- Navigation

Add the wireframe image to the repository and replace the path below with the actual image location.

```markdown
https://miro.com/app/board/uXjVHxTSTFI=/
```

## ER Diagram

The ER diagram represents the database structure and relationships used by Smart Student Tracker.

The main application entities include:

- Student
- Course
- Assignment

The planned relationships allow student accounts to be connected with their courses and assignments.

Add the ER diagram image to the repository and replace the path below with the actual image location.

```markdown
https://miro.com/app/board/uXjVHxReJno=/?share_link_id=323060616504
```

## Future Features and Unsolved Problems

Smart Student Tracker is an ongoing project, and several features can be expanded in future development.

### Personalized Student Data

Course and assignment data can be further connected to individual student accounts so that each logged-in student sees only their own academic information.

### Protected Routes and APIs

Authentication and authorization can be expanded to provide stronger protection for student-specific frontend routes and backend API endpoints.

### Deadline Notifications

The notification system can be expanded to provide more advanced reminders for assignments that are approaching their due dates.

### Academic Progress Visualization

Additional charts and visualizations can be added to help students understand their academic progress, GPA, and course performance.

### Automated Testing

Additional frontend and backend automated tests can be added to improve application reliability and make future changes easier to verify.

### Production Deployment

The application can be prepared for production deployment with production-level security configuration, environment configuration, database hosting, and frontend/backend deployment.

## Development Workflow

Git and GitHub are used for version control throughout the project.

Development work is completed using feature branches instead of directly developing on the `main` branch. Changes are reviewed and merged through pull requests.

Examples of feature areas include:

- Assignment management
- Course management
- Student authentication
- Dashboard improvements
- Responsive design
- Code quality improvements

This workflow helps keep development organized and makes changes easier to review before they are added to the main application.