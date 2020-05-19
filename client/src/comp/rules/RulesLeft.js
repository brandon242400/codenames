import React from 'react';
import styled from 'styled-components';

// Displays the first half of the game's rules on the left side of the board.

export default function RulesLeft() {
  return (
    <Container>
      <p>
        Codenames is a game of guessing which code names (words) in a set are
        related to a hint-word given by another player.
      </p>
      <p>
        Players split into two teams: red and blue. One player of each team is
        selected as the team&apos;s spymaster; the others are field operatives.
      </p>
      <p>
        Twenty-five Codename cards, each bearing a picture, are laid out in a
        5×5 rectangular grid, in random order. A number of these words represent
        red agents, a number represent blue agents, one represents an assassin,
        and the others represent innocent bystanders.
      </p>
      <p>
        The teams&apos; spymasters are given a randomly-dealt map card showing a 5×5
        grid of 25 squares of various colors, each corresponding to one of the
        code name cards on the table. Teams take turns. On each turn, the
        appropriate spymaster gives a verbal hint about the words on the
        respective cards. Each hint may only consist of one single word and a
        number. The spymaster gives a hint that is related to as many of the
        words on his/her own agents&apos; cards as possible, but not to any others –
        lest they accidentally lead their team to choose a card representing an
        innocent bystander, an opposing agent, or the assassin.
      </p>
      <p>
        The hint&apos;s word can be chosen freely, as long as it is not (and does not
        contain) any of the words on the code name cards still showing at that
        time. Code name cards are covered as guesses are made.
      </p>
    </Container>
  );
}

const Container = styled.div`
  width: 15vw;
  height: fit-content;
  padding: 10px;
  border-right: 2px solid black;
  margin: 15vh auto 5vh auto;

  // @media (max-width: 1000px) {
  // width: 50vw;
  // margin: 5vh auto 0 auto;
  // border-left: 2px solid black;
// }
`;
