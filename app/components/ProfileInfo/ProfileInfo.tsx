// Import necessary hooks and components
import { useUser } from "@auth0/nextjs-auth0/client"; // Import the useUser hook for accessing user info
import { UserProfile } from "@/app/interfaces/UserProfileInterface";
import FollowButton from "../FollowButton/FollowButton"; // Adjust the import path as needed
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface Props {
  profileUser: UserProfile | null; // Profile object is passed as a prop
}

export default function ProfileInfo({ profileUser }: Props) {
  const { user, isLoading, error } = useUser(); // Get the Auth0 user object
  const router = useRouter(); // Initialize router for navigation

  // Check if user is loading
  if (isLoading) {
    return <p>Loading user profile...</p>;
  }

  // Handle any error that may have occurred while fetching user data
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Check if profileUser is null
  if (!profileUser) {
    return <p>No profile data available.</p>;
  }

  // Determine whether to show the follow button or the followers button
  const isOwnProfile = user && user.sub === profileUser.user_id; // Check if the logged-in user is viewing their own profile
  const showFollowButton = !isOwnProfile; // Show follow button only if it's not the user's own profile

  return (
    <div className="flex w-full justify-center items-center gap-8 p-8">
      <img
        className="rounded-full w-40 h-40"
        src={profileUser.picture || "/default-profile-image.png"} // Provide a default image
        alt="User Picture"
      />
      <div className="flex-col flex justify-center content-center gap-2">
        <h1 className="text-center text-lg font-semibold">
          {profileUser.user_metadata.nickname
            ? profileUser.user_metadata.nickname
            : profileUser.email}
        </h1>
        {/* Conditionally render the FollowButton component or Followers button */}
        {showFollowButton ? (
          <FollowButton otherUserId={profileUser.user_id} /> // Pass the userId to the FollowButton
        ) : (
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/pages/followed")} // Navigate to followers page
          >
            Followed Users
          </button>
        )}
      </div>
    </div>
  );
}
