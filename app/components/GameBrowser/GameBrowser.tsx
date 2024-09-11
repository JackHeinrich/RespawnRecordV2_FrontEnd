"use client";

import { useEffect, useState } from "react";
import { getFrontPageGames } from "@/app/api/igdb/igdbController";
import { Game } from "@/app/interfaces/GameInterface";
import GameCard from "../GameCard/GameCard";
import PageButton from "../PageButton/PageButton";
import Throbber from "../Throbber/Throbber";

export default function GameBrowser() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<Game[]>([]);
  const [prevPage, setPrevPage] = useState<Game[]>([]);
  const [waitingForGames, setWaitingForGames] = useState<boolean>(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      setFailed(false); // Reset the failed state when fetching starts
      try {
        const initialGamesData = await getFrontPageGames(page);
        const initialNextPageData = await getFrontPageGames(page + 1);

        if (initialGamesData.length == 0) {
          setFailed(true);
        }

        setGames(initialGamesData);
        setNextPage(initialNextPageData);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []); // Adding page as dependency to refetch data when it changes

  const fetchPageData = async (pageNumber: number) => {
    try {
      if (pageNumber > 0) {
        const prevPageData = await getFrontPageGames(pageNumber - 1);
        setPrevPage(prevPageData);
      }
      const nextPageData = await getFrontPageGames(pageNumber + 1);
      setNextPage(nextPageData);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const scrollLeft = async () => {
    if (waitingForGames || page <= 0) {
      return;
    }
    setWaitingForGames(true);
    try {
      setNextPage(games);
      setGames(prevPage);
      setPage(page - 1);
      await fetchPageData(page - 1);
    } finally {
      setWaitingForGames(false);
    }
  };

  const scrollRight = async () => {
    if (waitingForGames || nextPage.length < 4) {
      return;
    }
    setWaitingForGames(true);
    try {
      setPrevPage(games);
      setGames(nextPage);
      setPage(page + 1);
      await fetchPageData(page + 1);
    } finally {
      setWaitingForGames(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-9/12">
      {!loading && !failed && (
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-center font-semibold text-2xl mr-4">
            Page {page + 1}
          </h2>
          {waitingForGames && <Throbber size={8} />}
        </div>
      )}
      <div className="flex relative p-4">
        {!loading && !failed && (
          <div className="flex-col">
            <div className="h-1/3" />
            <PageButton direction="left" onClick={scrollLeft} />
          </div>
        )}
        {failed ? (
          <div className="flex items-center justify-center w-full h-40 text-xl font-bold text-red-500">
            Failed to load games. Please try again later.
          </div>
        ) : loading ? (
          <Throbber size={16} />
        ) : (
          <div className="flex flex-grow overflow-x-auto scrollbar-hide">
            {games.map((game, id) => (
              <a
                key={id}
                className="m-2 flex flex-col"
                href={`/pages/games/${game.id}`}
              >
                <GameCard game={game} />
                <h3 className="font-semibold  text-center text-2xl mt-2">
                  {game.name}
                </h3>
              </a>
            ))}
          </div>
        )}
        {!loading && !failed && (
          <div className="flex-col">
            <div className="h-1/3" />
            <PageButton direction="right" onClick={scrollRight} />
          </div>
        )}
      </div>
    </div>
  );
}
