import React, { useEffect, useState } from "react";
import styled from "styled-components";

const App = styled.div`
  min-width: 1200px;
  text-align: center;
`;

const MemeImg = styled.img`
  width: 600px;
  height: 500px;
  box-shadow: 0px 0px 10px black;
`;

const BtnCont = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & .change_btn,
  & .gen {
    padding: 10px;
    outline: none;
    font-weight: 700;
    font-size: 20px;
    transition: 0.3s;
    cursor: pointer;
  }

  & .change_btn {
    background-color: black;
    color: white;
    border: 3px solid black;
    &:hover {
      color: black;
      background-color: white;
      border: 3px solid black;
    }
  }
  & .gen {
    background-color: white;
    color: black;
    border: 3px solid black;
    &:hover {
      color: white;
      background-color: black;
      border: 3px solid black;
    }
  }
`;

const InputField = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 100px;
  & > input {
    padding: 10px 20px;
    outline: none;
    font-size: 18px;
    border: 2px solid black;
    background-color: white;
  }
`;



export const Meme = () => {
  const [memes, setMemes] = useState(0);

  const [memeIndex, setMemeIndex] = useState(0);
  const [inputCount, setInputCount] = useState([]);

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const _memes = data.data.memes;
        console.log(data.data.memes);
        shuffleMemes(_memes);
        setMemes(_memes);
      });
  }, []);

  // nie działą bo próbuję zrobić map() na liczbie a nie na tablicy
  // muszę stworzyć tablicę i dodać do niej tyle elementów ile jest w box_count

  useEffect(() => {
    if (memes.length) {
      console.log(memes[memeIndex]);
      const boxCount = [];
      for (let i = 0; i < memes[memeIndex].box_count; i++) {
        boxCount.push("");
      };
      setInputCount(boxCount);
    };
  }, [memeIndex, memes]);

  //{memes.length ? inputCount.map( i => <input key = {i} type ="text"/>) : null}

  return (
    <App>
      <InputField>
      {memes.length
        ? inputCount.map((item, index) => <input key={index} type="text" />)
        : null}
      </InputField>
      {memes.length ? (
        <MemeImg alt={memes[memeIndex].name} src={memes[memeIndex].url} />
      ) : null}
      <BtnCont>
        <button
          onClick={() => {
            setMemeIndex(memeIndex - 1);
          }}
          className="change_btn"
        >
          Previous Meme
        </button>
        <button className="gen">Generate Meme</button>
        <button
          onClick={() => {
            setMemeIndex(memeIndex + 1);
          }}
          className="change_btn"
        >
          Next Meme
        </button>
      </BtnCont>
    </App>
  );
};
