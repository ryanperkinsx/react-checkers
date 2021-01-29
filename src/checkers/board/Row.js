import React from 'react';
import './Board.css';
import 'fontsource-roboto';
import Square from "./Square";

// ==================== END IMPORTS ====================

export default function Row(props) {
	const { pending, move, onClick, rowArray, rowIndex } = props;

	// ==================== END VARIABLES ====================

	return (
		<div>
			{
				rowArray.map((value, index) => {
					return (
						<Square key={(rowIndex + 1) * index}
								pending={pending}
								move={move}
								onClick={(x, y, piece) => onClick(x, y, piece)}
								rowIndex={rowIndex}
								index={index}
								piece={value}
						/>
					);
				})
			}
		</div>
	);
};

// ==================== END ROW ====================
