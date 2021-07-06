import React from 'react';
import { Meme } from './Meme/Meme';
import styled from 'styled-components';


  const MyApp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const App = () => {

  return (
    <MyApp>
      <Meme></Meme>
    </MyApp>
  );
}

export default App;



