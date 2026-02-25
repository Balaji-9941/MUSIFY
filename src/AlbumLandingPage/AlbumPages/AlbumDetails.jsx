import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaBackwardFast,
  FaCirclePause,
  FaCirclePlay,
  FaVolumeXmark,
} from "react-icons/fa6";
import { FaFastForward } from "react-icons/fa";
import { TfiLoop } from "react-icons/tfi";
import { IoReloadSharp } from "react-icons/io5";
import { FaVolumeHigh } from "react-icons/fa6";

const AlbumDetails = () => {
  const location = useLocation();
  const albumData = location?.state || null;
  const [audio, setAudio] = useState(false);
  const [audioIndex, setAudioIndex] = useState(null);
  const [playButton, setPlayButton] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [sliderValue, setSliderValue] = useState(0);
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(true);
  const [volumes, setVolumes] = useState(1);

  const audioRef = useRef(null);

  const songs = albumData?.songs || [];

  // 🔥 Prevent crash if page refreshed (location.state lost)
  if (!albumData) {
    return (
      <div className="text-white text-2xl p-10">
        Album data not found. Please navigate from album page.
      </div>
    );
  }

  // ⏱️ Proper Time Converter
  function timeConverter(seconds = 0) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remains = Math.floor(seconds % 60);
    return `${minutes}:${remains < 10 ? "0" + remains : remains}`;
  }

  // ⏳ Update time & slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        const seconds = audioRef.current.currentTime || 0;
        setCurrentTime(timeConverter(seconds));
        setSliderValue(seconds);

        // Auto next song safely
        if (
          audioRef.current.duration &&
          seconds >= audioRef.current.duration &&
          audioIndex !== null &&
          audioIndex < songs.length - 1
        ) {
          HandleSongclick(audioIndex + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [audioIndex, songs.length]);

  // ▶️ Play/Pause effect
  useEffect(() => {
    if (audioRef.current) {
      if (playButton) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [playButton]);

  // 🎵 Play selected song
  const HandleSongclick = (index) => {
    if (index < 0 || index >= songs.length) return;

    setAudioIndex(index);
    setAudio(true);
    setPlayButton(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(songs[index]?.url);
    newAudio.volume = volumes;
    newAudio.loop = loop;

    audioRef.current = newAudio;
    newAudio.play().catch(() => {});
  };

  const playAudio = () => {
    setPlayButton((prev) => !prev);
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setSliderValue(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const forward = () => {
    if (audioIndex !== null && audioIndex < songs.length - 1) {
      HandleSongclick(audioIndex + 1);
    }
  };

  const backward = () => {
    if (audioIndex !== null && audioIndex > 0) {
      HandleSongclick(audioIndex - 1);
    }
  };

  const loopHandle = () => {
    const newLoop = !loop;
    setLoop(newLoop);
    if (audioRef.current) {
      audioRef.current.loop = newLoop;
    }
  };

  const handleVolumeSlide = (e) => {
    const value = parseFloat(e.target.value);
    setVolumes(value);
    setVolume(value !== 0);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toggleMute = () => {
    const newVolume = volume ? 0 : 1;
    setVolumes(newVolume);
    setVolume(!volume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <section className="text-white w-full min-h-[calc(100vh-70px)] flex flex-col items-center pt-10 mb-[120px]">
      {/* Album Info */}
      <article className="w-[90%] h-[400px] mt-1 flex bg-gray-900">
        <aside className="basis-[30%] h-full p-5">
          <img
            src={albumData?.albumthumbnail}
            alt="album"
            className="w-full h-full object-cover rounded-md"
          />
        </aside>

        <aside className="basis-[70%] p-5">
          <h1 className="text-5xl font-bold py-3 tracking-wider">
            {albumData?.albumTitle}
          </h1>

          <p>
            <span className="font-semibold text-gray-300">Description: </span>
            {albumData?.albumdescription}
          </p>

          <p>
            <span className="font-semibold text-gray-300">Language: </span>
            {albumData?.albumlang}
          </p>

          <p>
            <span className="font-semibold text-gray-300">Release Date: </span>
            {albumData?.albumDate}
          </p>

          <p>
            <span className="font-semibold text-gray-300">Starcast: </span>
            {albumData?.albumstarcast}
          </p>

          {/* 🔥 FIXED LINE (No Crash) */}
          <p>
            <span className="font-semibold text-gray-300">Music Director:</span>{" "}
            {songs[0]?.songMusicDirector || "N/A"}
          </p>

          <p>
            <span className="font-semibold text-gray-300">
              Number of Tracks:
            </span>{" "}
            {songs.length}
          </p>
        </aside>
      </article>

      {/* Songs Table */}
      <main className="w-[90%] border mt-4">
        <h1 className="text-2xl font-semibold py-3">Songs Collection</h1>

        <table className="bg-gray-900 w-full">
          <thead>
            <tr>
              <th className="p-2">Track No</th>
              <th className="p-2">Thumbnail</th>
              <th className="p-2">Song Name</th>
              <th className="p-2">Singer</th>
              <th className="p-2">Music Director</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Size</th>
            </tr>
          </thead>

          <tbody>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <tr
                  key={index}
                  onClick={() => HandleSongclick(index)}
                  className="border-t border-gray-600 hover:ring-1 cursor-pointer"
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="p-2 flex justify-center">
                    <img
                      src={song?.songThumbnail}
                      alt="thumb"
                      className="w-[100px] h-[60px] rounded"
                    />
                  </td>
                  <td className="text-center">{song?.songTitle}</td>
                  <td className="text-center">{song?.songSinger}</td>
                  <td className="text-center">{song?.songMusicDirector}</td>
                  <td className="text-center">{song?.duration}</td>
                  <td className="text-center">{song?.size}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  Songs collection not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Audio Player */}
      {audio && songs[audioIndex] && (
        <div className="w-full h-40 p-4 fixed flex flex-col justify-center bg-slate-900 bottom-0 left-0">
          <div className="flex justify-between items-center">
            {/* Song Info */}
            <div className="flex gap-3">
              <img
                src={songs[audioIndex]?.songThumbnail}
                alt="img"
                className="rounded-md h-20"
              />
              <div>
                <p className="text-lg font-bold">
                  {songs[audioIndex]?.songTitle}
                </p>
                <p>{songs[audioIndex]?.songSinger}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-5 text-2xl">
              <FaBackwardFast onClick={backward} />
              <span onClick={playAudio}>
                {playButton ? <FaCirclePause /> : <FaCirclePlay />}
              </span>
              <FaFastForward onClick={forward} />
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <span onClick={loopHandle}>
                {loop ? <TfiLoop /> : <IoReloadSharp />}
              </span>
              <span onClick={toggleMute}>
                {volume ? <FaVolumeHigh /> : <FaVolumeXmark />}
              </span>
              <input
                type="range"
                className="w-32"
                value={volumes}
                max="1"
                min="0"
                step="0.1"
                onChange={handleVolumeSlide}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <p>{currentTime}</p>
            <input
              min="0"
              max={audioRef.current?.duration || 0}
              type="range"
              value={sliderValue}
              onChange={handleSliderChange}
              step="0.1"
              className="w-full"
            />
            <p>{timeConverter(audioRef.current?.duration || 0)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AlbumDetails;
