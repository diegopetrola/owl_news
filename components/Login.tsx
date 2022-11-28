import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SessionUser } from "../pages/api/auth/login";

const Login = () => {
    const [msg, setMsg] = useState("");
    const router = useRouter();
    const redirect = router.query.redirect as string | undefined;
    console.log(redirect);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { data: user, mutate: mutateUser } =
        useSWR<SessionUser>("/api/auth/session");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        });
        if (res.ok) {
            await mutateUser(await res.json());
            await router.push(redirect ? redirect : "/");
        } else if (res.status === 400) {
            const { message }: { message: string } = await res.json();
            setMsg(message);
        } else {
            console.log(await res.json());
        }
    };
    if (user?.isLoggedIn) router.push("/");

    return (
        <>
            {/* Based on TailwindUI examples */}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Log in
                    </h2>

                    <form className="mt-8 space-y-6">
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="text"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-800 focus:outline-none focus:ring-gray-800 sm:text-sm"
                                    placeholder="Username"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-800 focus:outline-none focus:ring-gray-800 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="bg-red-700 text-white text-center rounded-md underline my-1">
                            {msg}
                        </div>
                        <div className="m-auto w-4/5">
                            <button
                                onClick={onSubmit}
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
