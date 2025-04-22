#!/bin/bash

# Thai PBS Director Deployment Script

# Exit on error
set -e

echo "=== Starting deployment process ==="

# Pull latest changes from repository
echo "Pulling latest changes..."
git pull

# Install dependencies
echo "Installing dependencies..."
npm run install:all

# Build client and server
echo "Building client and server..."
npm run build

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing PM2 globally..."
    npm install -g pm2
fi

# Stop existing process if it exists
if pm2 list | grep -q "thai-pbs-director"; then
    echo "Stopping existing process..."
    pm2 stop thai-pbs-director
    pm2 delete thai-pbs-director
fi

# Start the server with PM2
echo "Starting server with PM2..."
cd server
pm2 start dist/index.js --name "thai-pbs-director"
cd ..

echo "=== Deployment completed successfully ==="
echo "Your application is now running with PM2"
echo "To check status: pm2 status"
echo "To view logs: pm2 logs thai-pbs-director" 