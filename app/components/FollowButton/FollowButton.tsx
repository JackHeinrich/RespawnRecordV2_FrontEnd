import { useEffect, useState } from "react"; // Import necessary hooks
import { useUser } from "@auth0/nextjs-auth0/client"; // For accessing user info
import { UserProfile } from "@/app/interfaces/UserProfileInterface"; // Adjust the import path as needed
import {
  followUser,
  unfollowUser,
  getUserById,
} from "@/app/api/auth0/auth0Controller"; // Import your functions

interface Props {
  otherUserId: string; // The user ID to follow/unfollow
}

import { useRouter } from "next/navigation";

export default function FollowButton({ otherUserId }: Props) {
  const { user, isLoading, error: userError } = useUser(); // Get the Auth0 user object
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null); // State to hold the current user data
  const [otherUser, setOtherUser] = useState<UserProfile | null>(null); // State to hold the other user data
  const [error, setError] = useState<string | null>(null); // Error state for other user
  const [isLoadingStateChange, setIsLoadingStateChange] = useState(false);
  const { push } = useRouter();

  // Fetch the current user details
  const fetchCurrentUser = async () => {
    if (user?.user_id) {
      try {
        const fetchedCurrentUser = await getUserById(user.user_id); // Fetch current user data
        setCurrentUser(fetchedCurrentUser); // Update state with the current user data
      } catch (err) {
        console.error("Failed to fetch current user data:", err);
        setError("Failed to fetch current user data");
      }
    }
  };

  // Fetch the other user details
  const fetchOtherUser = async () => {
    if (otherUserId) {
      try {
        const fetchedUser = await getUserById(otherUserId); // Fetch the other user data
        setOtherUser(fetchedUser); // Update state with the other user data
      } catch (err) {
        console.error("Failed to fetch other user data:", err);
        setError("Failed to fetch other user data");
      }
    }
  };

  // Use effect to fetch current user
  useEffect(() => {
    fetchCurrentUser();
  }, [user]);

  // Use effect to fetch other user
  useEffect(() => {
    fetchOtherUser();
  }, [otherUserId]);

  // Ensure user and otherUser are available
  if (isLoading) {
    return (
      <button
        disabled
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Loading...
      </button>
    );
  }
  if (userError || error) {
    return (
      <button
        disabled
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Error
      </button>
    );
  }

  // Check if the current user is following the other user
  const isFollowing =
    currentUser &&
    currentUser.user_metadata?.followed_users?.includes(otherUser?.user_id);

  const handleFollowUnfollow = async () => {
    if (!user) {
      push("/api/auth/login");
    }

    if (isLoadingStateChange) {
      return; // Prevent further clicks while loading
    }

    setIsLoadingStateChange(true); // Set loading state immediately

    try {
      if (isFollowing) {
        // Handle unfollow logic here
        console.log(`Unfollow ${otherUser?.user_id}`);
        await unfollowUser(currentUser.user_id, otherUser?.user_id); // Call the unfollow function
        console.log(`Successfully unfollowed ${otherUser?.user_id}`);
      } else {
        // Call the follow function to follow the user
        console.log(`Follow ${otherUser?.user_id}`);
        await followUser(currentUser.user_id, otherUser?.user_id); // Use the current user ID
        console.log(`Successfully followed ${otherUser?.user_id}`);
      }
    } catch (error) {
      console.error(
        `Failed to ${isFollowing ? "unfollow" : "follow"} user: ${error}`
      );
    } finally {
      // Refetch both users after following/unfollowing
      await Promise.all([fetchCurrentUser(), fetchOtherUser()]);
      setIsLoadingStateChange(false); // Reset loading state
    }
  };

  return (
    <button
      className={`font-bold py-2 px-4 rounded-full ${
        isLoadingStateChange
          ? isFollowing
            ? "bg-blue-500 hover:bg-blue-700"
            : "bg-gray-400 hover:bg-gray-600"
          : isFollowing
          ? "bg-gray-400 hover:bg-gray-600"
          : "bg-blue-500 hover:bg-blue-700"
      } text-white`}
      onClick={handleFollowUnfollow}
      disabled={isLoadingStateChange} // Disable button while loading
    >
      {isLoadingStateChange
        ? isFollowing
          ? "Follow"
          : "Unfollow"
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
}
