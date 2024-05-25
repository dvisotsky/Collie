'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Group } from '../../../../types'
import { showGroup } from '../../../../api/group'
import { Form, useForm } from '@mantine/form'
import { Button, Select, TextInput } from '@mantine/core'

const GroupSettingsPage = ({ params }: { params: { groupId: number } }) => {
  const router = useRouter()
  const [staff, setStaff] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [group, setGroup] = useState<Group | null>(null)

  const fetchGroup = async () => {
    setLoading(true)
    const response = await showGroup(params.groupId)
    console.log('response:', response.data)
    setGroup(response.data)
    setLoading(false)
  }

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setGroup((group) => ({ ...group, name: event.target.value }))
  }

  const handleStaffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update staff state based on the input value
  }

  const handleMembersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update members state based on the input value
  }

  const handleDeleteGroup = async () => {
    // Logic to delete the group
    if (!group) {
      return
    }
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

  useEffect(() => {
    fetchGroup()
  }, [])

  return (
    <div>
      <h1>Group Settings</h1>
      <form>
        <TextInput
          label='Group Name'
          value={group?.name || ''}
          onChange={handleGroupNameChange}
          required
        />
      </form>
      <h2>Staff</h2>
      <Select
        label='Your favorite library'
        placeholder='Pick value'
        data={['React', 'Angular', 'Vue', 'Svelte']}
        searchable
      />
      <Button>Assign Staff</Button>

      <Button
        color='red'
        onClick={handleDeleteGroup}
      >
        Delete Group
      </Button>
    </div>
  )
}

export default GroupSettingsPage
