"use client";

import React, { useEffect, useState } from "react";
import TopBar from "@/app/components/TopBar/TopBar";
import { getUserByNickname } from "@/app/api/auth0/auth0Controller"; // Function to fetch user by nickname
import Spacer from "@/app/components/Spacer/Spacer";
import { useRouter } from "next/navigation"; // Import useRouter
import { UserProfile } from "@/app/interfaces/UserProfileInterface"; // Import your user profile interface

export default function UserResultsPage({
  params,
}: {
  params: { nickname: string };
}) {
  const { nickname } = params;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State to hold the user profile
  const [loading, setLoading] = useState(true); // Loading state for user profile
  const [error, setError] = useState<string | null>(null); // State to handle any error
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const user = await getUserByNickname(nickname); // Fetch user by nickname
        setUserProfile(user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("User not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [nickname]);

  // Show loading message while fetching data
  if (loading) {
    return <p>Loading user data...</p>;
  }

  // Display error message if there is an error
  if (error) {
    return <p>{error}</p>;
  }

  // Check if user data exists
  if (!userProfile) {
    return (
      <div className="flex-col content-center justify-center text-center">
        <h1 className="p-24 text-3xl font-bold">User Not Found</h1>
      </div>
    );
  }

  console.log;

  return (
    <>
      <Spacer />
      <TopBar />
      <div className="flex flex-col items-center p-8">
        <ul className="w-full max-w-md">
          <li
            key={userProfile.user_id}
            className="p-2 border-b cursor-pointer" // Add cursor-pointer for indication
            onClick={() => router.push(`/pages/profile/${userProfile.user_id}`)} // Navigate to the user's profile
          >
            <img
              className="rounded-full w-10 h-10 inline-block mr-2"
              src={userProfile.picture || "/default-profile-image.png"}
              alt={userProfile.nickname || userProfile.email}
            />
            <span>
              {userProfile.user_metadata?.nickname
                ? userProfile.user_metadata?.nickname
                : userProfile.email}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
