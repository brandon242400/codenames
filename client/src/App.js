import React from "react";
import "./App.css";
import CardContainer from "./comp/cards/CardContainer";
import RulesLeft from "./comp/rules/RulesLeft";
import RulesRight from "./comp/rules/RulesRight";
import gameLogic from "./game-logic/GameLogic";

new gameLogic();

function App() {
	const [displayFlex, setDisplayFlex] = React.useState(
		window.innerWidth > 1000
	);
	const [currentTeam, setCurrentTeam] = React.useState("spy");

	const checkWindowWidth = () => {
		if (window.innerWidth <= 1000) setDisplayFlex(false);
		else setDisplayFlex(true);
	};

	React.useEffect(() => {
		window.addEventListener("resize", checkWindowWidth);
		return () => {
			window.removeEventListener("resize", checkWindowWidth);
		};
	});

	return (
		<div className="App">
			{displayFlex ? <RulesLeft /> : null}
			<div>
				<h1>Codenames</h1>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around"
					}}
				>
					<button
						onClick={() => {
							setCurrentTeam("red");
						}}
					>
						Red Team
					</button>
					<button
						onClick={() => {
							setCurrentTeam("spy");
						}}
					>
						Spy
					</button>
					<button
						onClick={() => {
							setCurrentTeam("blue");
						}}
					>
						Blue Team
					</button>
				</div>
				<CardContainer playersTeam={currentTeam} />
			</div>
			{!displayFlex ? <RulesLeft /> : null}
			<RulesRight />
		</div>
	);
}

export default App;
