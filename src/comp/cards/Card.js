import React from "react";
import styled from "styled-components";

export default function Card(props) {
	const { word, team } = props;

	return (
		<Container>
			<h5>Card</h5>
		</Container>
	);
}

const Container = styled.div`
	background-color: #777;
	border: 1px solid black;
	border-radius: 5px;
	height: 10vh;
	margin: 5px 1px;
	min-height: 50px;
	width: 18%;
`;
