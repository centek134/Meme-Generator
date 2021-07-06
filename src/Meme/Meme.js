import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MemeImg = styled.img`
  width: 600px;
  height: 500px;
  box-shadow: 0px 0px 10px black;
`;

const BtnCont = styled.div`
  margin-top:30px ;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
 & .change_btn , & .gen{
  padding: 10px;
  outline: none;
  font-weight: 700;
  font-size: 20px;
  transition: 0.3s;
  cursor: pointer;
 }

 & .change_btn{
   background-color: black;
   color: white;
   border: 3px solid black;
    &:hover{
      color: black;
      background-color: white;
      border: 3px solid black;
    }
 }
 & .gen{
   background-color: white;
   color: black;
   border: 3px solid black;
    &:hover{
      color: white;
      background-color: black;
      border: 3px solid black;
    }
 }

`

export const Meme = () => {

  const [memes, setMemes] = useState(0);
 
  const [memeIndex, setMemeIndex] = useState(0);


  const shuffleMemes = (array) => {
    for(let i = array.length - 1; i > 0; i--){
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


  return (
    <div>
      {memes.length ? <MemeImg alt={memes[memeIndex].name} src={memes[memeIndex].url} /> : null}
      <BtnCont>
        <button onClick ={() => {setMemeIndex(memeIndex  -1)}} className = "change_btn">Previous Meme</button>
        <button className = "gen">Generate Meme</button>
        <button onClick ={() => {setMemeIndex(memeIndex + 1)}} className = "change_btn">Next Meme</button>
      </BtnCont>
    </div>
  );
};
