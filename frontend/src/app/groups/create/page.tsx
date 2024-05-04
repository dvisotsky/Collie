'use client'
import { Button, Container, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import React from 'react'

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
    console.log('vals', values)
    try {
      const response = await fetch('http://localhost:8000/groups/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        const data = await response.json()
        console.log('response:', data)
        console.log('Group created')
        router.push(`/groups/${values.name}?id=${data.id}`)
      } else {
        console.error('Error creating group')
      }
    } catch (error) {
      console.error('Error creating group:', error)
    }
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
