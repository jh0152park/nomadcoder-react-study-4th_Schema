import MBBuffer from "@/components/post/mb-buffer";
import PostSummary from "@/components/post/post-summary";
import PRISMA_DB from "@/lib/db/prisma-db";
import getSession from "@/lib/session/get-session";
import Image from "next/image";

async function getAllLikePost(sid: number) {
    const user = await PRISMA_DB.user.findUnique({
        where: {
            id: sid,
        },
        select: {
            likePost: true,
        },
    });

    const posts = await PRISMA_DB.post.findMany({
        orderBy: {
            created_at: "desc",
        },
        select: {
            id: true,
            like: true,
            userId: true,
            payload: true,
            comment: true,
            user: {
                select: {
                    id: true,
                    username: true,
                    profile_image: true,
                    likePost: true,
                },
            },
        },
    });

    return posts.filter((post) => user?.likePost.includes(post.id));
}

async function getCurrentUser(sid: number) {
    return await PRISMA_DB.user.findUnique({
        where: {
            id: sid,
        },
        select: {
            likePost: true,
        },
    });
}

export default async function Likes() {
    const session = await getSession();
    const likePosts = await getAllLikePost(session.id!);
    const currentUser = await getCurrentUser(session.id!);

    return (
        <div className="w-full min-h-screen max-w-[430px] pt-20 ">
            <div className="fixed top-0 flex items-center max-w-[430px] justify-center w-full bg-black -translate-x-1/2 left-1/2 border border-neutral-400 border-t-0 border-b-0 z-50">
                <Image
                    src="/image/logo.png"
                    alt="logo"
                    width="50"
                    height="50"
                    priority={true}
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                />
            </div>

            {likePosts.map((post) => (
                <PostSummary
                    {...post}
                    key={post.id}
                    sessionId={session.id!}
                    currentUser={currentUser!}
                />
            ))}
            <MBBuffer mb="32" />
        </div>
    );
}
