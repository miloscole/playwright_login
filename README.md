# PlaywrightLogin

This project demonstrates a simple login functionality using Ruby on Rails app and Playwright for automated testing.

## System Requirements

Make sure you have the following installed on your system:

- **Ruby**: v3.2.0
- **Bundler**: Run gem install bundler if not already installed.
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

## Installation

1. Clone the project:

   ```bash
   git clone https://github.com/miloscole/playwright_login.git
   ```

2. Navigate to the Rails project directory and instal Ruby and Rails dependencies:

   ```bash
   bundle install
   ```

3. Navigate to the Playwright project directory and instal Node.js dependencies:

   ```bash
   npm install
   ```

4. Running the Tests:

   ```bash
   npm run e2e
   ```

## About the Project

Rails Application: A basic demo login application using rails g authentication.

Playwright Tests: Automated tests for validating login and logout functionality.

The test setup automatically resets the database, starts the Rails server, and executes the Playwright tests.
