import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';

const Player = createPlayer({ features: videoFeatures });

export function VideoPlayer() {
  return (
    <Player.Provider>
      <VideoSkin poster="https://c8b42fd5-fcba-484a-8a86-42ab247fcc30-00-2fc4x24q6z1os.sisko.replit.dev/uploads/77a2d636-8193-4593-ac28-37ca9f664c8b/index.m3u8">
        <Video src="https://c8b42fd5-fcba-484a-8a86-42ab247fcc30-00-2fc4x24q6z1os.sisko.replit.dev/uploads/77a2d636-8193-4593-ac28-37ca9f664c8b/index.m3u8" playsInline />
      </VideoSkin>
    </Player.Provider>
  );
}