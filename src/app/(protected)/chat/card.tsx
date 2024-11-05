// src/app/(protected)/chat/UserCard.tsx
"use client";

import { Button } from '@/components/ui/button'; // Adjust according to your button component

export default function UserCard({ user, currentUserId, isFriend, onClick }) {
    return (
        <div className="flex items-center p-4 border rounded-md shadow-md cursor-pointer" onClick={onClick}>
            <div className="flex-shrink-0">
                <img src={user.avatar} alt={`${user.userName}'s avatar`} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1 ml-4">
                <p className="text-lg font-semibold">{user.userName}</p>
                <Button size="sm" variant="ghost" disabled={isFriend}>
                    {isFriend ? "Friends" : "Add Friend"}
                </Button>
            </div>
        </div>
    );
}
