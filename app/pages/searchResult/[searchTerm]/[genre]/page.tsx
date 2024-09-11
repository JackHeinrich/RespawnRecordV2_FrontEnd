"use client";

import { useState, useEffect } from "react";
import TopBar from "@/app/components/TopBar/TopBar";
import { getGamesByQuery } from "@/app/api/igdb/igdbController";
import GameCard from "@/app/components/GameCard/GameCard";
import { Game } from "@/app/interfaces/GameInterface";
import Spacer from "@/app/components/Spacer/Spacer";

export default function SearchResultsPage({
  params,
}: {
  params: { searchTerm: string; genre: string };
}) {
  const { searchTerm, genre } = params;

  const decodedSearchTerm = decodeURIComponent(searchTerm);

  const genreIdName = decodeURIComponent(genre).split("+");

  const genreName = genreIdName[1];

  const genreId = decodeURIComponent(genre).split("+")[0];

  // State hooks
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      setFailed(false); // Reset the failed state when fetching starts
      try {
        const response = await getGamesByQuery(searchTerm, genreId);
        const initialGamesData = response || [];

        console.log(initialGamesData);

        if (initialGamesData.length === 0) {
          setFailed(true);
        } else {
          setGames(initialGamesData);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [searchTerm, genre]); // Dependency array

  return (
    <>
      <TopBar />
      <Spacer />
      <div className="m-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">
          Results for{" "}
          {decodedSearchTerm != "any" ? decodedSearchTerm : genreName}
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : failed ? (
          <p>Failed to load games. Please try again later.</p>
        ) : (
          <div className="flex flex-col w-full md:w-1/4 lg:w-2/3">
            {games.length > 0 ? (
              games.map((game) => (
                <a
                  key={game.id} // Add key prop for list rendering
                  className="flex flex-col md:flex-row bg-gray-900 m-4 p-4 rounded-md"
                  href={`/pages/games/${game.id}`}
                >
                  <div className="max-w-96 min-w-96">
                    <GameCard game={game} />
                  </div>
                  <div className="flex flex-col ml-4 max-w-full">
                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-4 mb-2">
                      <h1 className="font-bold text-3xl md:text-4xl">
                        {game.name}
                      </h1>
                      <h2 className="mt-1 text-3xl text-gray-300 font-">
                        {game.first_release_date
                          ? new Date(
                              game.first_release_date * 1000
                            ).getFullYear()
                          : "Unknown"}
                      </h2>
                    </div>
                    <p className="text-base md:text-lg text-gray-400 overflow-auto">
                      {game.summary ? game.summary : "No summary available"}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <p>No games found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
