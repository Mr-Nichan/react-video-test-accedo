import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import PlayIcon from "../assets/icons/play.svg";
import PauseIcon from "../assets/icons/pause.svg";
import ForwardIcon from "../assets/icons/forward.svg";
import BackwardIcon from "../assets/icons/backward.svg";
import NextIcon from "../assets/icons/next.svg";
import PreviousIcon from "../assets/icons/previous.svg";

type Video = {
  sources: string[];
};
interface VideoPlayerProps {
  currentVideo: Video | null;
  toggleNext: () => void;
  togglePrevious: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentVideo,
  toggleNext,
  togglePrevious,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentVideo && currentVideo?.sources?.length > 0) {
      setVideoUrl(currentVideo.sources[0]);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }
  }, [currentVideo]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  if (!currentVideo || videoUrl.length === 0) {
    return <div>No video selected</div>;
  }

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        controls={false}
        width="100%"
        height="100%"
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-controls">
        <button className="video-button" onClick={togglePrevious}>
          <Image priority src={PreviousIcon} alt="Previous" />
        </button>
        <button className="video-button" onClick={handleBackward}>
          <Image priority src={BackwardIcon} alt="Backward" />
        </button>
        <button className="video-button" onClick={togglePlay}>
          {isPlaying ? (
            <Image priority src={PauseIcon} alt="Pause" />
          ) : (
            <Image priority src={PlayIcon} alt="Play" />
          )}
        </button>
        <button className="video-button" onClick={handleForward}>
          <Image priority src={ForwardIcon} alt="Forward" />
        </button>
        <button className="video-button" onClick={toggleNext}>
          <Image priority src={NextIcon} alt="Next" />
        </button>
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
};

export default VideoPlayer;
