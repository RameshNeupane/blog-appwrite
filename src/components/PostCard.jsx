import { Link } from "react-router-dom";
import service from "../appwrite/service";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="inline-flex justify-center w-full">
            <div className="group border-2 border-purple-100 w-full min-w-[300px] max-w-lg h-96 rounded-md hover:bg-purple-200 hover:border-purple-200 transition-all duration-200 ease-in">
                <div className="h-3/4">
                    <div className="h-full w-full relative overflow-hidden rounded-t-md">
                        <div
                            style={{
                                backgroundImage: `url(${service.getFilePreview(
                                    featuredImage
                                )})`,
                            }}
                            className="block absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 group-hover:scale-105 transition-transform duration-200 ease-in"
                        ></div>
                    </div>
                </div>
                <div className="p-2">
                    <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                        title={title}
                    >
                        {title}
                    </h5>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
