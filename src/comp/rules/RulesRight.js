import React from "react";
import styled from "styled-components";

export default function RulesRight() {
	return (
		<Container>
			<p>
				The hint's number tells the field operatives how many words in the grid
				are related to the word of the clue. It also determines the maximum
				number of guesses the field operatives may make on that turn, which is
				the hint's number plus one. Field operatives must make at least one
				guess per turn, risking a wrong guess and its consequences. They may
				also end their turn voluntarily at any point thereafter.
			</p>
			<p>
				After a spymaster gives the hint with its word and number, their field
				operatives make guesses about which code name cards bear words related
				to the hint and point them out, one at a time. When a code name card is
				pointed out, the spymaster covers that card with an appropriate identity
				card – a blue agent card, a red agent card, an innocent bystander card,
				or the assassin card – as indicated on the spymasters' map of the grid.
				If the assassin is pointed out, the game ends immediately, with the team
				who identified him losing. If an agent of the other team is pointed out,
				the turn ends immediately, and that other team is also one agent closer
				to winning. If an innocent bystander is pointed out, the turn simply
				ends.
			</p>
			<p>
				The game ends when all of one team's agents are identified (winning the
				game for that team), or when one team has identified the assassin
				(losing the game).
			</p>
		</Container>
	);
}

const Container = styled.div`
	width: 15vw;
	height: fit-content;
	padding: 10px;
	border-left: 2px solid black;
	margin: 15vh auto 5vh auto;

	@media (max-width: 1000px) {
		width: 50vw;
		margin: 0 auto;
		border-right: 2px solid black;
	}
`;
