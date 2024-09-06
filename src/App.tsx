import "./App.css";
import { PrismaneProvider } from "@prismane/core";
import AudioPlayer from "./components/AudioPlayer";
import { TelegramProvider } from "./providers/telegram.provider";

function App() {
  return (
    <PrismaneProvider>
      <TelegramProvider>
        <div className="App">
          <div className="player-container">
            <AudioPlayer />
          </div>
        </div>
      </TelegramProvider>
    </PrismaneProvider>
  );
}

export default App;
