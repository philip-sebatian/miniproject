"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
    const [posts, setPosts] = useState([]); // Initialize state to hold posts
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/posts');
                setPosts(res.data); // Set the posts state
            } catch (err) {
                setError(err); // Set the error state if the request fails
            } finally {
                setLoading(false); // Set loading to false after the request
            }
        };

        fetchPosts();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Display a loading message
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle error
    }

    return (
        <div>
            {posts.map((post) => (
                <img key={post.id} src={post.image} alt={post.caption} /> // Use a unique key for each item
            ))}
        </div>
    );
}
