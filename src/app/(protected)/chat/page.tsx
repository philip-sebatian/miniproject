"use client";

import { useEffect, useState } from 'react';
import ChatRoom from './room';

export default function Page() {
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
        setCurrentUserId(userId);
    }, []);

    return (
        <div className="flex items-center justify-center h-full w-full">
            {currentUserId ? (
                <ChatRoom currentUserId={currentUserId} />
            ) : (
                <p>Loading...</p> // Handle loading state
            )}
        </div>
    );
}