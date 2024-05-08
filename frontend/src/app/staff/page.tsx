'use client'
import React, { useEffect, useState } from 'react'
import { Staff } from '../../types/staff'
import { getStaff } from '../../api/staff'

const StaffPage: React.FC = () => {
  // Replace this with your staff data
  const staffData = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Assistant' },
    // Add more staff data here
  ]

  const [staff, setStaff] = useState<Staff[]>([])

  const fetchStaff = async () => {
    try {
      const response = await getStaff()
      const { data } = await response
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  return (
    <div>
      <h1>Staff List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StaffPage
