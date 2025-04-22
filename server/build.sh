#!/bin/bash

# Build script for Thai PBS Director Server

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
npm install

# Build TypeScript
echo "Building TypeScript..."
npm run build

echo "Build completed successfully!" 