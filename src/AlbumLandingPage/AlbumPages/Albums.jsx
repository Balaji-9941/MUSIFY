import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { SiApplemusic } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { _DB } from "../../Backend/Firebase";

const Albums = () => {
  let [album, setAlbum] = useState();

  useEffect(() => {
    async function fetchAlbum() {
      try {
        let albumCollection = collection(_DB, "Music_Musify");
        let albumData = await getDocs(albumCollection);
        console.log(albumData.docs.data);

        let newAlbumData = albumData.docs.map((album) => ({
          ...album.data(),
        }));

        // console.log(newAlbumData);
        setAlbum(newAlbumData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAlbum();
  }, []);

  console.log(album);
  return (
    <section className="w-[80vw] text-white">
      {album && (
        <article className="w-full p-3 flex flex-col">
          <header className="flex items-center gap-2 p-3">
            <span className="text-3xl">
              <SiApplemusic />
            </span>
            <h1 className="text-2xl font-bold">Popular Albums</h1>
          </header>
          <main className="p-3 flex gap-5">
            {album?.map((data, index) => {
              return (
                <NavLink
                  key={index}
                  to={`albumDetails/${data?.albumtitle}`}
                  state={data}
                >
                  <div className="px-3 bg-black/50 w-[250px] h-[300px] py-5 rounded-lg flex flex-col items-center hover:bg-black/70 hover:ring-1 hover:ring-[wheat]">
                    <img
                      src={data?.albumthumbnail}
                      alt={data?.albymtitle}
                      className="w-[220px] h-[250px] object-cover hover:rounded hover:scale-105 transition-all duration-100 ease-linear"
                    />
                    <h1 className="text-white text-2xl text-center py-1 px-14 bg-black mt-3 rounded-md ">
                      {data?.albumtitle}
                    </h1>
                  </div>
                </NavLink>
              );
            })}
          </main>
        </article>
      )}
    </section>
  );
};

export default Albums;
