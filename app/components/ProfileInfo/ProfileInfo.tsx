import FollowButton from "../FollowButton/FollowButton";

interface User {
  picture?: string | null; // Allow picture to be string, null, or undefined
  name?: string | null;
}

interface Props {
  user: User;
}

export default function ProfileInfo({ user }: Props) {
  return (
    <div className="flex w-full justify-center items-center gap-8 p-8">
      <img
        className="rounded-full w-40 h-40"
        src={user.picture || "/default-profile-image.png"} // Provide a default image
        alt="User Picture"
      />
      <h1 className="text-center text-lg font-semibold">{user.name}</h1>
      <div className="flex flex-col items-center justify-center">
        <FollowButton />
      </div>
    </div>
  );
}
