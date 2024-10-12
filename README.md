# Weather Dashboard

A web application that allows users to search for the current and 5-day weather forecast for various cities. The application retrieves weather data from the OpenWeather API and displays it in a user-friendly interface. Users can view the current weather, search history, and perform specific actions related to weather data.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available API Routes](#available-api-routes)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Description

The Weather Dashboard is a full-stack web application that allows travelers and users to view the weather outlook for multiple cities, helping them plan trips accordingly. The app displays both current weather conditions and a 5-day forecast. The backend is built using Node.js, Express, and PostgreSQL for storing search history. Weather data is retrieved from the OpenWeather API.

## Features

- **Search for Weather**: Users can search for the weather of any city, and the app will display the current and 5-day forecast.
- **Search History**: The app stores the searched cities, which can be accessed later.
- **View Current and Future Conditions**: Displays the temperature, wind speed, humidity, and weather icon for both current and forecasted conditions.
- **Bonus**: Option to delete cities from the search history.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/weather-dashboard.git
    ```

2. Navigate to the project directory:

    ```bash
    cd weather-dashboard
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Set up the environment variables for the OpenWeather API key and PostgreSQL database by creating a `.env` file:

    ```bash
    OPENWEATHER_API_KEY=your_api_key
    DB_HOST=your_host
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_database
    ```

5. Start the application:

    ```bash
    npm start
    ```

## Usage

To use the application, follow these steps:

1. Enter the name of a city in the search box and submit.
2. The app will display the current weather conditions, including temperature, humidity, wind speed, and an icon representing the weather.
3. View the 5-day forecast for the city.
4. Click on a city in the search history to see its weather again.
5. Optionally, delete cities from the search history.

## Available API Routes

- **GET `/api/weather/history`**: Retrieve the search history of previously searched cities.
- **POST `/api/weather`**: Save a new city to the search history and return the weather data for that city.
- **DELETE `/api/weather/history/:id`**: Remove a city from the search history.

## Technologies Used

- **Node.js**: For running the server and back-end logic.
- **Express.js**: As the back-end framework to build the API routes.
- **PostgreSQL**: For storing and managing the search history.
- **OpenWeather API**: To retrieve weather data for cities.
- **Insomnia**: For testing API routes.
- **pgAdmin 4**: For managing the PostgreSQL database.

## Project Structure
- **`client`**: Contains the front-end files (HTML, CSS, JavaScript).
- **`server`**: Includes back-end routes, services, and database interactions.
- **`src/routes`**: Handles API and HTML routes.
- **`src/service`**: Contains the logic for interacting with the OpenWeather API and database.
- **`public`**: Contains static assets such as images or icons.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request to the main branch.

## License

This project is licensed under the MIT License.