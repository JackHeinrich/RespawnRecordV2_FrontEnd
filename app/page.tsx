import TopBar from "./components/TopBar/TopBar";

import GameBrowser from "./components/GameBrowser/GameBrowser";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <TopBar />
      <h1 className="text-3xl font-bold">Browse Games</h1>
      <GameBrowser />
    </div>
  );
}
