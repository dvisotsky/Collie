'use client'
import '../../styles/global.css'
import '@mantine/core/styles.css'
import {
  AppShell,
  Burger,
  Button,
  MantineProvider,
  createTheme,
} from '@mantine/core'
import { useState } from 'react'
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react'
import Link from 'next/link'

const mainLinks = [
  { icon: IconHome2, label: 'Home', link: '/' },
  { icon: IconUser, label: 'Groups', link: '/groups' },
  { icon: IconUser, label: 'People', link: '/people' },
]

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  const [opened, setOpened] = useState(true)

  // todo: notifications https://mantine.dev/core/notification/
  const [notifications, setNotifications] = useState<string[]>([])

  return (
    <html>
      <body>
        <MantineProvider theme={pineRoseTheme}>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 200,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
          >
            <AppShell.Header>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                hiddenFrom='sm'
                size='sm'
              ></Burger>
            </AppShell.Header>
            <AppShell.Navbar p='md' style={{ gap: 8 }}>
              {mainLinks.map((link, index) => (
                <Link href={link.link} style={{ width: '100%' }}>
                  <Button key={index}>{link.label}</Button>
                </Link>
              ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}

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
