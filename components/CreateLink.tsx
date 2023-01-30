import { useRouter } from "next/router";
import { useState } from "react";
import useUser from "../lib/useUser";

const CreateLink = () => {
    const { user, mutateUser } = useUser({
        redirectTo: "/login",
        query: { redirect: "/post/new" },
    });

    const [msg, setMsg] = useState("");
    const [msgClass, setMsgClass] = useState("");
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");

    if (!user) return <div>Loading</div>;

    return (
        <>
            {/* Based on examples from TailwindUI  */}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Post News
                    </h2>

                    <form className="mt-8 space-y-6">
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="title" className="sr-only">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-800 focus:outline-none focus:ring-gray-800 sm:text-sm"
                                    placeholder="News Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="url" className="sr-only">
                                    URL
                                </label>
                                <input
                                    id="url"
                                    name="url"
                                    type="url"
                                    autoComplete="current-password"
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-800 focus:outline-none focus:ring-gray-800 sm:text-sm"
                                    placeholder="URL"
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div
                            className={`text-white text-center rounded-md underline my-1 ${msgClass}`}
                        >
                            {msg}
                        </div>
                        <div className="m-auto w-4/5">
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const res = await fetch("/api/links/new", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            url,
                                            title,
                                            user: user?.id,
                                        }),
                                    });
                                    const data = await res.json();
                                    if (res.ok) {
                                        setMsgClass("bg-green-600");
                                        setMsg(data.message);
                                        // setTimeout(
                                        //     () => router.push("/"),
                                        //     5000
                                        // );
                                    } else if (res.status === 406) {
                                        setMsgClass("bg-red-700");
                                        setMsg(data.message);
                                    } else if (res.status === 500) {
                                        console.log(await res.json());
                                    }
                                }}
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateLink;
