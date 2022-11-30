import { formatDate, formatURL } from "../lib/utils";
import { LinkData } from "../pages/api/feed";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { VoteData } from "../pages/api/vote";
import useUser from "../lib/useUser";

const Link = (props: { link: LinkData }) => {
    const { user, mutateUser } = useUser();
    const [link, setLink] = useState(props.link);
    const hadleClick = async () => {
        if (!user?.id) {
            return;
        }
        const res = await fetch("api/vote", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ link: link.id, user: user.id }),
        });
        const data: VoteData = await res.json();
        if (res.ok) {
            setLink(data.link!);
        } else {
            console.log(data.message);
        }
    };
    return (
        <div className="flex w-full min-h-full justify-start py-1 px-4 ">
            <div className="inline-flex leading-none w-full md:w-4/5 lg:w-2/3 sm:mx-8 border border-gray-300 rounded-md  text-gray-900 sm:text-sm shadow-sm">
                <div
                    className="flex p-1 border-r border-gray-300"
                    onClick={hadleClick}
                >
                    <ChevronUpIcon className="w-4 hover:scale-125 transition ease-in-out delay-100" />
                </div>
                <a className="flex-shrink px-2 py-1" href={link.url}>
                    <div className="">
                        <span className="text-sm md:text-base font-semibold">
                            {link.title}{" "}
                        </span>
                        <span className="text-gray-500 md:text-sm text-xs">
                            ({formatURL(link.url)})
                        </span>
                    </div>
                    <div className="text-xs sm:text-sm space-x-0">
                        {link.votersIDs.length}{" "}
                        <span className="text-gray-500">
                            {" "}
                            {link.votersIDs.length == 1 ? "vote" : "votes"} | by{" "}
                        </span>
                        {link.postedBy?.name}{" "}
                        <span className="text-gray-500">
                            — {formatDate(link.createdAt)}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Link;
