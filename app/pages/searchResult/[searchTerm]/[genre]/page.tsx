"use client";

import { useState, useEffect } from "react";
import TopBar from "@/app/components/TopBar/TopBar";
import { getGamesByQuery } from "@/app/api/igdb/igdbController";
import GameCard from "@/app/components/GameCard/GameCard";
import { Game } from "@/app/interfaces/GameInterface";
import Spacer from "@/app/components/Spacer/Spacer";
import PageButton from "@/app/components/PageButton/PageButton"; // Import the PageButton component
import Throbber from "@/app/components/Throbber/Throbber"; // Import the Throbber component

import HeartButton from "@/app/components/HeartButton/HeartButton";

export default function SearchResultsPage({
  params,
}: {
  params: { searchTerm: string; genre: string };
}) {
  const { searchTerm, genre } = params;

  const decodedSearchTerm = decodeURIComponent(searchTerm);
  const genreIdName = decodeURIComponent(genre).split("+");
  const genreName = genreIdName[1];
  const genreId = genreIdName[0];

  // State hooks
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [page, setPage] = useState(0); // Current page number

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      setFailed(false);
      try {
        const response = await getGamesByQuery(searchTerm, genreId, page);
        const initialGamesData = response || [];

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
  }, [searchTerm, genre, page]); // Include page in the dependency array

  const handleNextPage = () => {
    if (games.length < 10) {
    }
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <TopBar />
      <Spacer />
      <div className="m-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">
          Results for{" "}
          {decodedSearchTerm !== "any" ? decodedSearchTerm : genreName}
        </h1>
        {loading ? (
          <Throbber size={16} />
        ) : failed ? (
          <p>Failed to load games. Please try again later.</p>
        ) : (
          <>
            <div className="flex flex-col w-full md:w-1/4 lg:w-2/3">
              {games.length > 0 ? (
                games.map((game) => (
                  <a
                    key={game.id}
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
                        <h2 className="mt-1 text-3xl text-gray-300">
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

            {/* Pagination Buttons */}
            <div className="flex justify-center">
              {" "}
              {/* Adjust spacing here */}
              <PageButton direction="left" onClick={handlePrevPage} />
              {/* Page Display */}
              <div className="flex-col justify-center content-center">
                <p>Page {page + 1}</p>
              </div>
              {games.length >= 10 && (
                <PageButton direction="right" onClick={handleNextPage} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
