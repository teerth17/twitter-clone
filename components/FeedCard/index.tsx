import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
    data: Tweet
}


const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props

    return (
        <div className="border border-l-0 border-r-0 border-b-0 p-4 hover:bg-[#E7E7E8] transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1 block relative" >
                    {data.author?.profileImageURL &&
                        <Image
                            src={data.author?.profileImageURL} alt="user-Image" className="rounded-full object-none object-[59%_-4px]" height={50} width={50}

                        >
                        </Image>}
                </div>
                <div className="col-span-11">
                    <h5 className="tebold"> {data.author?.firstName} {data.author?.lastName} </h5>
                    <p>
                        {data.content}
                    </p>
                    <div className="flex justify-between ">
                        <div>
                            <BiMessageRounded />
                        </div>
                        <div>
                            <FaRetweet />
                        </div>
                        <div>
                            <AiOutlineHeart />
                        </div>
                        <div>
                            <FiShare />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;
