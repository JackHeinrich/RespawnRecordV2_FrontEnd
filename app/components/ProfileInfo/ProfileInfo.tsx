import FollowButton from "../FollowButton/FollowButton";
import { useUser } from "@auth0/nextjs-auth0/client";

interface User {
  picture?: string | null; // Allow picture to be string, null, or undefined
  name?: string | null;
}

interface Props {
  profileUser: User;
}

export default function ProfileInfo({ profileUser }: Props) {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading user information</p>;
  }

  return (
    <div className="flex w-full justify-center items-center gap-8 p-8">
      <img
        className="rounded-full w-40 h-40"
        src={profileUser.picture || "/default-profile-image.png"} // Provide a default image
        alt="User Picture"
      />
      <h1 className="text-center text-lg font-semibold">{profileUser.name}</h1>
      {user?.name !== profileUser.name && (
        <div className="flex flex-col items-center justify-center">
          <FollowButton />
        </div>
      )}
    </div>
  );
}
