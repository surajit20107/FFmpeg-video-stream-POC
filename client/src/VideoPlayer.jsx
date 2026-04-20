import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';

const Player = createPlayer({ features: videoFeatures });

export function VideoPlayer() {
  return (
    <Player.Provider>
      <VideoSkin poster="https://c8b42fd5-fcba-484a-8a86-42ab247fcc30-00-2fc4x24q6z1os.sisko.replit.dev/uploads/e3b81746-22f7-427b-8792-4bce98dd3d79/index.m3u8">
        <Video src="https://c8b42fd5-fcba-484a-8a86-42ab247fcc30-00-2fc4x24q6z1os.sisko.replit.dev/uploads/e3b81746-22f7-427b-8792-4bce98dd3d79/index.m3u8" playsInline />
      </VideoSkin>
    </Player.Provider>
  );
}