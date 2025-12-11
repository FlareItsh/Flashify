# API Service Usage Guide

## Basic Usage

### 1. Import the API service and endpoints

```typescript
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
```

### 2. Making API Calls

#### GET Request

```typescript
// Simple GET request
const flashcards = await api.get(API_ENDPOINTS.flashcards.list)

// GET request with query parameters
const flashcards = await api.get(API_ENDPOINTS.flashcards.list, {
  page: 1,
  limit: 10,
  search: 'math'
})

// GET single item
const flashcard = await api.get(API_ENDPOINTS.flashcards.get(123))
```

#### POST Request

```typescript
const newFlashcard = await api.post(API_ENDPOINTS.flashcards.create, {
  question: 'What is Vue.js?',
  answer: 'A progressive JavaScript framework'
})
```

#### PUT/PATCH Request

```typescript
const updated = await api.put(API_ENDPOINTS.flashcards.update(123), {
  question: 'Updated question',
  answer: 'Updated answer'
})
```

#### DELETE Request

```typescript
await api.delete(API_ENDPOINTS.flashcards.delete(123))
```

### 3. Authenticated Requests

For endpoints that require authentication:

```typescript
// Login and set token
const response = await api.post(API_ENDPOINTS.auth.login, {
  email: 'user@example.com',
  password: 'password123'
})

// Store the token
api.setAuthToken(response.token)

// Make authenticated request
const profile = await api.authenticatedRequest(API_ENDPOINTS.user.profile, {
  method: 'GET'
})

// Logout and clear token
api.clearAuthToken()
```

### 4. Error Handling

```typescript
try {
  const data = await api.get(API_ENDPOINTS.flashcards.list)
  console.log(data)
} catch (error) {
  console.error('Failed to fetch flashcards:', error)
  // Handle error (show notification, redirect, etc.)
}
```

## Example in Vue Component

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'

interface Flashcard {
  id: number
  question: string
  answer: string
}

const flashcards = ref<Flashcard[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchFlashcards = async () => {
  loading.value = true
  error.value = null

  try {
    flashcards.value = await api.get(API_ENDPOINTS.flashcards.list)
  } catch (err) {
    error.value = 'Failed to load flashcards'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const createFlashcard = async (question: string, answer: string) => {
  try {
    const newCard = await api.post(API_ENDPOINTS.flashcards.create, {
      question,
      answer
    })
    flashcards.value.push(newCard)
  } catch (err) {
    console.error('Failed to create flashcard:', err)
  }
}

onMounted(() => {
  fetchFlashcards()
})
</script>
```

## Configuration

### Development

Edit `.env` file:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Production

Edit `.env.production` file:

```
VITE_API_BASE_URL=https://your-production-api.com
```

### Adding New Endpoints

Edit `src/config/api.ts`:

```typescript
export const API_ENDPOINTS = {
  // Add your new endpoints here
  study: {
    start: '/api/study/start',
    complete: (id: string | number) => `/api/study/${id}/complete`
  }
}
```
