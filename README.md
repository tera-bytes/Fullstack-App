# Employee Contact Management System

This project includes the fullstack development of an employee contact management system built using the following:

- REACT 18 and TypeScript for frontend, Context API for state management
- .NET 9.0 with EF Core for backend
- Postgres SQL 17 for the database

## Database
The database script is provided under the db folder. For this project, the database was hosted on pgAdmin. The file `appsettings.json` contains the connection string, where [YOUR_PASSWORD] should be replaced with a real password. The schema consists of employees and companies as two separate tables.

## Backend
The backend is structured into these folders:

**Data/** Uses EF Core for database access and creates DbContext to represent the session.

**Models/** are used to represent the EF entities.

**DTOs/** are used to support different request and response models.

**Controllers/** Implements the API endpoints, including CRUD requests for employees and a get request for companies. 

**Services/** Handles the logic behind each request and error checks. Handles pagination, retrievals, responses. Interacts with EF core queries.

## Frontend
Includes the main UI and interaction with the .NET backend. Uses Vite instead of Create React App, and the base url is stored in .env.local as VITE_API_BASE=http://localhost:5192/api. The port number can be changed to whatever the host of your backend API system is.

**api/** Creates the connection to the http requests.

**Components/** React components for the UI, including the input form, paginated view, company dropdown, and default layout. Included Gravatar as third party API implementation

**context/** Uses ContextAPI for state management. Wraps parts of app to give access to shared states, interacts with context from components, and has crud methods for api calls.

**pages/** Provides paginated view for employees

## How to Run
The frontend and backend must run simultaneously. For this project, VSCode was used. First, in the Backend/EmployeeApi directory, open terminal and execute "dotnet run". Then in Frontend/src directory, open terminal and execute the command "npm run dev" and click on the local host link to interact with the application.
