'use client'
import { Button } from '@mantine/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Group } from '../../../types/group'

const GroupPage: React.FC = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const groupId = searchParams.get('id')
  const groupName = decodeURIComponent(pathName.split('/').pop() || '')

  const [group, setGroup] = useState<Group | null>(null)

  const fetchGroup = async () => {
    try {
      const response = await fetch(`http://localhost:8000/groups/${groupId}`)
      const data = await response.json()
      setGroup(data)
    } catch (error) {
      console.error('Error fetching group:', error)
    }
  }

  const deleteGroup = async () => {
    try {
      const response = await fetch(`http://localhost:8000/groups/${groupId}`, {
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
      <h1>{groupName}</h1>
      <Button onClick={deleteGroup}>Delete</Button>
      {/* Add your content here */}
    </div>
  )
}

export default GroupPage
