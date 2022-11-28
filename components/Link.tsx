import { formatDate, formatURL } from "../lib/utils";
import { LinkData } from "../pages/api/feed";

const Link = ({ link }: { link: LinkData }) => {
    return (
        <div className="flex w-full min-h-full justify-start py-1 px-4 ">
            <a
                className="leading-none w-full md:w-4/5 lg:w-2/3 sm:mx-8 border border-gray-300 rounded-md py-1 px-4 text-gray-900 sm:text-sm shadow-sm"
                href={link.url}
            >
                <div className="">
                    <span className="text-sm md:text-base font-semibold">
                        {link.title}{" "}
                    </span>
                    <span className="text-gray-500 md:text-sm text-xs">
                        ({formatURL(link.url)})
                    </span>
                </div>
                <div className="flex text-xs sm:text-sm space-x-0">
                    X <span className="text-gray-500"> votes | by </span>
                    {link.postedBy?.name}
                    <span className="text-gray-500">
                        —{formatDate(link.createdAt)}
                    </span>
                </div>
            </a>
        </div>
    );
};

export default Link;
