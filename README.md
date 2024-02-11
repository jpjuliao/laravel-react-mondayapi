# Laravel / React / Monday API integration

This project demonstrates the integration of a Laravel backend with a React frontend for managing issues using the Monday.com API.

## Features

- Fetches boards and items from Monday.com using GraphQL queries.
- Creates new issues on Monday.com boards.
- Updates and deletes existing issues on Monday.com boards.

## Setup Instructions

### Laravel Backend

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the Laravel project directory: `cd laravel-backend`
3. Install PHP dependencies: `composer install`
4. Copy the `.env.example` file to `.env`: `cp .env.example .env`
5. Configure the `.env` file with your Monday.com API credentials and other settings.
6. Generate an application key: `php artisan key:generate`
7. Serve the application: `php artisan serve`

### React Frontend

1. Navigate to the React project directory: `cd react-frontend`
2. Install Node.js dependencies: `npm install`
3. Copy the `.env.example` file to `.env`: `cp .env.example .env`
4. Configure the `.env` file with your backend server URL.
5. Install TypeScript and Bootstrap: `npm install --save typescript bootstrap @types/react-bootstrap`
6. Start the development server: `npm start`

## How They Interact

- The React frontend communicates with the Laravel backend through HTTP requests.
- The Laravel backend exposes API endpoints for fetching boards and items, creating, updating, and deleting issues on Monday.com.
- React components make requests to these API endpoints to perform CRUD operations on Monday.com data.
- GraphQL queries are used to fetch data from Monday.com efficiently.

## Technologies Used

### Laravel Backend

- PHP
- Laravel Framework
- Monday.com API

### React Frontend

- JavaScript (TypeScript)
- React
- Axios (for HTTP requests)
- Bootstrap (for styling)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
