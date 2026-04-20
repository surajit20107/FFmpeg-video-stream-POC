import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_URL = "/uploads/9778e0e6-87b1-4aef-aa85-8a3e1d40fe96/index.m3u8"

export function VideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      }
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_URL;
    }
  }, [])
  
  return (
    <video
      ref={videoRef}
      controls
      // autoPlay
      style={{
        width: "100%",
        maxWidth: "800px",
      }}
      />
  );
}