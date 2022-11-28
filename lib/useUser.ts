import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SessionUser } from "../pages/api/auth/login";

export default function useUser({
    redirectTo = "",
    redirectIfFound = false,
    query = {},
} = {}) {
    const router = useRouter();
    const { data: user, mutate: mutateUser } =
        useSWR<SessionUser>("/api/auth/session");

    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || !user) return;

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user?.isLoggedIn)
        ) {
            router.push({ pathname: redirectTo, query });
        }
    }, [user, redirectIfFound, redirectTo]);

    return { user, mutateUser };
}
