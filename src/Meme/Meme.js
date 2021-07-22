import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {useHistory} from 'react-router-dom';

const App = styled.div`
  width: 100%;
  text-align: center;
`;

const MemeImg = styled.img`
  width: 600px;
  height: 500px;
  box-shadow: 0px 0px 10px black;
  @media only screen and (max-width:650px) {
    width: 400px;
    height: 300px;
  }
  @media only screen and (max-width:450px) {
    width: 300px;
    height: 200px;
  }
  @media only screen and (max-width:350px) {
    width: 250px;
    height: 200px;
  }
`;

const BtnCont = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media only screen and (max-width:650px) {
    flex-direction: column;
    & button{
      margin: 10px 0;
      width: 200px;
    }
  }
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
  @media only screen and (max-width:850px) {
    flex-direction: column;
  }
  & > input {
    max-width: 200px;
    padding: 10px 20px;
    outline: none;
    font-size: 18px;
    border: 2px solid black;
    background-color: white;
      @media only screen and (max-width:1200px) {
      max-width: 150px;
      padding: 5px;
    }
    @media only screen and (max-width:850px) {
      max-width:250px;
      padding: 10px 20px;
      margin: 15px 0;
  }
  }
`;

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [inputCount, setInputCount] = useState([]);
  const [textFetch, setTextFetch] = useState();
  const browserHistory = useHistory();

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes", {
      method: "GET",
      //credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        const _memes = data.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
  }, []);

  useEffect(() => {
    if (memes.length) {
      const boxCount = [];
      for (let i = 0; i < memes[memeIndex].box_count; i++) {
        boxCount.push("");
      }
      setInputCount(boxCount);
      setTextFetch(boxCount);
    }
  }, [memeIndex, memes]);

  //{memes.length ? inputCount.map( i => <input key = {i} type ="text"/>) : null}

  const saveMemeText = (e, index) => {
    let tab = textFetch;
    tab[index] = e.target.value;
    setTextFetch(tab);
  };

  const generateCompleteMeme = () => {

    //we are checking if all inputs are filled with any value, if all inputs are with filled with at least 1 letter we can generate meme, if not we can't
    if (textFetch.filter(word => word.length >= 1).length !== textFetch.length){
      alert("Fill all inputs with text!");
      return;
    }
    const currentMeme = memes[memeIndex];

    const textData = new FormData();
    textData.append("username", "TestMe");
    textData.append("password", "TestMepls");
    textData.append("template_id", currentMeme.id);

    textFetch.forEach((text, index) => {
      textData.append(`boxes[${index}][text]`, text);
    });

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: textData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        browserHistory.push(`/generated?url=${data.data.url}`);
      });
  };

  return (
    <App>
      <InputField>
        {memes.length
          ? inputCount.map((item, index) => {
              return (
                <input
                  onChange={(event) => saveMemeText(event, index)}
                  key={index}
                  type="text"
                />
              );
            })
          : null}
      </InputField>
      {memes.length ? (
        <MemeImg alt={memes[memeIndex].name} src={memes[memeIndex].url} />
      ) : null}
      <BtnCont>
        <button
          onClick={() => {
            if(memeIndex === 0){
              return;;
            }
            setMemeIndex(memeIndex - 1);
          }}
          className="change_btn"
        >
          Previous Meme
        </button>
        <button onClick={generateCompleteMeme} className="gen">
          Generate Meme
        </button>
        <button
          onClick={() => {
            if(memeIndex === memes.length - 1){
              return;
            }
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
