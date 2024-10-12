"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Postcomp from "@/components/custom/post";

function Dashboard() {
    return (
        <div className="w-screen h-1/ border border-black top-0">
            {/* Any additional content for the Dashboard can go here */}
        </div>
    );
}

export default function Page() {
    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("/posts"); // Update with your API endpoint
                setPosts(res.data); // Set the fetched posts
            } catch (err) {
                setError(err); // Set error if the request fails
            } finally {
                setLoading(false); // Loading done
            }
        };

        fetchPosts();
    }, []); // Runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Display a loading message
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle error
    }

    return (
        <div>
            <div className="w-screen flex flex-col justify-center items-center space-y-5">
                <br />
                {posts.map((post) => (
                    <Postcomp key={post.id} post={post} /> // Use a unique key for each post
                ))}
            </div>
        </div>
    );
}
