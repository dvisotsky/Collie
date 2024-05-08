'use client'
import React, { useEffect, useState } from 'react'
import { Staff } from '../../types'
import { getStaff } from '../../api/staff'
import { Table } from '@mantine/core'

const StaffPage: React.FC = () => {
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
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {staff.map((s) => (
            <Table.Tr key={s.id}>
              <Table.Td>{s.id}</Table.Td>
              <Table.Td>{s.name}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default StaffPage
