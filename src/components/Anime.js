import Pagination from "./Pagination";
import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { KITSU_ANIME_API } from "../constant";
import {
  Main,
  Title,
  AnimeList,
  AnimeCard,
  AnimePoster,
  AnimeTitle,
} from "../styles/AnimeStyle";

function Anime({}) {
  const [animeList, setAnimeList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalAnime, setTotalAnime] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${KITSU_ANIME_API}?page[limit]=10&page[offset]=${offset}`,
          {
            method: "GET",
            headers: {
              Accept: "application/vnd.api+json",
              "Content-Type": "application/vnd.api+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error status ${response.status}`);
        }

        const resp = await response.json();
        setAnimeList(resp.data);

        const totalEntries = resp.meta.count;
        setTotalAnime(totalEntries);
        setTotalPage(Math.ceil(totalEntries / 10));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);

  return (
    <Main>
      <Title>Watch Animes</Title>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        setOffset={setOffset}
        totalAnime={totalAnime}
        loading={loading}
      />
      <AnimeList>
        {animeList.map((anime, index) => (
          <AnimeCard key={anime.id}>
            <AnimePoster to={`/anime/${anime.id}`}>
              <img
                src={anime.attributes.posterImage.small}
                alt={
                  anime.attributes.titles.en || anime.attributes.titles.en_jp
                }
              />
              <p>
                <IoStar /> {(anime.attributes.averageRating / 10).toFixed(1)}
              </p>
            </AnimePoster>
            <AnimeTitle>
              {anime.attributes.titles.en || anime.attributes.titles.en_jp} |{" "}
              {anime.attributes.titles.ja_jp}
            </AnimeTitle>
          </AnimeCard>
        ))}
      </AnimeList>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        setOffset={setOffset}
        totalAnime={totalAnime}
        loading={loading}
      />
    </Main>
  );
}

export default Anime;
