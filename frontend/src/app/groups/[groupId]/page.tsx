'use client'
import React, { useEffect, useState } from 'react'
import { Group } from '../../../types'
import Link from 'next/link'
import { Button, Flex, Skeleton } from '@mantine/core'
import { usePathname, useSearchParams } from 'next/navigation'
import { showGroup } from '../../../api/group'

const GroupPage = ({ params }: { params: { groupId: number } }) => {
  const [group, setGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchGroup = async () => {
    setLoading(true)
    const response = await showGroup(params.groupId)
    setGroup(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchGroup()
  }, [])

  return (
    <div>
      <Skeleton visible={loading}>
        <Flex
          align={'center'}
          justify={'space-between'}
          style={{ padding: '8px 16px' }}
        >
          <h1 style={{ padding: 0, margin: 0 }}>{group?.name}</h1>
          {group && (
            <Link href={`${group.id}/manage`}>
              <Button>Manage</Button>
            </Link>
          )}
        </Flex>
      </Skeleton>
    </div>
  )
}

export default GroupPage
