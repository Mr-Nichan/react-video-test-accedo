import React, { useState } from "react";
import Modal from "react-modal";
import AddVideoForm from "./AddVideoForm";

type Video = {
  description?: string;
  sources: string[];
  subtitle?: string;
  thumb?: string;
  title: string;
};

// Define a type for the component props
type PlaylistProps = {
  videos: Video[];
  currentlyPlaying: number;
  setCurrentlyPlaying: (index: number) => void;
  onVideoSelect: (video: Video, index: number) => void;
  onAddVideo: (source: string, title: string, subtitle?: string) => void;
  onRemoveVideo: (index: number) => void;
};

const Playlist: React.FC<PlaylistProps> = ({
  videos,
  currentlyPlaying,
  onVideoSelect,
  onAddVideo,
  onRemoveVideo,
}) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  if (!videos || videos.length === 0) {
    return <div>No videos in the playlist</div>;
  }

  const customModalStyles = {
    content: {
      top: "15%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -20%)",
      backgroundColor: "#eee",
    },
  };

  return (
    <div className="playlist">
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
        style={customModalStyles}
        contentLabel="Add video URL"
      >
        <AddVideoForm
          onSubmit={onAddVideo}
          onRequestClose={() => setAddModalOpen(false)}
        />
      </Modal>
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
          key={index}
          className={
            "playlist-item" + (currentlyPlaying === index ? " playing" : "")
          }
          onClick={() => onVideoSelect(video, index)}
        >
          <div className="playlist-thumbnail">
            <img src="https://placehold.co/120x80" alt={video.title} />
          </div>
          <div className="playlist-details">
            <div
              className={
                "video-title" +
                (currentlyPlaying === index ? " video-title-playing" : "")
              }
            >
              {`${index + 1}. ${video.title}`}
            </div>
            <div className="video-subtitle">{video.subtitle}</div>
          </div>
          <div className="playlist-remove-button">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveVideo(index);
              }}
            >
              REMOVE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
