import { getGameById } from "@/app/api/igdb/igdbController"; // Your API call function
import TopBar from "@/app/components/TopBar/TopBar";

export default async function GamePage({
  params,
}: {
  params: { gameId: number };
}) {
  // Fetch game data by gameID
  const gameId = params.gameId;
  const gameData = await getGameById(gameId.toString());

  return (
    <>
      <TopBar />
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
        <div className="w-1/2 mt-4">
          {gameData.length != 0 ? (
            <h1 className="text-2xl font-bold mb-4">{gameData.name}</h1>
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
            <strong>Genres:</strong>{" "}
            {gameData.genres
              ? gameData.genres.map((g) => g.name).join(", ")
              : "N/A"}
          </div>
        </div>
      </div>
    </>
  );
}
