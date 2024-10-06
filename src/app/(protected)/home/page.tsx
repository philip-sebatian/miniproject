
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Postcomp from "@/components/custom/post"

const posts = [
    {
      id: 1,
      username: "jane_doe",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "https://unsplash.com/photos/a-black-and-white-photo-of-a-rock-formation-HuExMHcOFIQ",
      likes: 1234,
      comments: 56,
      caption: "Enjoying a beautiful day in the city! #citylife #sunshine",
    },
    {
      id: 2,
      username: "travel_enthusiast",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "https://images.unsplash.com/photo-1724744014262-64b09c07f421?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
      likes: 987,
      comments: 43,
      caption: "Adventure awaits in every corner of the world. #travel #explore",
    },
    {
      id: 3,
      username: "foodie_delights",
      avatar: "/placeholder.svg?height=40&width=40",
      image: "https://images.unsplash.com/photo-1724510637078-274e1b12ee91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
      likes: 2345,
      comments: 78,
      caption: "Indulging in some delicious local cuisine! #foodporn #yummy",
    },
  ]


function Dashboard(){
    return (
        <div className="w-screen h-1/ border border-black top-0">
            
        </div>
    );
}
export default function Page() {
    return (
        <div>
            
            <div className="w-screen  flex flex-col justify-center items-center space-y-5">
                <br></br>
                {posts.map((post)=>{
                    return <Postcomp post={post}></Postcomp>
                })}
                
            </div>
        </div>
    );
}