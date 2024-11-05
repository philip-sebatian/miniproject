import { useState, useEffect } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import axios from "axios";

// Modal Component
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null; // If not open, return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                <button onClick={onClose} className="float-right text-gray-500">Close</button>
                <div className="mt-2">{children}</div>
            </div>
        </div>
    );
}

// Main Post Component
export default function Postcomp({ post }) {
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    // Load current user info from localStorage
    useEffect(() => {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        if (username && userId) {
            setCurrentUser({ userName: username, userId: parseInt(userId) });
        }
    }, []);

    // Fetch initial like status and count when user data is ready
    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!currentUser) return;
            try {
                const response = await axios.get(`/likes?post_id=${post.id}&user_id=${currentUser.userId}`);
                setIsLiked(response.data.isLiked); // Assume API returns isLiked
            } catch (error) {
                console.error("Error fetching like status", error);
            }
        };
        fetchLikeStatus();
    }, [currentUser, post.id]);

    // Toggle like/unlike for the post
    const toggleLike = async () => {
        if (!currentUser) {
            console.error("User not logged in");
            return;
        }

        // Optimistically update the UI before the API call
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikeCount((prev) => (newIsLiked ? prev + 1 : Math.max(prev - 1, 0))); // Increment or decrement the count

        try {
            if (newIsLiked) {
                // Like the post
                await axios.post('/likes', {
                    post_id: post.id,
                    user_id: currentUser.userId,
                });
            } else {
                // Unlike the post
                await axios.delete(`/likes?post_id=${post.id}&user_id=${currentUser.userId}`);
            }
        } catch (error) {
            console.error("Error toggling like", error);
            // Revert the UI state if the API call fails
            setIsLiked(isLiked); // Revert to original like state
            setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1)); // Revert the count
        }
    };

    // Fetch comments from server when modal opens
    useEffect(() => {
        if (isCommentsOpen) {
            fetchComments();
        }
    }, [isCommentsOpen]);

    // Fetch comments from server
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/comments?post_id=${post.id}`);
            setComments(response.data); // Assume response is an array of comments
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    // Handle new comment submission
    const handleSubmitComment = async () => {
        if (!currentUser) {
            console.error("User not logged in");
            return;
        }

        try {
            const response = await axios.post('/comments', {
                post_id: post.id,
                comment: newComment,
                owner_id: currentUser.userId,
            });

            if (response.status === 201) {
                setNewComment(""); // Clear input
                await fetchComments(); // Refresh comments
            } else {
                console.error("Failed to submit comment");
            }
        } catch (error) {
            console.error("Error submitting comment", error);
        } finally {
            setIsCommentsOpen(false);
        }
    };

    return (
        <Card key={post.id} className="overflow-hidden w-1/2">
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
                    <Button size="sm" variant="ghost" onClick={toggleLike}>
                        <Heart className={`mr-2 h-4 w-4 ${isLiked ? "text-red-500" : "text-gray-400"}`} />
                        <span className="sr-only">Likes</span>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setIsCommentsOpen(true)}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {comments.length}
                        <span className="sr-only">Comments</span>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{post.username}</span> {post.caption}
                </p>
            </CardFooter>

            {/* Comments Modal */}
            <Modal isOpen={isCommentsOpen} onClose={() => setIsCommentsOpen(false)}>
                <h2 className="text-lg font-bold">Comments</h2>
                <ul className="mt-4 max-h-60 overflow-y-auto">
                    {comments.map((comment) => (
                        <li key={comment.id} className="mb-2">
                            <p className="text-sm">
                                <span className="font-medium">{comment.user.userName}:</span> {comment.comment}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center mt-4 gap-2">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="border p-2 rounded-md w-full"
                    />
                    <Button size="sm" variant="primary" onClick={handleSubmitComment}>
                        Post
                    </Button>
                </div>
            </Modal>
        </Card>
    );
}
