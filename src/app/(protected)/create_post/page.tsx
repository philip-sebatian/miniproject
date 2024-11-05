"use client"
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { UploadCloud, Plus } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression"; // Import the compression library

export default function CreatePostComp() {
  const [postContent, setPostContent] = useState({
    caption: "",
    image: null,
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    setPostContent({ ...postContent, caption: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set up the compression options
      const options = {
        maxSizeMB: 1, // Max file size in MB
        maxWidthOrHeight: 1024, // Max width or height (in pixels)
        useWebWorker: true, // Enable web worker for faster compression
      };

      try {
        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Read the compressed image as a Base64 string
        const reader = new FileReader();
        reader.onload = () => {
          setPostContent({ ...postContent, image: reader.result });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const a = await axios.get("/auth/me");
      console.log(a.data.user);
      const obj = {
        username: a.data.user,
        avatar: "",
        caption: postContent.caption,
        likes: 0,
        image: postContent.image,
      };
      console.log(obj);
      await axios.post("/posts", obj);
      router.push("/home");
    } catch (error) {
      console.error("Error creating post:", error);
      console.error(error.response.data);
    }
  };

  return (
    <div className="w-screen h-screen justify-center items-center">
      <Card className="w-full lg:w-1/2 mx-auto my-8">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex items-center gap-4 p-4">
            <Avatar src="/placeholder.svg" />
            <div className="flex-1">
              <p className="text-sm font-medium">Create a Post</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4">
            <Label
              htmlFor="imageUpload"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              {!postContent.image ? (
                <div className="relative w-full h-[400px] bg-gray-100 flex justify-center items-center">
                  <Plus className="h-12 w-12 text-gray-400" />
                  <UploadCloud className="absolute bottom-4 h-6 w-6 text-gray-500" />
                </div>
              ) : (
                <img
                  src={postContent.image}
                  alt="Uploaded"
                  className="w-full h-[400px] object-cover"
                />
              )}
            </Label>
            <Input
              id="imageUpload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Textarea
              name="caption"
              placeholder="Write a caption..."
              value={postContent.caption}
              onChange={handleInputChange}
              rows={3}
              className="resize-none"
            />
          </CardContent>
          <CardFooter className="flex justify-end p-4">
            <Button type="submit" variant="default">
              Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
