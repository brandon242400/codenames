import React from "react";
import styled from "styled-components";

export default function Card(props) {
  const { word, team } = props;

  const handleClick = (e) => {
    e.preventDefault();
    alert(word + " clicked!");
  };

  const Container = getContainer(team);

  return (
    <Container onClick={handleClick}>
      <h5>{word ? word : "Card"}</h5>
    </Container>
  );
}

// Gets style attributes based on what team the card is for.
const getContainer = (team) => {
  let bgColor, borderColor;
  let textColor = "black";

  switch (team) {
    case "red":
      bgColor = "#777";
      borderColor = "red";
      break;
    case "blue":
      bgColor = "#777";
      borderColor = "blue";
      break;
    case "assassin":
      bgColor = "#444";
      borderColor = "black";
      textColor = "red";
      break;
    default:
      bgColor = "#777";
      borderColor = "black";
      break;
  }

  return styled.div`
    background-color: ${bgColor};
    border: 2px solid ${borderColor};
    border-radius: 5px;
    height: 10vh;
    margin: 5px 1px;
    min-height: 50px;
    transition: background-color 0.25s;
    width: 18%;

    h5 {
      color: ${textColor};
    }

    :hover {
      background-color: green;
      cursor: pointer;
    }
  `;
};
