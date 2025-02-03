import { FaDiscord, FaRedditAlien, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styled from "styled-components";
import { breakpoints } from "../constant";

const FooterDiv = styled.footer`
  padding: 48px 64px;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${breakpoints.small}) {
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: bold;
  letter-spacing: 5px;
  width: fit-content;
  text-align: center;
  text-transform: uppercase;
  text-align: center;
  color: #ffdd95;

  span {
    color: white;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    cursor: pointer;
    color: #ffdd95;
  }
`;

const Copyright = styled.p`
  max-width: 275px;
  margin-top: 24px;
  font-size: 1.4rem;
  color: #929294;

  @media only screen and (max-width: ${breakpoints.small}) {
    max-width: 100%;
    text-align: center;
  }
`;

function Footer({}) {
  return (
    <FooterDiv>
      <Links>
        <Title>
          Anim <span>Flix</span>
        </Title>
        <Socials>
          <a href="https://discord.com/" target="_blank">
            <FaDiscord size={26} />
          </a>
          <a href="https://www.reddit.com/" target="_blank">
            <FaRedditAlien size={26} />
          </a>
          <a href="https://x.com/" target="_blank">
            <FaXTwitter size={26} />
          </a>
          <a href="https://web.telegram.org/a/" target="_blank">
            <FaTelegramPlane size={26} />
          </a>
        </Socials>
      </Links>

      <Copyright>
        App developed by Daniel Emerald Sumarly for Parkee test submission.
      </Copyright>
    </FooterDiv>
  );
}

export default Footer;
