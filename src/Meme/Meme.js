import React, { Fragment, useEffect, useState } from "react";
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
    max-width: 200px;
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
  const [textFetch, setTextFetch] = useState();

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
        console.log(data.data.memes);
        shuffleMemes(_memes);
        setMemes(_memes);
      });
  }, []);

  useEffect(() => {
    if (memes.length) {
      console.log(memes[memeIndex]);
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
    console.log(textFetch);
  };

  const generateCompleteMeme = () => {
    console.log("działam");
    const currentMeme = memes[memeIndex];
    console.log("aktualny mem", currentMeme);
    const textData = new FormData();
    textData.append("username", "TestMe");
    textData.append("password", "TestMepls");
    textData.append("template_id", currentMeme.id);

    textFetch.forEach((text, index) => {
      textData.append(`boxes[${index}][text]`, text);
    });
    console.log(textData);

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: textData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
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
                  placeholder={`Type your text here`}
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
