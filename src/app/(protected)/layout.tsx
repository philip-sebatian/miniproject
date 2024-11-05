"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
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


export  function Component() {
    const router=useRouter()
  return (

    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b-2 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link href="/home" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Home
            </Link>
            <Link href="/" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Chat
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Profile
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Post
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Logout
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          href="/home"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/chat"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Chat
        </Link>
        <Link
          href="/Explore"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Explore
        </Link>
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Profile
        </Link>
        <Link
          href="/create_post"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Post
        </Link>
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md  bg-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
          onClick={()=>{
            const response=axios.post('/auth/me')
            console.log("Logged out")
            router.push('/')
          }}
        >
          Logout
        </Link>
      </nav>
    </header>
    
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16 animate-spin">
        {/* Outer ring */}
        <div className="absolute border-4 border-gray-300 dark:border-gray-600 opacity-30 rounded-full w-full h-full"></div>
        {/* Inner rotating ring */}
        <div className="absolute border-t-4 border-blue-600 dark:border-blue-400 rounded-full w-full h-full"></div>
      </div>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  export default function Layout({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null); // null indicates loading
    const router = useRouter();
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get('/auth/me');
          if (response.data?.message === "unauthorized" || !response.data) {
            // If no valid authentication data or user is unauthorized, redirect to home
            console.log("Not authenticated, redirecting...");
            router.push('/');
            setIsAuth(false);
          } else {
            // User is authenticated
            setIsAuth(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push('/'); // Redirect to home in case of error (e.g., no cookie)
          setIsAuth(false);
        }
      };
  
      getData();
    }, [router]);
  
    // Display a loading state until authentication is confirmed
    if (isAuth === null) {
      return <LoadingSpinner></LoadingSpinner>; // Adjust this to a more complex spinner if needed
    }
  
    return (
      <section>
        <Component></Component>
        <div className=" bg-[#AAC9FF]">
        {isAuth && children}
        </div>{/* Render children only if authenticated */}
      </section>
    );
  }