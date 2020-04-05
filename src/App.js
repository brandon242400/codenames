import React from "react";
import "./App.css";
import CardContainer from "./comp/cards/CardContainer";
import RulesLeft from "./comp/rules/RulesLeft";
import RulesRight from "./comp/rules/RulesRight";

function App() {
	const [displayFlex, setDisplayFlex] = React.useState(
		window.innerWidth > 1000
	);

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
				<CardContainer />
			</div>
			{!displayFlex ? <RulesLeft /> : null}
			<RulesRight />
		</div>
	);
}

export default App;
