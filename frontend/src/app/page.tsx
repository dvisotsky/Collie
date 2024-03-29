'use client'
import React, { useEffect, useState } from 'react'
import { Class } from '../../types/class'
import {
  Button,
  Card,
  Center,
  Group,
  MantineProvider,
  Text,
  createTheme,
} from '@mantine/core'
export const Home: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    console.log('window:', window)
    if (typeof window === 'undefined') return
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8000/classes')
      const data = await response.json()
      setClasses(data)
    } catch (error) {
      console.error('Error fetching classes:', error)
    }
  }

  return (
    <MantineProvider
      theme={pineRoseTheme}
      withGlobalClasses
      defaultColorScheme='dark'
    >
      <Center>
        <div>
          <h1>Welcome to the Home Page!</h1>
          <Group>
            {classes.map((c, i) => (
              <Card withBorder key={i}>
                <Text>{c.name}</Text>
                <Button>View</Button>
              </Card>
            ))}
          </Group>
        </div>
      </Center>
    </MantineProvider>
  )
}

export default Home

const pineRoseTheme = createTheme({
  primaryColor: 'blue',
  primaryShade: 6,
  colors: {
    GRAY: [
      '#282828',
      '#3c3836',
      '#504945',
      '#665c54',
      '#7c6f64',
      '#928374',
      '#a89984',
      '#bdae93',
      '#d5c4a1',
      '#ebdbb2',
    ],
    RED: [
      '#cc241d',
      '#fb4934',
      '#fb4934',
      '#fb4934',
      '#fb4934',
      '#fb4934',
      '#fb4934',
      '#fb4934',
      '#fb4934',
      '#fb4934',
    ],
    YELLOW: [
      '#d79921',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
      '#fabd2f',
    ],
    GREEN: [
      '#98971a',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
      '#b8bb26',
    ],
    BLUE: [
      '#458588',
      '#83a598',
      '#83a598',
      '#83a598',
      '#83a598',
      '#83a598',
      '#83a598',
      '#83a598',
      '#83a598',
      '#83a598',
    ],
    INDIGO: [
      '#b16286',
      '#d3869b',
      '#d3869b',
      '#d3869b',
      '#d3869b',
      '#d3869b',
      '#d3869b',
      '#d3869b',
      '#d3869b',
      '#d3869b',
    ],
    PURPLE: [
      '#8f3f71',
      '#b16286',
      '#b16286',
      '#b16286',
      '#b16286',
      '#b16286',
      '#b16286',
      '#b16286',
      '#b16286',
      '#b16286',
    ],
    PINK: [
      '#d3869b',
      '#eb5286',
      '#eb5286',
      '#eb5286',
      '#eb5286',
      '#eb5286',
      '#eb5286',
      '#eb5286',
      '#eb5286',
      '#eb5286',
    ],
  },
})
