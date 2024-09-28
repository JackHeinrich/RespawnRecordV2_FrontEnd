import { HeartIcon } from "@heroicons/react/solid";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Game } from "@/app/interfaces/GameInterface";
import {
  addGame,
  removeGame,
  getUserById,
} from "@/app/api/auth0/auth0Controller"; // Adjust the import path as needed
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  game: Game;
}

export default function HeartButton({ game }: Props) {
  const { user } = useUser();
  const [isAdded, setIsAdded] = useState(false); // State to track if the game is added
  const [loading, setLoading] = useState(true); // Start loading to check user's games
  const { push } = useRouter();

  // Fetch user's games when the component mounts
  useEffect(() => {
    const checkUserGames = async () => {
      if (user) {
        try {
          const userData = await getUserById(user.user_id); // Fetch user data
          const games = userData.user_metadata.games || []; // Get user's games
          setIsAdded(games.includes(game.id)); // Check if the current game is in the user's games
        } catch (error) {
          console.error("Failed to fetch user games:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // Set loading to false if no user is logged in
      }
    };

    checkUserGames();
  }, [user, game.id]);

  // Function to handle adding/removing the game
  const handleButtonClick = async () => {
    setLoading(true);
    if (!user) {
      push("/api/auth/login");
      return;
    }

    try {
      if (isAdded) {
        await removeGame(user.user_id, game.id); // Use user.sub as the user ID
        setIsAdded(false); // Update the state to reflect the game has been removed
      } else {
        await addGame(user.user_id, game.id); // Use user.sub as the user ID
        setIsAdded(true); // Update the state to reflect the game has been added
      }
    } catch (error) {
      alert(`Failed to ${isAdded ? "remove" : "add"} the game.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`p-2 rounded-full flex items-center justify-center hover:${
        loading
          ? isAdded
            ? "bg-gray-800"
            : "bg-green-800"
          : isAdded
          ? "bg-green-800"
          : "bg-gray-800"
      } ${
        loading
          ? isAdded
            ? "bg-gray-700"
            : "bg-green-600"
          : isAdded
          ? "bg-green-600"
          : "bg-gray-700"
      }`}
      onClick={handleButtonClick}
      disabled={loading} // Disable button while loading
    >
      <HeartIcon
        className={`h-5 w-5 ${isAdded ? "text-white" : "text-gray-300"}`}
      />
    </button>
  );
}
