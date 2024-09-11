import { HeartIcon } from "@heroicons/react/solid";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Game } from "@/app/interfaces/GameInterface";

interface Props {
  game: Game;
}

export default function HeartButton({ game }: Props) {
  return (
    <button className="p-2 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
      <HeartIcon className="h-5 w-5 text-white" />
    </button>
  );
}
