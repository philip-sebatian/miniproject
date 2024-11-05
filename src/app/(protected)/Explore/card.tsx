import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function UserCard({ user, currentUserId, isFriend }) {
    const [isFriendState, setIsFriendState] = useState(isFriend);

    const toggleFriendship = async () => {
        try {
            if (isFriendState) {
                // Remove friendship
                const response = await axios.delete('/friends/delete', {
                    data: {
                        user1Id: currentUserId,
                        user2Id: user.id,
                    },
                });

                if (response.status === 200) {
                    setIsFriendState(false);
                }
            } else {
                // Add friendship
                const response = await axios.post('/friends/add', {
                    user1Id: currentUserId,
                    user2Id: user.id,
                });

                if (response.status === 201) {
                    setIsFriendState(true);
                }
            }
        } catch (error) {
            console.error("Failed to toggle friendship:", error);
        }
    };

    return (
        <div className="flex items-center p-4 border rounded-md shadow-md">
            <div className="flex-shrink-0">
                <img src={user.avatar} alt={`${user.userName}'s avatar`} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1 ml-4">
                <p className="text-lg font-semibold">{user.userName}</p>
                <Button size="sm" variant="ghost" onClick={toggleFriendship}>
                    {isFriendState ? "Remove Friend" : "Add Friend"}
                </Button>
            </div>
        </div>
    );
}
