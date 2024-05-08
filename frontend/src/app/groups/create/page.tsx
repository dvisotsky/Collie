'use client'
import { Button, Container, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import React from 'react'
import { postGroup } from '../../../api/group'

const CreateGroupPage: React.FC = () => {
  const router = useRouter()
  const groupForm = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => {
        if (value.length < 3) {
          return 'Group name must be at least 3 characters long'
        }
      },
    },
  })

  const createGroup = async (values: { name: string }) => {
    postGroup(values).then((response) => {
      if (response.data) {
        router.push(`/groups/${response.data.id}`)
      }
    })
  }

  return (
    <div>
      <h1>Create Group</h1>
      <Container>
        <form onSubmit={groupForm.onSubmit(createGroup)}>
          <TextInput
            withAsterisk
            label='Group Name'
            key={groupForm.key('name')}
            {...groupForm.getInputProps('name')}
          />
          <Button type='submit'>Create</Button>
        </form>
      </Container>
    </div>
  )
}

export default CreateGroupPage
