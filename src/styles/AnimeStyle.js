import styled from "styled-components";
import { Link } from "react-router";
import { breakpoints } from "../constant";

export const Main = styled.main`
  padding: 0 64px;

  @media only screen and (max-width: ${breakpoints.medium}) {
    padding: 0 24px;
  }
`;

export const Title = styled.h2`
  margin: 32px 0px 0 0;
  font-size: 2.6rem;
  font-weight: 500;
  color: #ffdd95;

  @media only screen and (max-width: ${breakpoints.medium}) {
    font-size: 2rem;
  }
`;

export const AnimeList = styled.div`
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

export const AnimeCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  overflow: hidden;
`;

export const AnimePoster = styled(Link)`
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

export const AnimeTitle = styled.a`
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