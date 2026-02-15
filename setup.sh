#!/bin/bash

echo "🚀 Setting up Helvino Technologies Platform..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Please ensure you have access to a PostgreSQL database."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials and other settings"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database URL and credentials"
echo "2. Run 'npm run db:push' to create database tables"
echo "3. Create admin user in database (see README.md)"
echo "4. Run 'npm run dev' to start development server"
echo ""
echo "Visit http://localhost:3000 to see your site!"
echo "Visit http://localhost:3000/admin to access admin dashboard"
echo ""
