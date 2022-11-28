import Link from "next/link";
import Image from "next/image";
import { SessionUser } from "../pages/api/auth/login";
import { useState } from "react";
import useSWR from "swr";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Header = () => {
    const { data: user, mutate: mutateUser } = useSWR<SessionUser>(
        "/api/auth/session",
        fetcher
    );

    return (
        <Popover className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-row items-center border-b-2 border-gray-100 py-6 md:space-x-3">
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group
                        as="nav"
                        className="hidden space-x-5 md:flex"
                    >
                        <Link
                            href="/"
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/post/new"
                            className="text-base font-medium text-gray-500 hover:text-gray-900"
                        >
                            <span>Post News</span>
                        </Link>
                    </Popover.Group>
                    {user?.isLoggedIn ? (
                        <Popover className="hidden md:flex justify-self-end ">
                            <Popover.Button>
                                <div className="bg-gray-700 w-10 h-10 rounded-full flex justify-center items-center ring-2 ring-offset-1 ring-gray-600">
                                    <div className="text-white font-bold text-xl text-center">
                                        12
                                    </div>
                                </div>
                                {/* <div className="bg-black rounded-full hidden items-center md:flex md:flex-1">
                                    <h1 className="bg-slate-800 text-base font-medium text-white hover:text-gray-900">
                                        {user?.name[0].toLocaleUpperCase()}
                                    </h1>
                                    <ChevronDownIcon
                                        className={classNames(
                                            open
                                                ? "text-gray-600"
                                                : "text-gray-400",
                                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                                        )}
                                        aria-hidden="true"
                                    />
                                </div> */}
                            </Popover.Button>
                        </Popover>
                    ) : (
                        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                            <a
                                href="#"
                                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                            >
                                Log in
                            </a>
                            <a
                                href="#"
                                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                            >
                                Sign up
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
                >
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    <a
                                        key={"item.name"}
                                        href={"item.href"}
                                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                    >
                                        <span className="ml-3 text-base font-medium text-gray-900">
                                            {"item.name"}
                                        </span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <a
                                    href="#"
                                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                                >
                                    Pricing
                                </a>

                                <a
                                    href="#"
                                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                                >
                                    Docs
                                </a>
                                <a
                                    key={"item.name"}
                                    href={"item.href"}
                                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                                >
                                    {"item.name"}
                                </a>
                            </div>
                            <div>
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Sign up
                                </a>
                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                    Existing user?{" "}
                                    <a
                                        href="#"
                                        className="text-gray-700 hover:text-gray-800"
                                    >
                                        Log in
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};
export default Header;
