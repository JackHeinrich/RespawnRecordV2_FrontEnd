import Link from "next/link";

interface Props {
  gameId: number;
  gameName: string;
  gameImage: string; // URL of the game's image
}

export default function GameDisplayCard({
  gameId,
  gameName,
  gameImage,
}: Props) {
  return (
    <Link href={`/pages/games/${gameId}`}>
      <div className="relative group w-64 h-80 bg-gray-800 rounded-lg overflow-hidden border-4 border-gray-700 hover:border-blue-500 transition-all duration-300">
        <img
          src={gameImage}
          alt={gameName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
          {gameName}
        </div>
      </div>
    </Link>
  );
}
