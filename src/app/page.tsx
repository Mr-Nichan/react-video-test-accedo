"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Playlist from "../components/Playlist";
import VideoPlayer from "../components/VideoPlayer";
import { media } from "../utils/constants";

type VideoProps = {
  description?: string;
  sources: string[];
  subtitle?: string;
  thumb?: string;
  title: string;
};

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState<VideoProps | {}>({});
  const [playlist, setPlaylist] = useState<VideoProps[]>([]);

  useEffect(() => {
    if (media && media.length === 0) return;
    setPlaylist(media);
    setCurrentVideo(media[0]);
  }, []);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };

  const handleAddUrl = (description, source, subtitle, thumb, title) => {
    const newVideo = {
      description,
      sources: [source],
      subtitle,
      thumb,
      title,
    };
    setPlaylist([...playlist, newVideo]);
  };

  return (
    <main className="main-container">
      <VideoPlayer currentVideo={currentVideo} />
      <Playlist
        videos={playlist}
        onVideoSelect={handleVideoSelect}
        onAddUrl={handleAddUrl}
      />
    </main>
  );
}
