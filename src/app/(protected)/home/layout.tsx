"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null); // null indicates loading
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                
                const response = await axios.get('/auth/me');
                console.log("Response data:", response.data);
                if (response.data.message==="unauthorized") {
                    console.log("heyyyyyyyyyyyyyyy")
                    router.push('/');
                    setIsAuth(false);
                } else {
                    setIsAuth(true);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsAuth(false);
            }
        };

        getData();
    }, [router]);

    // Display loading state or handle unauthenticated users
   
    if (!isAuth) {
        return null; // Optionally, you could redirect here as well
    }

    return (
        <section>
            <TooltipProvider>
                {children}
            </TooltipProvider>
           
        </section>
    );
}
