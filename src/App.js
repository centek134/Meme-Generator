import React from "react";
import { Meme } from "./Meme/Meme";
import GeneratedMeme from "./GeneratedMeme/GeneratedMeme";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

const MyApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <MyApp>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path = "/generated">
          <GeneratedMeme/>
        </Route>
      </Switch>
    </MyApp>
  );
};

export default App;
