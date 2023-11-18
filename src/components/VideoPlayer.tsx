import React, { useEffect, useState, useRef } from "react";

const VideoPlayer = ({ currentVideo }) => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    if (currentVideo?.sources?.length > 0) {
      setVideoUrl(currentVideo.sources[0]);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  }, [currentVideo]);

  if (!currentVideo || videoUrl.length === 0) {
    return <div>No video selected</div>;
  }

  return (
    <div className="video-player">
      <video ref={videoRef} width="100%" controls={true}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
