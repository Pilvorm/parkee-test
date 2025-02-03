import React, { useState, useEffect } from "react";
import { Link,  } from "react-router";
import { IoStar } from "react-icons/io5";
import { useParams } from "react-router";
import { KITSU_ANIME_API, breakpoints } from "../constant";
import {
  Main,
  Loading,
  Hero,
  Back,
  Info,
  Title,
  Details,
  AttributeList,
  ShowType,
  Rating,
  Synopsis,
} from "../styles/AnimeDetailStyle";

function AnimeDetail({}) {
  const [anime, setAnime] = useState(null);
  let { animeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${KITSU_ANIME_API}/${animeId}`, {
          method: "GET",
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error status ${response.status}`);
        }

        const resp = await response.json();
        setAnime(resp.data);
        // console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [animeId]);

  if (!anime) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Main>
      <Hero bg={anime.attributes.coverImage?.original}>
        <Link to={`/`}>
          {" "}
          <Back />
        </Link>
        <Info>
          <img src={anime.attributes.posterImage.large} />
          <Details>
            <div>
              <Title>
                {anime.attributes.titles.en || anime.attributes.titles.en_jp}
              </Title>
              <Title lang={"jp"}>{anime.attributes.titles.ja_jp}</Title>
            </div>
            <AttributeList>
              <ShowType>{anime.attributes.subtype}</ShowType>
              <ShowType rating={anime.attributes.ageRating}>
                {anime.attributes.ageRating}
              </ShowType>
              <Rating>
                <IoStar /> {(anime.attributes.averageRating / 10).toFixed(1)}
              </Rating>
            </AttributeList>

            <Synopsis>{anime.attributes.synopsis}</Synopsis>
          </Details>
        </Info>
      </Hero>
    </Main>
  );
}

export default AnimeDetail;
