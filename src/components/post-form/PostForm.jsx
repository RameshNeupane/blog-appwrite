import { useForm } from "react-hook-form";
import service from "../../appwrite/service";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { getUserData } from "../../store/authSlice";
import { Button, Input, RTE, Select } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, getPostsStatus, updatePost } from "../../store/postsSlice";

const PostForm = ({ post }) => {
    const { register, handleSubmit, control, watch, setValue, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(getUserData);
    const postsStatus = useSelector(getPostsStatus);

    const submitPost = async (data) => {
        if (post) {
            await dispatch(updatePost({ post, data }));
            if (postsStatus === "succeeded") {
                navigate(`/post/${data.slug}`);
            }
        } else {
            await dispatch(addNewPost({ data, userId: userData.$id }));
            if (postsStatus === "succeeded") {
                navigate(`/post/${data.slug}`);
            }
        }
    };

    // transform slug
    const transformSlug = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/--+/g, "-");
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!post) {
                if (name === "title") {
                    setValue("slug", transformSlug(value.title), {
                        shouldValidate: true,
                    });
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, transformSlug, setValue, post]);

    let btnText = "";
    if (post) {
        btnText = "Update";
    } else {
        btnText = "Publish";
    }
    if (postsStatus === "loading") {
        btnText += "ing...";
    }

    return (
        <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    readOnly={post}
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", transformSlug(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {btnText}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
