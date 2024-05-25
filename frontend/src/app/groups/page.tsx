'use client'
import { Group as UIGroup, Card, Button } from '@mantine/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Group } from '../../types'

const GroupPage = () => {
  const router = useRouter()

  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8000/groups')
      const data = await response.json()
      console.log('response:', data)
      setGroups(data)
    } catch (error) {
      console.error('Error fetching classes:', error)
    }
  }

  return (
    <div>
      <h1>Groups</h1>
      <Button onClick={() => router.push('groups/create')}>Create Group</Button>
      <UIGroup>
        {groups.map((c, i) => (
          <Link
            href={{
              pathname: `/groups/${c.id}`,
            }}
          >
            <Card
              withBorder
              key={i}
            >
              {c.name}
            </Card>
          </Link>
        ))}
      </UIGroup>
    </div>
  )
}

export default GroupPage
