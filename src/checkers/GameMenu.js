import React from "react";
import './Game.css';

// ==================== END IMPORTS ====================

export default function GameMenu(props) {
	const { pending, back, reset, forward }= props

	// ==================== END VARIABLES ====================

	const handleMoveBack = () => {
		back();
	}

	const handleClick = () => {
		alert("you went ahead and done did it");
		reset();
	}

	const handleMoveForward = () => {
		forward();
	}

	// ==================== END FUNCTIONS ====================

	return (
		<div className={"game-menu"}>
			<button onClick={handleMoveBack} disabled={pending} > {"<"} </button>
			<div className={"divider"} />
			<button onClick={handleClick} disabled={pending} > reset </button>
			<div className={"divider"} />
			<button onClick={handleMoveForward} disabled={pending} > > </button>
		</div>
	);
}

// ==================== END GAMEMENU ====================