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
  const [currentVideo, setCurrentVideo] = useState<VideoProps | null>(null);
  const [playlist, setPlaylist] = useState<VideoProps[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number>(0);

  useEffect(() => {
    if (media && media.length === 0) return;
    setPlaylist(media);
    setCurrentVideo(media[0]);
  }, []);

  const handleVideoSelect = (video: VideoProps, index: number): void => {
    setPlayingIndex(index);
    setCurrentVideo(video);
  };

  const handleNextVideo = () => {
    const nextIndex = playingIndex + 1;
    if (nextIndex < playlist.length) {
      setPlayingIndex(nextIndex);
      setCurrentVideo(playlist[nextIndex]);
    }
  };

  const handlePreviousVideo = () => {
    const previousIndex = playingIndex - 1;
    if (previousIndex >= 0) {
      setPlayingIndex(previousIndex);
      setCurrentVideo(playlist[previousIndex]);
    }
  };

  const handleAddVideo = (
    source: string,
    title: string,
    subtitle?: string
  ): void => {
    const newVideo = {
      description: "",
      sources: [source],
      subtitle,
      thumb: "",
      title,
    };
    setPlaylist([...playlist, newVideo]);
  };

  const handleRemoveVideo = (index: number): void => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  };

  return (
    <main className="main-container">
      <VideoPlayer
        currentVideo={currentVideo}
        toggleNext={handleNextVideo}
        togglePrevious={handlePreviousVideo}
      />
      <Playlist
        videos={playlist}
        onVideoSelect={handleVideoSelect}
        onAddVideo={handleAddVideo}
        onRemoveVideo={handleRemoveVideo}
        currentlyPlaying={playingIndex}
        setCurrentlyPlaying={setPlayingIndex}
      />
    </main>
  );
}
