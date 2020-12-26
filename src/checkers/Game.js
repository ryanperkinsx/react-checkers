import React from 'react';
import './Game.css';
import 'fontsource-roboto';
import Board from "./board/Board";
import {cloneDeep} from "lodash"
import GameMenu from "./GameMenu";

// ==================== END IMPORTS ====================

export default function Game() {
    const [history, setHistory] = React.useState([{
        board: [
            [0, null, 0, null, 0, null, 0, null],
            [null, 0, null, 0, null, 0, null, 0],
            [0, null, 0, null, 0, null, 0, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, 1, null, 1, null, 1, null, 1],
            [1, null, 1, null, 1, null, 1, null],
            [null, 1, null, 1, null, 1, null, 1],
        ],
    }]);
    const [move, setMove] = React.useState(0);
    const [selection, setSelection] = React.useState(null);
    const [pending, setPending] = React.useState(false);

    // ==================== END VARIABLES ====================

    const back = () => {
        if (move - 1 < 0) {
            alert("slow down there");
            return
        }
        setMove(move - 1);
        setSelection(null);
    }

    const reset = () => {
        setHistory([{board: cloneDeep(history[0].board)}]);
        setMove(0);
        setSelection(null);
        setPending(false);
    }

    const forward = () => {
        if (move + 1 > history.length - 1) {
            alert("stop, bitch.");
            return
        }
        setMove(move + 1);
        setSelection(null);
    }

    const calculateJumps = (x, y, value, mirror) => {
        // set the piece
        if (x < 8 && x > -1 && y < 8 && y > -1)
            if (mirror[x][y] === null)
                mirror[x][y] = 2;
            else return;

        // black piece
        if (value === 0) {
            // to the right
            if (x + 1 < 8 && y + 1 < 8) {
                if (mirror[x + 1][y + 1] === 1) {
                    calculateJumps(x + 2, y + 2, value, mirror);
                }
            }
            // to the left
            if (x + 1 < 8 && y - 1 > -1) {
                if (mirror[x + 1][y - 1] === 1) {
                    calculateJumps(x + 2, y - 2, value, mirror);
                }
            }
        } else if (value === 1) {
            // to the right
            if (x - 1 > -1 && y + 1 < 8) {
                if (mirror[x - 1][y + 1] === 0) {
                    calculateJumps(x - 2, y + 2, value, mirror);
                }
            }
            // to the left
            if (x - 1 > -1 && y - 1 > -1) {
                if (mirror[x - 1][y - 1] === 0) {
                    calculateJumps(x - 2, y - 2, value, mirror);
                }
            }
        } // red piece
    }

    const calculateMoves = (x, y, value, mirror) => {
        if (mirror) {
           // black piece
            if (value === 0) {
                // right
                if (x + 1 < 8 && y + 1 < 8) {
                    // empty
                    if (mirror[x + 1][y + 1] === null)
                        mirror[x + 1][y + 1] = 2;
                    // red opponent
                    else if (mirror[x + 1][y + 1] === 1)
                        calculateJumps(x + 2, y + 2, value, mirror);
                }
                // left
                if (x + 1 < 8 && y - 1 > -1) {
                    // empty
                    if (mirror[x + 1][y - 1] === null)
                        mirror[x + 1][y - 1] = 2;
                    // red opponent
                    else if (mirror[x + 1][y - 1] === 1)
                        calculateJumps(x + 2, y - 2, value, mirror);
                }
            } else if (value === 1) {
                // right
                if (x - 1 > -1 && y + 1 < 8) {
                    // empty
                    if (mirror[x - 1][y + 1] === null)
                        mirror[x - 1][y + 1] = 2;
                    // black opponent
                    else if (mirror[x - 1][y + 1] === 0)
                        calculateJumps(x - 2, y + 2, value, mirror);
                }
                // left
                if (x - 1 > -1 && y - 1 > -1) {
                    // empty
                    if (mirror[x - 1][y - 1] === null)
                        mirror[x - 1][y - 1] = 2;
                    // black opponent
                    else if (mirror[x - 1][y - 1] === 0)
                        calculateJumps(x - 2, y - 2, value, mirror);
                }
            } // red piece
        }
    }

    const movePiece = (x, y) => {
        // clicked the old piece
        if (selection.x === x && selection.y === y) {
            // alert("doth clicked me old piece")
            const past = cloneDeep(history.slice(0, move));

            // clean up, clean up, everybody do your share
            setHistory(past);
            setSelection(null);
            setMove(move - 1);
            setPending(false);

            return;
        }

        // modifier so the loop can be generic
        const xMod = selection.value === 0 ? 1 : -1;

        history[move].board = cloneDeep(history[move - 1].board);

        while (selection.x !== x) {
            // the y value being === to the selected piece is an interesting corner case
            // I decided to just have enough safe guards for a default -- easy way out? kinda
            if (selection.y + 1 < 8 && y >= selection.y) {
                // alert("doth clicked a piece down/up to the right ")
                history[move].board[selection.x + xMod][selection.y + 1] = selection.value;
                history[move].board[selection.x][selection.y] = null;
                selection.y = selection.y + 1;
                selection.x = selection.x + xMod;
                continue;
            }

            if (selection.y - 1 > -1 && y <= selection.y) {
                // alert("doth clicked a piece down/up to the left ")
                history[move].board[selection.x + xMod][selection.y - 1] = selection.value;
                history[move].board[selection.x][selection.y] = null;
                selection.y = selection.y - 1;
                selection.x = selection.x + xMod;
                continue;
            }
        }

        setHistory(history);
        setSelection(null);
        setPending(false);
    }

    const handleClick = (x, y, value) => {
        // get a current copy of the history
        const past = move + 1 !== history.length
            ? history.slice(0, move + 1)
            : [...history];

        // if no piece is currently selected
        if (!selection) {
            // get a current copy of the board
            const mirror = cloneDeep(past[move].board);

            // change the button
            mirror[x][y] = 2;

            // select the possible moves
            calculateMoves(x, y, value, mirror);

            setSelection({ x: x, y: y, value: value});
            setPending(true);
            setHistory([...past, {board: mirror}]);
            setMove(move + 1);
        } else {
            movePiece(x, y, value)
        }
    }

    // ==================== END UTILITIES ====================

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board board={history[move].board}
                           pending={pending}
                           move={move}
                           onClick={(x, y, value) => handleClick(x, y, value)}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
            <br />
            <GameMenu pending={pending} back={back} reset={reset} forward={forward}  />
        </div>
    );
}

// ==================== END GAME ====================
