import React from 'react';
import './GamePiece.css';
import 'fontsource-roboto';

export default function GamePiece(props) {
	const { pending, move, onClick, rowIndex, index, value } = props;
	if (value === null)
		return null;
	const isRed = pending ? (move - 1) % 2 === 0 : move % 2 === 0;

	if (isRed && value === 0) {
		return (
			<button
				className={"piece black disabled"}
				disabled={true}
			/>
		);
	}

	if (isRed && value === 1) {
		return (
			<button
				className={pending ? "piece red disabled" : "piece red"}
				onClick={() => onClick(rowIndex, index, value)}
				disabled={pending}
			/>
		);
	}

	if (!isRed && value === 0) {
		return (
			<button
				className={pending ? "piece black disabled" : "piece black"}
				onClick={() => onClick(rowIndex, index, value)}
				disabled={pending}
			/>
		);
	}

	if (!isRed && value === 1) {
		return (
			<button
				className={"piece red disabled"}
				disabled={true}
			/>
		);
	}

	if(value === 2) {
		return (
			<button
				className={"piece selected"}
				onClick={() => onClick(rowIndex, index, value)}
			/>
		);
	}
};

