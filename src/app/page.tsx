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

  const handleVideoSelect = (videoUrl) => {
    setCurrentVideo(videoUrl);
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
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <div className="z-10 max-w-8xl w-full items-center justify-between font-mono text-sm lg:flex">
        <VideoPlayer currentVideo={currentVideo} />
      </div>
      <div className="z-10 max-w-4xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Playlist onVideoSelect={handleVideoSelect} onAddUrl={handleAddUrl} />
      </div>
    </main>
  );
}
