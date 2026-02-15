const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  
  return response.json()
}
