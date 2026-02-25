import React, { useContext } from "react";
import AlbumSideBar from "./AlbumSideBar";
import AlbumContent from "./AlbumContent";
// import CustomAudioPlayer from "react-modern-audio-player"; // make sure this is installed
import { MyGarage } from "../Context/Authcontext";

const AlbumContainer = () => {
  const {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(MyGarage) || {};

  // Fallback to prevent crash if context is undefined
  const safeSongs = songs || [];
  const safeIsPlaying = isPlaying ?? false;
  const safeCurrentSongIndex = currentSongIndex ?? null;

  return (
    <>
      <section className="w-[100vw] h-[calc(100vh-70px)] flex">
        <AlbumSideBar />
        <AlbumContent />
      </section>

      {safeCurrentSongIndex !== null && safeSongs.length > 0 && (
        <CustomAudioPlayer
          songs={safeSongs}
          isPlaying={safeIsPlaying}
          currentSongIndex={safeCurrentSongIndex}
          onPlayPauseChange={setIsPlaying}
          onSongChange={setCurrentSongIndex}
          songUrlKey="url"
          songNameKey="title"
          songThumbnailKey="thumbnail"
          songSingerKey="singer"
        />
      )}
    </>
  );
};

export default AlbumContainer;
