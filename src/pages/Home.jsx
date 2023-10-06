import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import service from "../appwrite/configuration";
import { Container, PostCard } from "../components";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full flex flex-col items-center">
                            <h1 className="text-2xl font-bold">
                                You are not logged in. Login to read posts.
                            </h1>
                            <Link
                                to="/login"
                                className="block mt-6 text-lg bg-purple-400 w-max py-4 px-6 rounded-md hover:bg-purple-500 duration-200 ease-out"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.$id} className="p-2 w-1/4">
                                    <PostCard {...post} />
                                </div>
                            ))
                        ) : (
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
                        )}
                    </div>
                </Container>
            </div>
        );
    }
};

export default Home;
