import { getGameById } from "@/app/api/igdb/igdbController"; // Your API call function
import TopBar from "@/app/components/TopBar/TopBar";
import Spacer from "@/app/components/Spacer/Spacer";
import GameDetails from "@/app/components/GameDetails/GameDetails"; // New Client Component

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
      <Spacer />
      <div className="flex m-8 bg-gray-900 rounded-sm min-w-[750px]">
        <GameDetails gameData={gameData} />
      </div>
    </>
  );
}
