import "./App.css";
import { Text, PrismaneProvider } from "@prismane/core";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (
    <PrismaneProvider>
      <div className="App">
        <div className="player-container">
          <AudioPlayer />
        </div>
      </div>
    </PrismaneProvider>
  );
}

export default App;
