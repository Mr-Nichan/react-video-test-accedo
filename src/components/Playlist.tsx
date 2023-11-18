import React from "react";

const Playlist = ({ videos, onVideoSelect, onAddUrl }) => {
  if (!videos || videos.length === 0) {
    return <div>No videos in the playlist</div>;
  }

  return (
    <div className="playlist">
      {videos.map((video, index) => (
        <div
          key={index}
          className="playlist-item"
          onClick={() => onVideoSelect(video)}
        >
          <div className="video-title">{video.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
