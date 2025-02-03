import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { IoStar } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router";
import { KITSU_ANIME_API, breakpoints } from "../constant";

const Main = styled.main``;

const Loading = styled.div`
  height: 675px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
`;

const Hero = styled.div`
  position: relative;
  height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #18181b;
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url(${(props) => props.bg});
  background-size: cover;
  background-position: 50% 50%;

  @media only screen and (max-width: ${breakpoints.medium}) {
    height: auto;
  }
`;

const Back = styled(IoIosArrowRoundBack)`
  cursor: pointer;
  position: absolute;
  top: 36px;
  left: 54px;
  font-size: 5.4rem;
  color: white;
  transition: transform 0.125s ease-out;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.125s ease-out;
  }
`;

const Info = styled.div`
  margin: 128px 224px;
  display: flex;
  gap: 52px;
  z-index: 2;

  img {
    width: 284px;
    max-height: 402px;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }

  @media only screen and (max-width: ${breakpoints.medium}) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;

    img {
      width: 180px;
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => (props.lang === "jp" ? "#fcf4f4" : "#ffdd95")};
  font-size: 2.8rem;
  font-weight: 500;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  
  @media only screen and (max-width: ${breakpoints.medium}) {
    font-size: 2.4rem;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 525px;

  @media only screen and (max-width: ${breakpoints.large}) {
    width: 350px;
  }
`;

const AttributeList = styled.div`
  display: flex;
  gap: 8px;

  @media only screen and (max-width: ${breakpoints.medium}) {
    justify-content: center;
  }
`;

const Attribute = styled.p`
  padding: 6px 12px;
  font-size: 1.4rem;
  font-weight: 600;
  width: fit-content;
  border-radius: 4px;
`;

const ShowType = styled(Attribute)`
  color: black;
  background-color: ${(props) =>
    props.rating ? (props.rating == "PG" ? "#fcf4f4" : "#d32c22") : "#ffdd95"};
`;

const Rating = styled(Attribute)`
  background: rgba(0, 0, 0, 0.7);
  svg {
    color: #ffd700;
  }
`;

const Synopsis = styled.p`
  max-height: 250px;
  overflow: scroll;
  font-size: 1.4rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

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
