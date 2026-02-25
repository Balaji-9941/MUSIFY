import React, { useContext, useState } from "react";
import { _DB } from "../../Backend/Firebase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const CreateAlbumn = () => {
  let [albumData, setalbumData] = useState({
    albumtitle: "",
    albumdate: "",
    albumstarcast: "",
    albumdescription: "",
    albumlang: "",
    albumtype: "",
    albumthumbnail: "",
    songscounts: "",
    albumdirector: "",
    songs: [],
  });

  let {
    albumtitle,
    albumdate,
    albumstarcast,
    albumdescription,
    albumlang,
    albumtype,
    albumthumbnail,
    songscounts,
    albumdirector,
  } = albumData;

  function handleChange(e) {
    setalbumData({ ...albumData, [e.target.name]: e.target.value });
  }

  let [songdetails, setSongDetails] = useState([
    {
      songtitle: "",
      songsinger: "",
      songmusicdirector: "",
      songthumbnail: "",
      songaudio: "",
    },
  ]);
  let { songtitle, songsinger, songmusicdirector, songthumbnail, songaudio } =
    songdetails;
  function handleSongChange(e, index) {
    let name = e.target.name;
    let value = e.target.value;
    let newSongdata = [...songdetails];
    newSongdata[index][name] = value;
    setSongDetails(newSongdata);
  }
  function handleThumbnailChange(e) {
    let file = e.target.files[0];
    setalbumData({
      ...albumData,
      albumthumbnail: file,
    });
  }
  function handleSongFileChange(e, index) {
    let file = e.target.files[0];
    let name = e.target.name;
    let newSongFile = [...songdetails];
    newSongFile[index][name] = file;
    setSongDetails(newSongFile);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let AlbumResponseResult;
      if (albumthumbnail) {
        let AlbumData = new FormData();
        AlbumData.append("file", albumthumbnail);
        AlbumData.append("upload_preset", "Music_Musify");
        AlbumData.append("cloud_name", "djpxfxwtr");

        let Albumresponse = await fetch(
          "https://api.cloudinary.com/v1_1/djpxfxwtr/image/upload",
          { method: "POST", body: AlbumData }
        );
        AlbumResponseResult = await Albumresponse.json();
        console.log(AlbumResponseResult.url);
      }
      let songData = [];
      await Promise.all(
        songdetails.map(async (song, index) => {
          let songThumbnailUrl = "";
          if (song.songthumbnail) {
            let songThumbnailData = new FormData();
            songThumbnailData.append("file", song.songthumbnail);
            songThumbnailData.append("upload_preset", "Music_Musify");
            songThumbnailData.append("cloud_name", "djpxfxwtr");

            let songThumbnailresponse = await fetch(
              "https://api.cloudinary.com/v1_1/djpxfxwtr/image/upload",
              { method: "POST", body: songThumbnailData }
            );
            let songThumbnailresponseResult =
              await songThumbnailresponse.json();
            songThumbnailUrl = songThumbnailresponseResult.url;
            console.log(songThumbnailresponseResult.url);
          }
          let songObjectData = {};
          if (song.songaudio) {
            let songAudioData = new FormData();
            songAudioData.append("file", song.songaudio);
            songAudioData.append("upload_preset", "Music_Musify");
            songAudioData.append("cloud_name", "djpxfxwtr");

            let songAudioresponse = await fetch(
              "https://api.cloudinary.com/v1_1/djpxfxwtr/upload",
              { method: "POST", body: songAudioData }
            );
            let songAudioresponseResult = await songAudioresponse.json();
            console.log(songAudioresponseResult.url);
            songObjectData = {
              id: songAudioresponseResult.asset_id,
              url: songAudioresponseResult.url,
              duration: (() => {
                const seconds = Math.floor(songAudioresponseResult.duration);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return `${minutes}:${remainingSeconds
                  .toString()
                  .padStart(2, "0")}`;
              })(),
              size:
                (songAudioresponseResult.bytes / (1024 * 1024)).toFixed(2) +
                " MB",
            };
          }
          songData.push({
            ...songObjectData,
            songTitle: song.songtitle,
            songSinger: song.songsinger,
            songMusicDirector: song.songmusicdirector,
            songThumbnail: songThumbnailUrl,
          });
          console.log(songData);
        })
      );

      let payLoad = {
        ...albumData,
        songs: songData,
        albumthumbnail: AlbumResponseResult.url || "",
      };
      let AlbumCollection = collection(_DB, "Music_Musify");
      await addDoc(AlbumCollection, payLoad);
      toast.success("Album created succesfully");
      console.log(payLoad);
    } catch (err) {
      toast.error(err.message);
    }
  }
  function addSong() {
    setSongDetails([
      ...songdetails,
      {
        songtitle: "",
        songsinger: "",
        songmusicdirector: "",
        songthumbnail: "",
        songaudio: "",
      },
    ]);
  }
  function removeSong(index) {
    let newSongs = songdetails.filter((song, i) => index !== i);
    setSongDetails(newSongs);
  }
  return (
    <section className="flex items-center pt-5 flex-col">
      <header>
        <h1 className="text-3xl text-purple-600 font-bold mb-4">Add Song</h1>
      </header>
      <main>
        <form
          action=""
          className=" p-5 w-[70vw]  rounded-md bg-slate-950"
          onSubmit={handleSubmit}
        >
          <section className=" rounded-2xl p-3 ">
            <div className="flex gap-3 mb-3  bg-slate-900 p-3 rounded-md ">
              <div className="py-2 w-1/3 flex flex-col pt-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100"
                >
                  Title:
                </label>
                <input
                  type="text"
                  name="albumtitle"
                  value={albumtitle}
                  id="title"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white"
                  onChange={handleChange}
                />
              </div>
              <div className="py-2 flex  w-1/3 flex-col">
                <label
                  htmlFor="lang"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100 "
                >
                  Language:
                </label>
                <input
                  type="text"
                  name="albumlang"
                  value={albumlang}
                  onChange={handleChange}
                  id="lang"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white  "
                />
              </div>
              <div className="py-2 flex  w-1/3 flex-col">
                <label
                  htmlFor="albumType"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100 "
                >
                  Album Type:
                </label>
                <input
                  type="text"
                  value={albumtype}
                  onChange={handleChange}
                  name="albumtype"
                  id="albumType"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white  "
                />
              </div>
            </div>
            <div className="flex gap-3 mb-3  bg-slate-900 p-3 rounded-md">
              <div className="py-2 w-1/3 flex  flex-col">
                <label
                  htmlFor="daterelease"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100"
                >
                  Date Release:
                </label>
                <input
                  type="date"
                  name="albumdate"
                  value={albumdate}
                  onChange={handleChange}
                  id="daterelease"
                  className="p-2 rounded-sm text-white border-gray-500 border outline-none placeholder:text-white"
                />
              </div>

              <div className="py-2 flex  w-1/3 flex-col">
                <label
                  htmlFor="starcast"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100 "
                >
                  Starcast:
                </label>
                <input
                  type="starcast"
                  name="albumstarcast"
                  value={albumstarcast}
                  onChange={handleChange}
                  id="state"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white  "
                />
              </div>
              <div className="py-2 flex  w-1/3 flex-col">
                <label
                  htmlFor="Thumbnail"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100 "
                >
                  Thumbnail:
                </label>
                <input
                  type="file"
                  name="albumthumbnail"
                  // value={albumthumbnail}
                  onChange={handleThumbnailChange}
                  id="Thumbnail"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white file:bg-slate-200 "
                />
              </div>
            </div>

            <div className="flex gap-3 mb-3 bg-slate-900 p-3 rounded-md">
              {/* //!Third row */}
              <div className="py-2 w-1/3 flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100 "
                >
                  Description :
                </label>

                <textarea
                  name="albumdescription"
                  id="description"
                  value={albumdescription}
                  onChange={handleChange}
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white "
                  rows={1}
                ></textarea>
              </div>
              <div className="py-2 flex w-1/3 flex-col">
                <label
                  htmlFor="director"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100"
                >
                  Director:
                </label>
                <input
                  type="director"
                  name="albumdirector"
                  value={albumdirector}
                  onChange={handleChange}
                  id="state"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white"
                />
              </div>
              <div className="py-2 flex  w-1/4 flex-col">
                <label
                  htmlFor="numberofsongs"
                  className="text-sm font-medium leading-5 tracking-wider text-gray-100 "
                >
                  No of Songs:
                </label>
                <input
                  type="text"
                  name="songscounts"
                  value={songscounts}
                  onChange={handleChange}
                  id="numberofsongs"
                  className=" p-2 rounded-sm text-white border-gray-500 border outline-none  placeholder:text-white  "
                />
              </div>
            </div>
            {/* <div className="pt-4 text-center p-3">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-green-600">
                AddProfile
              </button>
            </div> */}
          </section>

          <h1 className="text-2xl font-bold text-white text-center ">
            Add Songs
          </h1>
          {songdetails.map((song, index) => {
            return (
              <section
                key={index}
                className="text-white w-full flex flex-col gap-3 mt-10"
              >
                <div className="flex p-2 gap-15">
                  <div className="flex flex-col w-1/3">
                    <label htmlFor="songtitle">Song Title:</label>
                    <input
                      type="text"
                      id="songtitle"
                      name="songtitle"
                      value={songtitle}
                      onChange={(e) => handleSongChange(e, index)}
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label htmlFor="songsinger">Song Singer:</label>
                    <input
                      type="text"
                      id="songsinger"
                      name="songsinger"
                      value={songsinger}
                      onChange={(e) => handleSongChange(e, index)}
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label htmlFor="songmusicdirector">Music Director:</label>
                    <input
                      type="text"
                      id="songmusicdirector"
                      name="songmusicdirector"
                      value={songmusicdirector}
                      onChange={(e) => handleSongChange(e, index)}
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex p-2 gap-15">
                  <div className="flex flex-col w-1/2 ">
                    <label htmlFor="songthumbnail">Song Thumbnail</label>
                    <input
                      type="file"
                      id="songthumbnail"
                      name="songthumbnail"
                      onChange={(e) => handleSongFileChange(e, index)}
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none file:border file:rounded-md file:px-3 file:bg-slate-500"
                    />
                  </div>
                  <div className="flex flex-col w-1/2 ">
                    <label htmlFor="songaudio">Song Audio</label>
                    <input
                      type="file"
                      id="songaudio"
                      name="songaudio"
                      onChange={(e) => handleSongFileChange(e, index)}
                      className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none file:border file:rounded-md file:px-3 file:bg-slate-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="ml-2 px-3 py-2 rounded-md bg-green-600"
                    type="button"
                    onClick={addSong}
                  >
                    Add Song
                  </button>
                  {index >= 1 && (
                    <button
                      className="ml-2 px-3 py-2 rounded-md bg-red-600"
                      type="button"
                      onClick={() => removeSong(index)}
                    >
                      Remove Song
                    </button>
                  )}
                </div>
              </section>
            );
          })}

          <div className="pt-4 text-center p-3">
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-green-600">
              AddAlbumn
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};
export default CreateAlbumn;
