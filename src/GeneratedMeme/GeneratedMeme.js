import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const ContainerMeme = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > img {
      width: 550px;
    }

  @media only screen and (max-width: 600px){
    & > img {
      width: 500px;
    }
  }
  @media only screen and (max-width: 550px){
    & > img {
      width: 400px;
    }
  }
  @media only screen and (max-width: 450px){
    & > img {
      width: 300px;
    }
  }
  @media only screen and (max-width: 350px){
    & > img {
      width: 250px;
    }
  }

  & > button {
    margin-top: 20px;
    background-color: white;
    padding: 10px 20px;
    border: 3px solid black;
    transition: 0.5s;
    font-size: 20px;
    font-weight: 700;
    color: black;

    &:hover{
      border: 3px solid white;
      background-color: black;
      color: white;
    }

  }
`;

const GeneratedMeme = () => {
  const history = useHistory();
  const location = useLocation();
  let trimmed = location.search.slice(location.search.indexOf("=") + 1);
  const url = new URLSearchParams(location.search).get("url");

  return (
    <div>
      {url ? (
        <ContainerMeme>
          <img src={trimmed} alt="I'ts your generated meme" />
          <button onClick={() => history.push("/")}> Go Back</button>
        </ContainerMeme>
      ) : null}
    </div>
  );
};

export default GeneratedMeme;
