import styled from "styled-components";
import hero from "../assets/hero-bg.png";

const HeaderDiv = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 325px;
  background: rgb(47, 47, 51);
  background-image: linear-gradient(
      180deg,
      rgba(24, 24, 27, 0.25) 100%,
      rgba(36, 36, 40, 0.25) 100%
    ),
    url(${hero});
    background-position: 0 35%;
    background-size: cover;
    border-radius: 0 0 12px 12px;
`;

const Title = styled.h1`
  font-size: 3.6rem;
  font-weight: bold;
  letter-spacing: 5px;
  padding: 12px 24px;
  border-bottom: 1px solid #ffdd95;
  width: fit-content;
  text-align: center;
  text-transform: uppercase;
  text-align: center;
  color: #ffdd95;

  span {
    color: white;
  }
`;

function Header({}) {
  return (
    <HeaderDiv>
      <Title>
        Anim <span>Flix</span>
      </Title>
    </HeaderDiv>
  );
}

export default Header;
