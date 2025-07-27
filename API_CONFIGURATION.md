# API Configuration Guide

## Overview
This project uses a centralized API configuration to manage endpoints. This makes it easy to change domains without updating multiple files.

## Configuration

### 1. Environment Variables
Create a `.env.local` file in your project root:

```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:3000

# Production (replace with your domain)
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### 2. API Configuration File
The main configuration is in `src/app/config/api.ts`:

```typescript
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    VALUES: '/values/values.json',
    IMAGES: '/images/me.jpg'
  }
};
```

## Usage

### In Components
```typescript
import { getApiUrl } from '../config/api';

// Fetch data
fetch(getApiUrl('/values/values.json'))
  .then(res => res.json())
  .then(data => console.log(data));
```

## Deployment Options

### Option 1: Same Domain
If your API is on the same domain as your frontend:
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### Option 2: Subdomain
If your API is on a subdomain:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Option 3: Different Domain
If your API is on a completely different domain:
```env
NEXT_PUBLIC_API_URL=https://api-service.com
```

## Benefits

1. **Single Source of Truth**: All API URLs are managed in one place
2. **Environment Flexibility**: Easy to switch between dev/staging/production
3. **No Hardcoded URLs**: No more scattered localhost references
4. **Easy Migration**: Change domain once, updates everywhere

## Migration Steps

1. Update your `.env.local` file with the new domain
2. Deploy your API to the new domain
3. Update your frontend environment variables
4. Deploy your frontend

That's it! No code changes needed. 