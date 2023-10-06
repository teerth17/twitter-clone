import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { RiHome7Fill } from "react-icons/ri";
import { BiSearch, BiEnvelope } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { CiCircleMore } from "react-icons/ci";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "@/components/FeedCard";

import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/pages/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

interface XSiderbarButton {
  title: string;
  icon: React.ReactNode;
}

const SidbarMenuItems: XSiderbarButton[] = [
  {
    title: "Home",
    icon: <RiHome7Fill />,
  },
  {
    title: "Search",
    icon: <BiSearch />,
  },
  {
    title: "Notification",
    icon: <GrNotification />,
  },
  {
    title: "Message",
    icon: <BiEnvelope />,
  },
  {
    title: "BookMarks",
    icon: <BsBookmark />,
  },
  {
    title: "Premium",
    icon: <FaXTwitter />,
  },
  {
    title: "Profile",
    icon: <HiOutlineUser />,
  },
  {
    title: "More",
    icon: <CiCircleMore />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  console.log(user);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Sucess!");

      if (verifyGoogleToken) {
        window.localStorage.setItem("twitter_token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries(["current-user"]);
      console.log(verifyGoogleToken);
    },
    [queryClient]
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56 bg-white">
        <div className="col-span-3 pt-1 px-10 ml-27 relative">
          <div className="text-3xl h-fit w-fit  hover:bg-[#E7E7E8] rounded-full p-2 cursor-pointer transition-all">
            <FaXTwitter />
          </div>
          <div className="mt-1 text-1xl pr-4">
            <ul>
              {SidbarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-centre gap-4 hover:bg-[#E7E7E8] rounded-full px-4 py-2 w-fit cursor-pointer mt-2 "
                  key={item.title}
                >
                  <span className="text-2xl">{item.icon}</span>{" "}
                  <span> {item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1A8CD8] text-lg font-semibold py-2 px-4 rounded-full w-full ">
                Post
              </button>
            </div>
          </div>
          {user && <div className="absolute bottom-5 flex gap-2 items-center bg-slate-400 px-3 py-2 rounded-xl">
            {user && user.profileImageURL && (
              <Image className="rounded-full"
                src={user?.profileImageURL}
                alt="user-Image"
                height={50}
                width={50}
              />
            )}
            <div>
              <h3 className="text-xl">{user.firstName}</h3>
              <h3 className="text-xl">{user.lastName}</h3>
            </div>
          </div>}
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          {!user && (
            <div className="p-5 bg-[#E7E7E8]">
              <h1 className="my-2 text-2xl"> New to X-twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
