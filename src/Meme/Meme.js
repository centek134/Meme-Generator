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
 & .next , & .gen{
  padding: 10px;
  outline: none;
  font-weight: 700;
  font-size: 20px;
  transition: 0.3s;
  cursor: pointer;
 }

 & .next{
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


  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const memes = data.data.memes;
        console.log(data.data.memes);
        setMemes(memes);
      });
  }, []);


  return (
    <div>
      {memes.length ? <MemeImg alt={memes[memeIndex].name} src={memes[memeIndex].url} /> : null}
      <BtnCont>
        <button onClick ={() => {setMemeIndex(memeIndex  -1)}} className = "next">Previous Meme</button>
        <button className = "gen">Generate Meme</button>
        <button onClick ={() => {setMemeIndex(memeIndex + 1)}} className = "next">Next Meme</button>
      </BtnCont>
    </div>
  );
};
