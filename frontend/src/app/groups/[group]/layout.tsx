'use client'
import { usePathname } from 'next/navigation';
import React from 'react';


const GroupPage: React.FC = () => {
    const pathName = usePathname();
    const groupName = pathName.split('/').pop() || '';

    return (
        <div>
            <h1>{groupName}</h1>
            {/* Add your content here */}
        </div>
    );
};

export default GroupPage;