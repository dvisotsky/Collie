'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Group } from '../../../../types'

const GroupSettingsPage = ({ group }: { group: Group }) => {
  const router = useRouter()
  const [groupName, setGroupName] = useState('')
  const [staff, setStaff] = useState([])
  const [members, setMembers] = useState([])

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value)
  }

  const handleStaffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update staff state based on the input value
  }

  const handleMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update members state based on the input value
  }

  const handleDeleteGroup = async () => {
    // Logic to delete the group
    try {
      const response = await fetch(`http://localhost:8000/groups/${group.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        console.log('Group deleted')
        router.push('/groups')
      } else {
        console.error('Error deleting group')
      }
    } catch (error) {
      console.error('Error deleting group:', error)
    }
  }

  return (
    <div>
      <h1>Group Settings</h1>

      <label htmlFor='groupName'>Group Name:</label>
      <input
        type='text'
        id='groupName'
        value={groupName}
        onChange={handleGroupNameChange}
      />

      <label htmlFor='staff'>Staff:</label>
      <input
        type='text'
        id='staff'
        value={staff}
        onChange={handleStaffChange}
      />

      <label htmlFor='members'>Members:</label>
      <input
        type='text'
        id='members'
        value={members}
        onChange={handleMembersChange}
      />

      <button onClick={handleDeleteGroup}>Delete Group</button>
    </div>
  )
}

export default GroupSettingsPage
