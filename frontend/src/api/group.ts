import { apiResponse } from './types'

export const getGroups = async (): Promise<apiResponse> => {
  try {
    const response = await fetch('http://localhost:8000/groups')
    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error fetching classes:', error)
    return { data: null, error }
  }
}

export const postGroup = async (values: {
  name: string
}): Promise<apiResponse> => {
  try {
    const response = await fetch('http://localhost:8000/groups/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, members: [] }),
    })
    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error creating group:', error)
    return { data: null, error }
  }
}
