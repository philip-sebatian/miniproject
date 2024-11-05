"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './card';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [friendStatuses, setFriendStatuses] = useState({}); // Track friendship status for each user

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setCurrentUserId(parseInt(storedUserId, 10));
        }
    }, []);

    useEffect(() => {
        const fetchUsersAndFriends = async () => {
            try {
                const [usersResponse, friendsResponse] = await Promise.all([
                    axios.get('/users'),                  // Fetch all users
                    axios.get(`/friends/${currentUserId}`) // Fetch friends of the current user
                ]);

                setUsers(usersResponse.data);

                const friendsSet = new Set(friendsResponse.data.map(friend => friend.id)); // Store friend IDs in a Set
                const initialFriendStatuses = usersResponse.data.reduce((acc, user) => {
                    acc[user.id] = friendsSet.has(user.id); // Check if each user is a friend
                    return acc;
                }, {});
                
                setFriendStatuses(initialFriendStatuses);
            } catch (error) {
                console.error("Error fetching users or friends:", error);
            }
        };

        if (currentUserId) {
            fetchUsersAndFriends();
        }
    }, [currentUserId]);

    return (
        <div className="flex flex-col gap-4 p-4">
            {users.map((user) => (
                <UserCard 
                    key={user.id} 
                    user={user} 
                    currentUserId={currentUserId} 
                    isFriend={friendStatuses[user.id] || false} 
                />
            ))}
        </div>
    );
}
