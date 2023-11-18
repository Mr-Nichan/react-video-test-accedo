import React, { useState } from "react";

const Playlist = ({ videos, onVideoSelect, onAddVideo }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  if (!videos || videos.length === 0) {
    return <div>No videos in the playlist</div>;
  }

  return (
    <div className="playlist">
      <div>
        <button
          style={{ backgroundColor: "#555555", marginBottom: "10px" }}
          onClick={() => setAddModalOpen(true)}
        >
          ADD VIDEO
        </button>
      </div>
      {videos.map((video, index) => (
        <div
          key={video.id || index} // Assuming each video has a unique 'id'
          className="playlist-item"
          onClick={() => onVideoSelect(video)}
        >
          <div className="playlist-thumbnail">
            <img src="https://placehold.co/120x80" alt={video.title} />
          </div>
          <div className="playlist-details">
            <div className="video-title">{`${index + 1}. ${video.title}`}</div>
            <div className="video-subtitle">{video.subtitle}</div>
          </div>
          <div className="playlist-remove-button">X</div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
