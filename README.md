# Mitek Verification Window Application

A web application that launches a verification window for Mitek identity verification.

## Features

- Launches verification in a separate popup window
- Handles Mitek API integration
- Responsive design
- Secure API communication

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

## Deployment

This application is configured for deployment on Railway.app.

### Railway Deployment Steps

1. Create a new project on Railway.app
2. Connect your GitHub repository
3. Railway will automatically detect the Node.js application
4. Deploy the application

The application will be available at the URL provided by Railway.

## Environment Variables

No environment variables are required for basic functionality. The application uses hardcoded credentials for the Mitek API.

## Security Note

In a production environment, it's recommended to:
1. Move API credentials to environment variables
2. Implement proper authentication
3. Use HTTPS
4. Implement rate limiting
5. Add proper error logging 