import parse from "html-react-parser";
import service from "../appwrite/service";
import { getUserData } from "../store/authSlice";
import { Button, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    deletePost,
    getPostsStatus,
    getSinglePostById,
} from "../store/postsSlice";

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post = useSelector((state) => getSinglePostById(state, slug));
    const postsStatus = useSelector(getPostsStatus);
    const userData = useSelector(getUserData);

    // check author
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const handleDelete = async () => {
        await dispatch(deletePost(post));
        navigate("/");
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                disabled={postsStatus === "loading"}
                                bgColor="bg-red-500 hover:bg-red-600 transition-colors duration-200 ease-in disabled:bg-red-400 disabled:cursor-not-allowed"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post?.content)}</div>
            </Container>
        </div>
    ) : (
        <div className="text-center text-xl font-medium">Loading...</div>
    );
};

export default Post;
