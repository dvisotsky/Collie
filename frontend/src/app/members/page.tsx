'use client'
import React, { useEffect, useState } from 'react'
import { Member } from '../../types'
import { getMembers } from '../../api/member'
import { Table } from '@mantine/core'

const MembersPage: React.FC = () => {
  // Replace this with your staff data
  const staffData = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Assistant' },
    // Add more staff data here
  ]

  const [members, setMembers] = useState<Member[]>([])

  const fetchMembers = async () => {
    try {
      const response = await getMembers()
      const { data } = await response
      setMembers(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <div>
      <h1>Member List</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {members.map((member) => (
            <Table.Tr key={member.id}>
              <Table.Td>{member.id}</Table.Td>
              <Table.Td>{member.name}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default MembersPage
