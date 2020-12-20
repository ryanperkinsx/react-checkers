import React from 'react';
import './Board.css';
import 'fontsource-roboto';
import GamePiece from "../pieces/GamePiece";

export default function Square(props) {
	const { pending, move, onClick, rowIndex, index, value } = props;
	const theme = () => {
		const temp = rowIndex % 2 === 0 ? index : index + 1;
		return temp % 2 === 0 ? "odd" : "odd even";
	}

	// ==================== END VARIABLES ====================

	return (
		<div className={theme()} >
			<GamePiece onClick={(x, y, value) => onClick(x, y, value)}
					   pending={pending}
					   move={move}
					   rowIndex={rowIndex}
					   index={index}
					   value={value}
			/>
		</div>
	);
}

// ==================== END SQUARE ====================