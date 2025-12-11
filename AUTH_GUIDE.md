# Authentication Setup Guide

## Overview

Your Login and Signup forms are now fully integrated with the backend API using Axios.

## What Changed

### 1. **API Service** (`src/services/api.ts`)

- Migrated from `fetch` to **Axios**
- Added automatic request/response interceptors
- Automatic JWT token management
- Better error handling

### 2. **Login Form** (`src/pages/auth/Login.vue`)

- Sends POST request to `/api/auth/login`
- Payload: `{ login: string, password: string }`
- Stores JWT token automatically
- Redirects to dashboard on success
- Shows API error messages

### 3. **Signup Form** (`src/pages/auth/Signup.vue`)

- Sends POST request to `/api/auth/signup`
- Payload: `{ name: string, email: string, password: string, password_confirmation: string }`
- Stores JWT token automatically
- Redirects to dashboard on success
- Shows API error messages

## Expected Backend Response Format

### Login Response

```json
{
  "token": "your-jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Signup Response

```json
{
  "token": "your-jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response

```json
{
  "message": "Invalid credentials"
}
```

## Features

✅ **Loading States**: Buttons show "Logging in..." / "Signing up..." during API calls
✅ **Error Handling**: Displays API error messages to users
✅ **Form Validation**: Client-side validation before API call
✅ **Auto Token Management**: JWT tokens automatically stored and sent with requests
✅ **Automatic Auth Headers**: All authenticated requests include `Authorization: Bearer {token}`

## Using Protected Routes

For any component that needs authentication:

```typescript
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

// The token is automatically included in requests
const getUserProfile = async () => {
  try {
    const profile = await api.get(API_ENDPOINTS.user.profile)
    return profile
  } catch (error) {
    // Handle unauthorized (token expired, etc.)
    console.error(error)
  }
}
```

## Logout

To implement logout:

```typescript
import api from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  try {
    // Optional: call logout endpoint
    await api.post(API_ENDPOINTS.auth.logout)
  } catch (error) {
    console.error(error)
  } finally {
    // Clear token and redirect
    api.clearAuthToken()
    await router.push('/login')
  }
}
```

## Testing Locally

1. Make sure your backend is running at `http://127.0.0.1:8000`
2. Ensure your backend has the following endpoints:
   - `POST /api/auth/login`
   - `POST /api/auth/signup`
3. Start your frontend: `npm run dev`
4. Try logging in or signing up

## Production Deployment

Update `.env.production`:

```env
VITE_API_BASE_URL=https://your-production-api.com
```

Build for production:

```bash
npm run build
```

The API URL will automatically switch to your production backend.
