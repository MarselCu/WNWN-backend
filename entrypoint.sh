#!/bin/sh

echo "🔧 Running Prisma generate..."
npx prisma generate

echo "🛠️ Running Prisma migrate deploy..."
npx prisma migrate deploy

# Optional seed
# echo "🌱 Running seed..."
# npx prisma db seed

echo "🚀 Starting app..."
exec npm run dev
