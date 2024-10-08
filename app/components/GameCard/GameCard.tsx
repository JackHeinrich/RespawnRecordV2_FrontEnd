import { Game } from "@/app/interfaces/GameInterface";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const defaultImageUrl =
    "https://static.vecteezy.com/system/resources/previews/022/014/063/original/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg";

  return (
    // <a className="m-2" href={`/pages/games/${game.id}`}>
    <div
      className="flex flex-col justify-between items-center border rounded-md shadow-md overflow-hidden" // Adjust the min-height as needed
    >
      <img
        src={
          game.cover?.url
            ? game.cover.url.replace("t_thumb", "t_cover_big_2x")
            : defaultImageUrl
        }
        alt={game.name}
        className="border-white rounded-t-md stretch border-2 w-full h-full" // Increase the height
      />
    </div>
    // <div className="p-2 flex-grow">
    //   <h3 className="text-lg font-semibold text-center">{game.name}</h3>
    // </div>
    // </a>
  );
}
