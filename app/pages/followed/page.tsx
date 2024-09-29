"use client";

import React, { useEffect, useState } from "react";
import TopBar from "@/app/components/TopBar/TopBar";
import { useUser } from "@auth0/nextjs-auth0/client"; // Import the useUser hook for accessing user info
import { UserProfile } from "@/app/interfaces/UserProfileInterface"; // Adjust the import path as needed
import { getUserById } from "@/app/api/auth0/auth0Controller"; // Import your function to get user data
import Spacer from "@/app/components/Spacer/Spacer";
import { useRouter } from "next/navigation"; // Import useRouter

export default function FollowedPage() {
  const { user, isLoading, error } = useUser(); // Get the Auth0 user object
  const [followed, setFollowed] = useState<UserProfile[]>([]); // State to hold followed
  const [loadingFollowed, setLoadingFollowed] = useState(true); // Loading state for followed
  const router = useRouter(); // Initialize the router

  // Function to fetch the user's followed
  const fetchFollowed = async () => {
    if (user?.user_id) {
      try {
        const fetchedUser = await getUserById(user.user_id as string); // Fetch current user data
        const followedIds = fetchedUser.user_metadata?.followed_users || []; // Get the followed IDs

        console.log(user.user_id);

        // Fetch details for each followed
        const followedDetails = await Promise.all(
          followedIds.map(async (followedId: string) => {
            if (followedId != "undefined") {
              const followed = await getUserById(followedId); // Fetch each followed's details
              return followed;
            }
          })
        );

        setFollowed(followedDetails); // Set the followed details in state
      } catch (err) {
        console.error("Failed to fetch followed:", err);
      } finally {
        setLoadingFollowed(false); // Set loading state to false
      }
    }
  };

  // Use effect to fetch followed when the user is available
  useEffect(() => {
    if (user) {
      fetchFollowed();
    }
  }, [user]);

  // Check if user is loading
  if (isLoading || loadingFollowed) {
    return <p>Loading followed...</p>;
  }

  // Handle any error that may have occurred while fetching user data
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Check if there are followed users
  if (followed.length === 0) {
    return (
      <>
        <Spacer />
        <TopBar />
        <div className="flex-col content-center justify-center text-center">
          <h1 className="p-24 text-3xl font-bold">No Followed Users</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Spacer />
      <TopBar />
      <div className="flex flex-col items-center p-8">
        <h1 className="text-xl font-bold mb-4">Followed</h1>
        <ul className="w-full max-w-md">
          {followed.map((followed_user) => (
            <li
              key={followed_user.user_id}
              className="p-2 border-b cursor-pointer" // Add cursor-pointer for indication
              onClick={() =>
                router.push(`/pages/profile/${followed_user.user_id}`)
              } // Navigate to the user's profile
            >
              <img
                className="rounded-full w-10 h-10 inline-block mr-2"
                src={followed_user.picture || "/default-profile-image.png"}
                alt={
                  followed_user.user_metadata?.nickname || followed_user.email
                }
              />
              <span>
                {followed_user.user_metadata?.nickname || followed_user.email}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
