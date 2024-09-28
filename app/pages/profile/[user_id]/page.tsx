"use client"; // Ensures that this component is rendered on the client side

import { useEffect, useState } from "react";
import TopBar from "../../../components/TopBar/TopBar";
import ProfileInfo from "@/app/components/ProfileInfo/ProfileInfo";
import Spacer from "@/app/components/Spacer/Spacer";
import GameDisplayCard from "@/app/components/GameDisplayCard/GameDisplayCard"; // Import GameDisplayCard component

import { getUserById } from "@/app/api/auth0/auth0Controller"; // Import the function
import { getGameById } from "@/app/api/igdb/igdbController"; // Import the function to get game details
import { UserProfile } from "@/app/interfaces/UserProfileInterface";
import { Game } from "@/app/interfaces/GameInterface"; // Import Game interface if needed

export default function Profile({ params }: { params: { user_id: string } }) {
  const { user_id } = params; // Grab the dynamic user_id from the route

  // Decode the user_id to ensure it's in the correct format
  const decodedUserId = decodeURIComponent(user_id); // Decode the URL-encoded user_id

  const [userData, setUserData] = useState<UserProfile | null>(null); // Use the Profile interface
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track any errors
  const [gamesData, setGamesData] = useState<Game[]>([]); // Store fetched game data

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getUserById(decodedUserId); // Use the decoded user_id
        setUserData(data); // Set the user profile data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred"); // Set error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    }

    if (decodedUserId) {
      fetchUserData();
    }
  }, [decodedUserId]);

  useEffect(() => {
    async function fetchGames() {
      if (userData?.user_metadata?.games) {
        const gamesPromises = userData.user_metadata.games.map(
          (gameId: number) => getGameById(String(gameId))
        );
        const gamesResults = await Promise.all(gamesPromises);
        // Flatten the results in case getGameById returns an array
        setGamesData(gamesResults.flat());
      }
    }

    if (userData) {
      fetchGames();
    }
  }, [userData]);

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>; // Display any error messages
  }

  return (
    <>
      <Spacer />
      <TopBar />
      <ProfileInfo profileUser={userData} />{" "}
      {/* Pass the fetched user data to ProfileInfo */}
      <div className="bg-gray-900 flex flex-col gap-8 items-center p-4">
        <h1 className="font-bold">Games Played</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gamesData.map((game) => (
            <GameDisplayCard
              key={game.id}
              gameId={game.id}
              gameName={game.name}
              gameImage={game.cover?.url.replace("t_thumb", "t_cover_big_2x")} // Adjust to get a higher resolution image
            />
          ))}
        </div>
      </div>
    </>
  );
}
