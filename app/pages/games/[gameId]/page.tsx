import { getGameById } from "@/app/api/igdb/igdbController"; // Your API call function
import TopBar from "@/app/components/TopBar/TopBar";
import Spacer from "@/app/components/Spacer/Spacer";
import HeartButton from "@/app/components/HeartButton/HeartButton";

export default async function GamePage({
  params,
}: {
  params: { gameId: number };
}) {
  // Fetch game data by gameID
  const gameId = params.gameId;
  const gameData = await getGameById(gameId.toString());

  // Base URL for genre search
  const genreBaseUrl = "/pages/searchResult/any"; // Update this based on your routing setup

  return (
    <>
      <TopBar />
      <Spacer />
      <div className="flex m-8 bg-gray-900 rounded-sm min-w-[750px]">
        <div className="m-4">
          {gameData.cover?.url && (
            <img
              src={gameData.cover.url.replace("t_thumb", "t_cover_big_2x")}
              alt={gameData.name}
              className="w-auto h-auto rounded-md border-4 border-black"
            />
          )}
        </div>
        <div className="w-1/2 mt-4 relative">
          {gameData.length !== 0 ? (
            <h1 className="text-2xl font-bold mb-4 flex items-center">
              {gameData.name}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold mb-4 text-red-500">
              Game not found.
            </h1>
          )}
          <p className="mt-4 mb-4 mr-4 text-xl">
            {gameData.summary || "No summary available."}
          </p>
          <p className="mt-2 mb-4 font-semibold">
            Rating:{" "}
            {gameData.total_rating ? gameData.total_rating.toFixed(1) : "N/A"}
          </p>
          <p className="mt-2 mb-4 text-gray-500">
            Released:{" "}
            {gameData.first_release_date
              ? new Date(
                  gameData.first_release_date * 1000
                ).toLocaleDateString()
              : "Unknown"}
          </p>
          <div className="mt-2">
            <strong>Genres:</strong>
            {gameData.genres
              ? gameData.genres.map(
                  (genre: { id: number; name: string }, index: number) => (
                    <a
                      key={genre.id}
                      href={`${genreBaseUrl}/${encodeURIComponent(genre.id)}+${
                        genre.name
                      }`}
                      className="text-blue-500 hover:underline ml-2"
                    >
                      {genre.name +
                        (index !== gameData.genres.length - 1 ? "," : "")}
                    </a>
                  )
                )
              : "N/A"}
          </div>
          <div className="mt-2">
            <HeartButton />
          </div>
        </div>
      </div>
    </>
  );
}
