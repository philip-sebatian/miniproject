import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Postcomp({ post }) {
    return (        
        <Card key={post.id} className="overflow-hidden w-1/2"> {/* Set width here */}
            <CardHeader className="flex flex-row items-center gap-4 p-4 border-b-2 m-2">
                <Avatar>
                    <AvatarImage alt={post.username} src={post.avatar} />
                    <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{post.username}</p>
                </div>
                <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                </Button>
            </CardHeader>
            <CardContent className="p-0 flex justify-center items-center">
                <img
                    alt="Post image"
                    className="aspect-square object-cover"
                    height="400"
                    src={post.image}
                    width="400"
                />
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 p-4">
                <div className="flex w-full items-center gap-4">
                    <Button size="sm" variant="ghost">
                        <Heart className="mr-2 h-4 w-4" />
                        {post.likes}
                        <span className="sr-only">Likes</span>
                    </Button>
                    <Button size="sm" variant="ghost">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {post.comments}
                        <span className="sr-only">Comments</span>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{post.username}</span> {post.caption}
                </p>
            </CardFooter>
        </Card>
    );
}


/*
  const posts = [
    {
      id: 1,
      username: "jane_doe",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=400&width=400",
      likes: 1234,
      comments: 56,
      caption: "Enjoying a beautiful day in the city! #citylife #sunshine",
    },
    {
      id: 2,
      username: "travel_enthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=400&width=400",
      likes: 987,
      comments: 43,
      caption: "Adventure awaits in every corner of the world. #travel #explore",
    },
    {
      id: 3,
      username: "foodie_delights",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "/placeholder.svg?height=400&width=400",
      likes: 2345,
      comments: 78,
      caption: "Indulging in some delicious local cuisine! #foodporn #yummy",
    },
  ]*/