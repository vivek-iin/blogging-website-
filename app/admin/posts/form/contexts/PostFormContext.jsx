"use client";

import { getPost } from "@/lib/firebase/post/read";
import { createNewPost, deletePost, updatePost } from "@/lib/firebase/post/write";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const PostFormContext = createContext();

export function PostFormContextProvider({ children }) {
    const router = useRouter();

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setIsDone(false);
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            await createNewPost({ data, image });
            setIsDone(true);
            router.push(`/admin/posts`);
        } catch (error) {
            setError(error?.message || "Failed to create post");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            await updatePost({ data, image });
            setIsDone(true);
            router.push(`/admin/posts`);
        } catch (error) {
            setError(error?.message || "Failed to update post");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            await deletePost(id);
            setIsDone(true);
            router.push(`/admin/posts`);
        } catch (error) {
            setError(error?.message || "Failed to delete post");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async (id) => {
        setError(null);
        setIsLoading(true);
        setIsDone(false);
        try {
            const res = await getPost(id);
            if (res.exists()) {
                setData(res.data());
            } else {
                throw new Error(`No post found for ID: ${id}`);
            }
        } catch (error) {
            setError(error?.message || "Failed to fetch post data");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PostFormContext.Provider
            value={{
                data,
                isLoading,
                error,
                isDone,
                handleData,
                handleCreate,
                handleUpdate,
                handleDelete,
                image,
                setImage,
                fetchData,
            }}
        >
            {children}
        </PostFormContext.Provider>
    );
}

export const usePostForm = () => useContext(PostFormContext);
