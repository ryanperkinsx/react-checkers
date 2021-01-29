import React from 'react';
import './GamePiece.css';
import 'fontsource-roboto';

export default function GamePiece(props) {
	const { pending, move, onClick, rowIndex, index, piece } = props;
	const isRed = pending ? (move - 1) % 2 === 0 : move % 2 === 0;
	let classStr = "piece";

	if (piece === null) {
		return null;
	} else if(piece.value === 0) { 	// selected piece
		classStr += " selected";
		classStr += piece.isKing ? " selected-king" : "";

		return (
			<button
				className={classStr}
				onClick={() => onClick(rowIndex, index, piece)}
			/>
		);
	} else if (isRed) { // red turn
		if (piece.value === 1) { // black piece
			classStr += " black disabled";
			classStr += piece.isKing ? " black-king" : "";

			return (
				<button
					className={classStr}
					disabled={true}
				/>
			);
		} else if (piece.value === 2) { // red piece
			classStr += " red";
			classStr += pending ? " disabled" : "";
			classStr += piece.isKing ? " red-king" : "";

			return (
				<button
					className={classStr}
					onClick={() => onClick(rowIndex, index, piece)}
					disabled={pending}
				/>
			);
		}
	} else if (!isRed) { // black turn
		if (piece.value === 1) { // black piece
			classStr += " black";
			classStr += pending ? " disabled" : "";
			classStr += piece.isKing ? " black-king" : "";

			return (
				<button
					className={classStr}
					onClick={() => onClick(rowIndex, index, piece)}
					disabled={pending}
				/>
			);
		} else if (piece.value === 2) { // red piece
			classStr += " red disabled";
			classStr += piece.isKing ? " red-king" : "";

			return (
				<button
					className={classStr}
					disabled={true}
				/>
			);
		}
	}
};

