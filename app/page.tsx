import TopBar from "./components/TopBar/TopBar";

import GameBrowser from "./components/GameBrowser/GameBrowser";
import Spacer from "./components/Spacer/Spacer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <TopBar />
      <Spacer />
      <h1 className="text-3xl font-bold font-franklin">Browse Games</h1>
      <GameBrowser />
    </div>
  );
}
