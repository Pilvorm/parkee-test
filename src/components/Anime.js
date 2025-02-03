import Pagination from "./Pagination";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { IoStar } from "react-icons/io5";
import { KITSU_ANIME_API, breakpoints } from "../constant";

const Main = styled.main`
  padding: 0 64px;

  @media only screen and (max-width: ${breakpoints.medium}) {
    padding: 0 24px;
  }
`;

const Title = styled.h2`
  margin: 32px 0px 0 0;
  font-size: 2.6rem;
  font-weight: 500;
  color: #ffdd95;

  @media only screen and (max-width: ${breakpoints.medium}) {
    font-size: 2rem;
  }
`;

const AnimeList = styled.div`
margin: 54px 0;
  gap: 32px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  max-width: 100%;

  @media only screen and (max-width: ${breakpoints.large}) {
    gap: 24px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AnimeCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  overflow: hidden;
`;

const AnimePoster = styled(Link)`
  width: 100%;
  position: relative;
  overflow: hidden;
  color: white;

  img {
    cursor: pointer;
    border-radius: 6px;
    width: 100%;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

    transition: transform 0.225s ease-in;

    &:hover {
      transform: scale(1.085);
      transition: transform 0.225s ease-in;
      transform-origin: 50% 50%;
    }
  }

  p {
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    width: fit-content;
    right: 6px;
    top: 6px;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 1.4rem;
    background: rgba(0, 0, 0, 0.7);
  }

  svg {
    color: #ffd700;
  }
`;

const AnimeTitle = styled.a`
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.075s ease-out;

  &:hover {
    color: #ffdd95;
    transition: all 0.075s ease-out;
  }
`;

function Anime({}) {
  const [animeList, setAnimeList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
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
        const totalAnime = resp.meta.count;
        setTotalPage(Math.ceil(totalAnime / 10));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [offset, totalPage]);

  return (
    <Main>
      <Title>Watch Animes</Title>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
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
      />
    </Main>
  );
}

export default Anime;
