// src/app/(protected)/chat/ChatRoom.tsx
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface Friend {
  id: string
  userName: string
  avatar: string
}

export default function ChatRoom() {
  const [friends, setFriends] = useState<Friend[]>([])
  const router = useRouter()
  
  // Retrieve current user ID from localStorage
  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    if (!currentUserId) {
      // Handle case when userId is not found in localStorage
      console.error('User ID not found in localStorage')
      return
    }

    const fetchFriends = async () => {
      try {
        const response = await axios.get(`/friends/${currentUserId}`)
        setFriends(response.data)
      } catch (error) {
        console.error("Error fetching friends:", error)
      }
    }

    fetchFriends()
  }, [currentUserId])

  const handleFriendSelect = (friend: Friend) => {
    // Navigate to the chat page with the friend's user ID
    console.log(friend.id)
    localStorage.setItem("lastchatted",String(friend.id))

    router.push(`/room`)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-6xl mx-auto">
      <Card className="w-1/3 border-r">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Contacts</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {friends.map(friend => (
              <Button
                key={friend.id}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => handleFriendSelect(friend)}
              >
                <Avatar className="w-10 h-10 mr-2">
                  <AvatarImage src={friend.avatar} alt={friend.userName} />
                  <AvatarFallback>{friend.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-left">{friend.userName}</span>
              </Button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a friend to start chatting!</p>
      </div>
    </div>
  )
}
