#!/bin/bash

# WardayaHub - Strapi CMS Setup Script
# This script helps with the initial Strapi setup

set -e

echo "🚀 WardayaHub - Strapi CMS Setup"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "/home/fawwazmw/Documents/wardayadev" ]; then
    echo "❌ Error: Parent directory not found"
    exit 1
fi

cd /home/fawwazmw/Documents/wardayadev

# Check if wardayahub-cms already exists
if [ -d "wardayahub-cms" ]; then
    echo "⚠️  wardayahub-cms directory already exists"
    read -p "Do you want to remove it and start fresh? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Removing existing wardayahub-cms..."
        rm -rf wardayahub-cms
    else
        echo "❌ Setup cancelled"
        exit 1
    fi
fi

echo "📦 Creating Strapi project..."
echo ""
echo "⚠️  IMPORTANT: When prompted:"
echo "   - Choose 'Quickstart (recommended)'"
echo "   - Skip cloud login (select 'Skip')"
echo "   - Let it install dependencies"
echo ""
read -p "Press Enter to continue..."

# Try to create Strapi project
npx create-strapi-app@latest wardayahub-cms --quickstart --skip-cloud || {
    echo ""
    echo "❌ Automated installation failed due to interactive prompts"
    echo ""
    echo "📖 Please follow the manual steps in STRAPI_SETUP_GUIDE.md"
    echo ""
    echo "Quick start:"
    echo "  cd /home/fawwazmw/Documents/wardayadev"
    echo "  npx create-strapi-app@latest wardayahub-cms"
    echo "  (then follow the prompts)"
    exit 1
}

echo ""
echo "✅ Strapi project created successfully!"
echo ""
echo "📝 Next steps:"
echo "  1. cd wardayahub-cms"
echo "  2. npm run develop"
echo "  3. Open http://localhost:1337/admin"
echo "  4. Follow STRAPI_SETUP_GUIDE.md for content type setup"
echo ""
