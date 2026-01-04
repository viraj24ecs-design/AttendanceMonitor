#!/bin/bash

echo "🚀 Starting Attendance Monitoring System..."
echo ""

# Check if MongoDB is running (macOS)
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Starting MongoDB..."
    brew services start mongodb-community 2>/dev/null || echo "Please start MongoDB manually: 'mongod' or 'brew services start mongodb-community'"
    sleep 2
fi

# Start backend in background
echo "📦 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend Server..."
cd frontend
npm start

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup INT TERM

# Wait for user to stop the script
wait
