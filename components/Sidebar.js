import React from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const spotifyapi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyapi.getAccessToken()) {
      spotifyapi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyapi]);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white hover"
          onClick={() => signOut()}
        >
          <HeartIcon className="h-5 w-5" />
          <p>Log Out</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white hover">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white hover">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white hover">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white hover">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white hover">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white hover">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists... */}
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
        <p className="cursor-pointer hover:text-white">Playlist Name...</p>
      </div>
    </div>
  );
}

export default Sidebar;
