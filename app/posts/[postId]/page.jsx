import { getAuthor } from "@/lib/firebase/author/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";
import { getPost } from "@/lib/firebase/post/read_server";

export async function generateMetadata({ params }) {
    const { postId } = params;
    try {
        const post = await getPost(postId);
        return {
            title: post?.title || "Post Not Found",
            openGraph: {
                images: [post?.imageURL || "/default-image.jpg"],
            },
        };
    } catch (error) {
        console.error("Failed to generate metadata:", error);
        return {
            title: "Error",
            openGraph: {
                images: ["/default-image.jpg"],
            },
        };
    }
}

export default async function Page({ params }) {
    const { postId } = params;
    let post;
    try {
        post = await getPost(postId);
    } catch (error) {
        console.error("Failed to load post:", error);
        return (
            <main className="flex justify-center">
                <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                </section>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="flex justify-center">
                <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                </section>
            </main>
        );
    }

    return (
        <main className="flex justify-center">
            <section className="flex flex-col gap-5 px-16 py-10 max-w-[800px]">
                <CategoryCard categoryId={post?.categoryId} />
                <h1 className="text-2xl font-bold">{post?.title}</h1>
                {post?.imageURL ? (
                    <img className="w-full object-cover" src={post?.imageURL} alt="Post image" />
                ) : (
                    <img className="w-full object-cover" src="/default-image.jpg" alt="Default image" />
                )}
                <div className="flex justify-between items-center">
                    <AuthorCard authorId={post?.authorId} />
                    <h5 className="text-xs text-gray-500">{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post?.content || "<p>No content available</p>" }}></div>
            </section>
        </main>
    );
}

async function AuthorCard({ authorId }) {
    let author;
    try {
        author = await getAuthor(authorId);
    } catch (error) {
        console.error("Failed to load author:", error);
        return <h4 className="text-sm text-gray-500">Unknown Author</h4>;
    }

    if (!author) {
        return <h4 className="text-sm text-gray-500">Unknown Author</h4>;
    }

    return (
        <div className="flex gap-2 items-center">
            {author?.photoURL ? (
                <img className="h-6 w-6 rounded-full object-cover" src={author.photoURL} alt={author.name} />
            ) : (
                <img className="h-6 w-6 rounded-full object-cover" src="/default-author.jpg" alt="Default author" />
            )}
            <h4 className="text-sm text-gray-500">{author?.name || "Unknown Author"}</h4>
        </div>
    );
}

async function CategoryCard({ categoryId }) {
    let category;
    try {
        category = await getCategory(categoryId);
    } catch (error) {
        console.error("Failed to load category:", error);
        return (
            <div className="flex">
                <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
                    <h4 className="text-xs text-gray-500">Unknown Category</h4>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="flex">
                <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
                    <h4 className="text-xs text-gray-500">Unknown Category</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-2 py-1 border">
                {category?.iconURL ? (
                    <img className="h-4 w-4 rounded-full object-cover" src={category.iconURL} alt={category.name} />
                ) : (
                    <img className="h-4 w-4 rounded-full object-cover" src="/default-category.jpg" alt="Default category" />
                )}
                <h4 className="text-xs text-gray-500">{category?.name || "Unknown Category"}</h4>
            </div>
        </div>
    );
}
