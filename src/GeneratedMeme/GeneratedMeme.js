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
          <button onClick={() => history.push("/")}> go back</button>
        </ContainerMeme>
      ) : null}
    </div>
  );
};

export default GeneratedMeme;
