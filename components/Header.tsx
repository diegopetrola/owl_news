import Link from "next/link";
import Image from "next/image";
import { SessionUser } from "../pages/api/auth/login";
import useSWR from "swr";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Header = () => {
    let { data: user, mutate: mutateUser } = useSWR<SessionUser>(
        "/api/auth/session",
        fetcher
    );
    const router = useRouter();

    return (
        <nav className="flex flex-row mx-auto max-w-7xl px-4 sm:px-6 items-center border-b-2 border-gray-100 py-3">
            <Link className="mx-1" href="/">
                <span className="sr-only">News app</span>
                <Image
                    className="h-8 w-auto sm:h-10"
                    src="/bird-svgrepo-com.svg"
                    alt="Bird logo"
                    width={50}
                    height={50}
                />
            </Link>
            <Link
                href="/"
                className="mx-1 text-base font-medium text-gray-500 hover:text-gray-900"
            >
                <span>Home</span>
            </Link>
            <Link
                href="/post/new"
                className="mx-4 text-base font-medium text-gray-500 hover:text-gray-900"
            >
                <span>Post News</span>
            </Link>
            {user?.isLoggedIn ? (
                <Popover
                    as="div"
                    className="flex items-center pl-4 pr-1 ml-auto justify-self-end"
                >
                    <Popover.Button className="flex items-center">
                        <div className="bg-gray-700 w-10 h-10 rounded-full flex justify-center items-center ring-2 ring-offset-1 ring-gray-600">
                            <div className="text-white font-bold text-xl text-center">
                                {user?.name[0]}
                            </div>
                        </div>
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-grat-700 hover:text-gray-800"
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute translate-y-full -translate-x-1/4">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid bg-white p-7 lg:grid-cols-1">
                                    <div
                                        key="signout"
                                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        onClick={async (e) => {
                                            const res = await fetch(
                                                "/api/auth/logout",
                                                { method: "GET" }
                                            );
                                            if (res.ok) {
                                                mutateUser(await res.json());
                                                router.push("/");
                                            } else {
                                                console.log(await res.json());
                                            }
                                        }}
                                    >
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            ) : (
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <Link
                        href="/login"
                        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </nav>
    );
};
export default Header;
