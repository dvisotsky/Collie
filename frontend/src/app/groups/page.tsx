'use client'
import { Group, Card } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const GroupPage = () => {
    const [groups, setGroups] = useState([]);


    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:8000/classes')
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
            <Group>
                {groups.map((c, i) => (
                    <Link href={`/groups/${c.name}`}>
                        <Card withBorder key={i}>
                            {c.name}
                        </Card>
                    </Link>
                ))}
            </Group>
        </div>
    );
};

export default GroupPage;