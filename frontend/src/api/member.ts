import { apiResponse } from './types'

export const getMembers = async (): Promise<apiResponse> => {
  try {
    const response = await fetch('http://localhost:8000/members')
    const data = await response.json()
    return { data }
  } catch (error) {
    console.error('Error fetching classes:', error)
    return { data: null, error }
  }
}
