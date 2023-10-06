import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import service from "../appwrite/configuration";
import { Container, PostCard } from "../components";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="text-center text-xl font-medium">Loading...</div>
        );
    }

    if (!isLoading && posts.length === 0) {
        return (
            <div className="p-2 w-full flex flex-col items-center">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    No post to read.
                </h1>
                <Link
                    to="/add-post"
                    className="block mt-6 text-lg bg-purple-400 w-max py-4 px-6 rounded-md hover:bg-purple-500 duration-200 ease-out"
                >
                    Add New Post
                </Link>
            </div>
        );
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
